const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userdb = require('./models/userSchema');
const Tutor = require('./models/tutorSchema');
const Student = require('./models/studentSchema');
const sessions = require('./models/sessionSchema');
const File = require('./models/fileSchema');
const path = require('path');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const { indexUser, searchUser } = require('./solrUtils');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const { spawn } = require('child_process');
const RazorPay = require('razorpay');

var instance = new RazorPay({
  key_id: "rzp_test_hUvLud5nAc9kpa",
  key_secret: "7xkbk3mlCLjo5JQcbYoueAki"
})

app.get('/key', (req,res) => {res.json({key:"rzp_test_hUvLud5nAc9kpa"})})

const clientid = "246227139666-eqad5p4ctdgns5gsiv95po9n4daro08c.apps.googleusercontent.com";
const clientsecret = "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";

mongoose.connect("mongodb://127.0.0.1:27017/study_assistant").then((res) => console.log("Connected"));

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/study_assistant',
    file: (req, file) => {
      console.log(req.body)
      console.log(file)
        return {
            filename: file.originalname,
            bucketName: 'uploads',
            metadata: {
              tutor_id: req.tutorid 
            }
        };
    }
});
const upload = multer({ storage });

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:8000");
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(session({
  secret:"2345dhhvikluyu77ujjkhi",
  resave:false,
  saveUninitialized:true
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new OAuth2Strategy({
  clientID:clientid,
  clientSecret:clientsecret,
  callbackURL:"/auth/google/callback",
  scope:["profile","email"]
},
async(accessToken,refreshToken,profile,done)=>{
  console.log(profile);
  try{
    const user = await userdb.findOne({email:profile.emails[0].value})
    if (user){
      console.log(user)
      return done(null,user)
    }
    return done(null,null)
  }catch (error){
     return done(error,null)
  }
}
));

passport.serializeUser((user,done)=>{
  done(null, user.email);
});

passport.deserializeUser((email,done)=>{
  userdb.findOne({email : email})
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback", async (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    try {
      if (err) {
        console.error(err);
        return res.redirect(500, "http://localhost:3000/error");
      }
      
      if (!user) {
        return res.redirect(302, "http://localhost:3000/register");
      }

      const u = await userdb.findOne({ email: user.email });

      if (!u) {
        return res.redirect(302, "http://localhost:3000/register");
      }

      if (u.isStudent) {
        const student = await Student.findOne({ student_id: u._id });
        return res.redirect(302, `http://localhost:3000/studashboard?state=${student.student_id}`);
      } else {
        const tutor = await Tutor.findOne({ tutor_id: u._id });
        console.log(tutor);
        const tutor_id = tutor.tutor_id;
        return res.redirect(`http://localhost:3000/tutor_dashboard?state=${tutor_id}`);      }
    } catch (error) {
      console.error(error);
      return res.redirect(500, "http://localhost:3000/error");
    }
  })(req, res, next);
});

app.get('/',(req,res)=>{
  res.status(200).json("server start");
});

app.post("/login_user", async (req, res) => {
  try {
    const user = await userdb.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      bcrypt.compare(req.body.pass, user.password, async (err, result) => {
        if (err) {
          res.status(500).json("Re-enter the credentials");
        } else if (result) {
          if(!user.isStudent){
            const t = await Tutor.findOne({tutor_id : user._id});
            res.status(200).json(t);
          }
          else{
            const s = await Student.findOne({student_id : user._id});
            console.log(s)
            res.status(201).json(s);
          } 
        } else {
          res.status(401).json("Invalid credentials");
        }
      });
    }
     else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json("There is Something wrong please wait");
  }
});

app.post("/search", async (req,res) => {
  const result = await searchUser(req.body.subject,req.body.city,req.body.gender,req.body.state);
  console.log(req.body.subject,req.body.city,req.body.gender,req.body.state);
  console.log(result);
  const userIds = result
  .filter(user => user.email && user.email.length > 0) 
  .map(user => user.email[0]);
  const tutors = await Tutor.find({ email: { $in: userIds } })
  console.log(tutors)
  res.json(tutors)
})

app.post("/submitTutorProfile",upload.single('photo'), async (req,res) => {
  const { firstName, lastName, city, state, zipCode, email, gender, introduction, qualifications, mode,
    institutions, gradeLevels, hourlyRates, socialProfiles, subjects, languages, facebookProfile, twitterProfile, instagramProfile,
    s_username, s_email, s_pass, isStudent} = req.query;
    const hash = bcrypt.hashSync(s_pass, saltRounds);
    const user = await userdb.create({ username: s_username, email: s_email, password: hash, isStudent: isStudent});
    const fullName = firstName.trim()+" "+lastName.trim();
    const tutor_id = user._id;
    const profile_picture = req.body.photo;
    const t = new Tutor({
      tutor_id,fullName, city, state, zipCode, email, gender, introduction, qualifications, profile_picture, mode,
    institutions, gradeLevels, hourlyRates, socialProfiles, subjects, languages, facebookProfile, twitterProfile, instagramProfile
    });
    console.log(t);
    indexUser(t);
    await t.save();
    res.json(t);
})

app.post("/submitStudentProfile", upload.single('photo'), async (req,res) => {
  const { firstName, lastName, city, state, zipCode, email, facebookProfile, instagramProfile, twitterProfile, school, grade, birthday, s_email, s_pass, s_username, isStudent} = req.query;
  console.log(req.query);
  const fullName = firstName.trim()+" "+lastName.trim();
  const hash = bcrypt.hashSync(s_pass, saltRounds);
  const user = await userdb.create({username:s_username, email:s_email, password:hash, isStudent:isStudent})
  const student_id = user._id;
  const profile_picture =  req.body.photo;
  const t = new Student({
    student_id, fullName, city, state, zipCode, facebookProfile, instagramProfile, twitterProfile, email, school, grade, birthday, profile_picture
  });
  console.log(t);
  await t.save();
  res.json(t);
})

// const studentPreferences = {
//   "Subjects": ["Physics", "Chemistry"],
//   "Learning_Mode": ["In-person", "Online"],
//   "Grade_Level": ["High School", "Middle School"]
// };


// const tutorsData = [
//   {"Name": "Tutor1", "Subject": ["Physics", "Math"], "Learning_Mode": ["In-person", "Online"], "Grade_Level": ["High School", "Middle School"]},
//   {"Name": "Tutor2", "Subject": ["Math", "Chemistry"], "Learning_Mode": ["Online"], "Grade_Level": ["High School"]},
//   {"Name": "Tutor3", "Subject": ["Physics", "Chemistry"], "Learning_Mode": ["Online"], "Grade_Level": ["Middle School"]},
//   {"Name": "Tutor4", "Subject": ["Biology", "Chemistry"], "Learning_Mode": ["In-person"], "Grade_Level": ["High School"]},
//   {"Name": "Tutor5", "Subject": ["Math", "Physics"], "Learning_Mode": ["In-person"], "Grade_Level": ["Middle School", "High School"]}
// ];

// // Call the Python script with student preferences as a command-line argument
// const pythonProcess = spawn('python', ['./pythonModel.py', JSON.stringify(studentPreferences),JSON.stringify(tutorsData)]);

// // Handle data from Python script
// pythonProcess.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

app.post("/addsession", async (req,res) => {
  console.log(req.query)
  const { date,start_time,end_time,mode,location,online_meeting_link,status,grade,topic, subject, limit} = req.body;
  const {tutor_id} = req.query;
  const s = new sessions({
    tutor_id,date,start_time,end_time,mode,location,online_meeting_link,status,grade,topic,subject, limit
  })
  await s.save();
  res.json("saved");
});

app.get('/fetch', (req, res) => {
  console.log(req)
  if (!gfs) {
    return res.status(500).json({ error: 'GridFS not initialized' });
  }
  gfs.files.find().toArray((err, files) => {
    if (err) {
      console.error('Error fetching files:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log(files);
    return res.json(files);
  });
});

app.post('/getstudent', (req,res) => {
  Student.findOne({student_id:req.body.student_id})
  .then((s) => {res.status(200).json(s)})
  .catch((err) => res.status(500))
})

app.post('/updatestudent', async(req,res) => {
  const _id = req.body.student._id;
  console.log(_id)
  const student = req.body.student;
  console.log(student)
  const r = await Student.findByIdAndUpdate(_id, student,{new:true})
  if (!r) {
    res.status(404).json({ error: 'Student not found' });
  }
  res.json(r)
})

app.post('/fetchsession',(req,res) => {
  Tutor.findOne({tutor_id:req.body.tutor_id})
  .then((tutor) => { tutor.subjects = tutor.subjects.map(subject => subject.replace(/[\[\]"]+/g, ''));
                     tutor.languages = tutor.languages.map(language => language.replace(/[\[\]"]+/g, ''));
        sessions.find({tutor_id : req.body.tutor_id})
        .then((s) => { const data = {
        tutor: tutor,
        session: s
      }; 
      res.json(data);
    })
    .catch((e) => { res.status(400).json("error")})
  })
  .catch((err) => {res.status(500)})
})

app.post('/deletesession',(req,res) => {
  const {id} = req.body;
  console.log(id)
  sessions.findByIdAndDelete({_id : id})
  .then((s) => { res.json(s)})
  .catch((e) => { res.status(400).json("error")})
})

app.post('/updatesession',async (req,res) => {
  const {date,start_time,end_time,mode,location,online_meeting_link,status,grade,topic, subject, limit, _id, tutor_id} = req.body;
  const updatedSession = await sessions.findByIdAndUpdate(_id, {
    date, start_time, end_time, mode, location, online_meeting_link, status, grade, topic, subject, limit, tutor_id
}, { new: true });
  res.json("updated");
})

app.post('/fetchsessionbytutor', async (req,res) => {
  const {id} = req.body;
  console.log(id);
  const s = await sessions.find({tutor_id : id});
  console.log(s);
  res.json(s)
});

app.post('/uploadfile', (req,res) => {
  const {tutor_id} = req.query;
  console.log(tutor_id)
})

app.post('/payment', async (req,res) => {
  const {amount} = req.body;
  const options = {
    amount: amount*100,
    currency:"INR"
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.json(order)
})