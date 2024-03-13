const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userdb = require('./models/userSchema');
const tutor = require('./models/tutorSchema');
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

const clientid = "246227139666-eqad5p4ctdgns5gsiv95po9n4daro08c.apps.googleusercontent.com";
const clientsecret = "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";

mongoose.connect("mongodb://127.0.0.1:27017/study_assistant").then((res) => console.log("Connected"));

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine using GridFS
const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/study_assistant',
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'uploads',
            metadata: {
              tutorId: '65df6117d1b848aa46a4d327' // Store tutor ID with the file metadata
            }
        };
    }
});
const upload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 10, // Increase to 10 MB or adjust as needed
  },
});

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
    let user = await userdb.findOne({email:profile.emails[0].value})
    console.log(user
      )
    if (!user){
      return done(error,null)
    }
    return done(null,user)
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

app.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err || !user) {
      return res.redirect("http://localhost:3000/register");
    }
    res.redirect(`http://localhost:3000/studashboard?email=${user.email}`);

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
            const t = await tutor.findOne({tutor_id : user._id});
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
  const tutors = await tutor.find({ email: { $in: userIds } })
  console.log(tutors)
  res.json(tutors)
})

app.post("/submitTutorProfile", upload.single('photo'), async (req,res) => {
  const { firstName, lastName, city, state, zipCode, email, gender, introduction, qualifications, 
    institutions, gradeLevels, hourlyRates, socialProfiles, subjects, languages, facebookProfile, twitterProfile, instagramProfile,
    s_username, s_email, s_pass, isStudent} = req.query;
    const hash = bcrypt.hashSync(s_pass, saltRounds);
    const user = await userdb.create({ username: s_username, email: s_email, password: hash, isStudent: isStudent});
    const fullName = firstName.trim()+lastName.trim();
    const tutor_id = user._id;
    const profile_picture = req.body.photo;
    const t = new tutor({
      tutor_id,fullName, city, state, zipCode, email, gender, introduction, qualifications, profile_picture,
    institutions, gradeLevels, hourlyRates, socialProfiles, subjects, languages, facebookProfile, twitterProfile, instagramProfile
    });
    console.log(t);
    indexUser(t);
    await t.save();
    res.json(t);
})

app.post("/submitStudentProfile", upload.single('photo'), async (req,res) => {
  const { firstName, lastName, city, state, zipCode, email, school, grade, birthday, s_email, s_pass, s_username, isStudent} = req.query;
  console.log(req.query);
  const fullName = firstName.trim()+lastName.trim();
  const hash = bcrypt.hashSync(s_pass, saltRounds);
  const user = await userdb.create({username:s_username, email:s_email, password:hash, isStudent:isStudent})
  const student_id = user._id;
  const profile_picture =  req.body.photo;
  const t = new Student({
    student_id, fullName, city, state, zipCode, email, school, grade, birthday, profile_picture
  });
  console.log(t);
  //indexUser(t);
  await t.save();
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

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({file : req.file});
});

app.get('/fetch', (req, res) => {
  const tutorId = '65df6117d1b848aa46a4d327';
  console.log("hii")
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

app.post('/fetchsession',(req,res) => {
  sessions.find({tutor_id : req.body.tutor_id})
  .then((s) => { res.json(s)})
  .catch((e) => { res.status(400).json("error")})
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
})