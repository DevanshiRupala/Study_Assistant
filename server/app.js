const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userdb = require('./models/userSchema');
const tutor = require('./models/tutorSchema');
const Student = require('./models/studentSchema');
const File = require('./models/fileSchema');
const path = require('path');
const multer = require('multer');
const Grid = require('gridfs-stream');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
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

app.post("/signup_user", async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.pass, saltRounds);
    const user = await userdb.create({ username: req.body.username, email: req.body.email, password: hash, isStudent: req.body.isStudent });

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists." });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.post("/login_user", async (req, res) => {
  try {
    const user = await userdb.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
      bcrypt.compare(req.body.pass, user.password, (err, result) => {
        if (err) {
          res.status(500).json("Re-enter the credentials");
        } else if (result) {
          res.status(200).json(user);
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

app.post("/searchuser", async (req,res) => {
  const result = await searchUser(req.body.subject,req.body.location,req.body.gender,req.body.state);
  console.log(result)
  res.json(result)
})

app.post("/submitTutorProfile", upload.single('photo'), async (req,res) => {
  const { firstName, lastName, city, state, zipCode, email, gender, introduction, qualifications, 
    institutions, gradeLevels, hourlyRates, socialProfiles, subjects, languages } = req.query;
    const fullName = firstName.trim()+lastName.trim();
    const tutor_id = '65c76c0b73e09bcbeb40bf84';
    const t = new tutor({
      tutor_id,fullName, city, state, zipCode, email, gender, introduction, qualifications, 
    institutions, gradeLevels, hourlyRates, socialProfiles, subjects, languages
    });
    console.log(t);
    indexUser(t);
    //await t.save();
    //const re = await userdb.updateOne({email:"j52323030@gmail.com"}, { $set: { profile_picture: req.body.photo } });
    //console.log(re)
})

app.post("/submitStudentProfile", upload.single('photo'), async (req,res) => {
  const { firstName, lastName, city, state, zipCode, email, school, grade, birthday} = req.query;
    const fullName = firstName.trim()+lastName.trim();
    const student_id = '65c75b9f1b025d12e62f899f';
    const t = new Student({
      student_id, fullName, city, state, zipCode, email, school, grade, birthday
    });
    console.log(t);
    indexUser(t);
    await t.save();
    //const re = await userdb.updateOne({email:"j52323030@gmail.com"}, { $set: { profile_picture: req.body.photo } });
    //console.log(re)
})

app.post("/uploadfile", upload.single('file'), async (req, res) => {
  try {
    const originalFilename = req.file.originalname;
    const buffer = req.file.buffer;

    const writestream = gfs.createWriteStream({
        filename: originalFilename
    });

    writestream.write(buffer);
    writestream.end();
    const metadata = new File({
      filename: originalFilename,
  });
  await metadata.save();
    res.send('File uploaded successfully');

} catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}
});

app.get('/getpdf', async (req, res) => {
  try {
      const file = await userdb.findOne({email:"j52323030@gmail.com"});
      console.log(file)

      // if (!file) {
      //     return res.status(404).send('File not found.');
      // }
      res.contentType('application/pdf');
      res.send(file.profile_picture);
  } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).send('An error occurred while fetching the file.');
  }
});

const studentPreferences = {
  'Name': 'Student',
  'Subject': 'Physics',
  'Learning_Mode': 'In-person',
  'Grade_Level': 'High School'
};

const tutorsData = [
  { 'Name': 'Tutor1', 'Subject': 'Math', 'Learning_Mode': 'Online', 'Grade_Level': 'High School' },
  { 'Name': 'Tutor2', 'Subject': 'Science', 'Learning_Mode': 'In-person', 'Grade_Level': 'Middle School' },
  { 'Name': 'Tutor3', 'Subject': 'English', 'Learning_Mode': 'Online', 'Grade_Level': 'Elementary' },
  { 'Name': 'Tutor4', 'Subject': 'Math', 'Learning_Mode': 'In-person', 'Grade_Level': 'High School' },
  { 'Name': 'Tutor5', 'Subject': 'Physics', 'Learning_Mode': 'Online', 'Grade_Level': 'High School' }
];

// Call the Python script with student preferences as a command-line argument
const pythonProcess = spawn('python', ['./pythonModel.py', JSON.stringify(studentPreferences),JSON.stringify(tutorsData)]);

// Handle data from Python script
pythonProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});