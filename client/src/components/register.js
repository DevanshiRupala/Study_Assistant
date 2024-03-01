// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './register.css';

// const Register = () => {
//     const [email, setemail] = useState("");
//     const [pass, setpass] = useState("");
//     const [username, setusername] = useState("");
//     const [isStudent, setStudent] = useState(false);
//     const navigate = useNavigate();

//     const google = () => {
//       window.location.href = "http://localhost:8000/auth/google/callback";
//     }

//     const adddata = async () => {
//         try {
//             const res = await axios.post("http://localhost:8000/signup_user", { username, email, pass, isStudent});
//             if(res)
//             navigate("/tutor_profile");
//         } catch (err) {
//           console.log(err)
//           alert(`${err.response.data.error}`)
//         }
//     }

//     return (
//         <>
//             <form onSubmit={(e) => {e.preventDefault(); adddata();}} className='signup_form'>
//             <input type='radio' name='isStudent' value='student' onChange={(e) => setStudent(true)} required/> Student
//             <input type='radio' name='isStudent' value='tutor' onChange={(e) => setStudent(false)}/> Tutor
//             <input type="text" name="name" placeholder='username' onChange={(e) => setusername(e.target.value)} required/><br/>
//             <input type="email" name="email" placeholder='email' onChange={(e) => setemail(e.target.value)} required/><br/>
//             <input type="password" name="password" placeholder='password' onChange={(e) => setpass(e.target.value)} required/><br/>
//             <button type="submit">submit</button><br/>
//             <button onClick={google}>Continue with google</button>
//             </form>
//         </>
//     )
// }

// export default Register;

// // import React from 'react';
// // import './register.css';
// // import Navbar from './navbar';
// // import PersonIcon from '@mui/icons-material/Person';
// // import EmailIcon from '@mui/icons-material/Email';
// // import LockIcon from '@mui/icons-material/Lock';
// // import GoogleIcon from '@mui/icons-material/Google';

// // const Login = () => {

// //   return (
// //     <>
// //     <div class="container">
// //         <div class="form-container">
// //             <form>
// //               <h4><b>Sign Up</b></h4>
// //               <div class="form-group">
// //                 <label for="username">
// //                 <div id='person'><PersonIcon/>&nbsp;<span id='span'>Username</span></div>
// //                 </label>
// //                 <input type="text" id="username" name="username" required/>
// //               </div>
// //               <div class="form-group">
// //                 <label for="email">
// //                 <div id='email'><EmailIcon/>&nbsp;<span id='span'> Email</span></div>
// //                 </label>
// //                 <input type="email" id="email" name="email" required/>
// //               </div>
// //               <div class="form-group">
// //                 <label for="password">
// //                 <div id='password'><LockIcon/>&nbsp;<span id='span'>Password</span></div>
// //                 </label>
// //                 <input type="password" id="password" name="password" required/>
// //               </div>
// //                 <button id='btn4' type="submit">Sign Up</button>
// //                 <div class="form-group">
// //                 <label for="google">
// //                 <div id='google'>&nbsp;<span id='span'> <button id='btn5'><GoogleIcon/>Continue with google</button></span></div>
// //                 </label>
// //               </div>
// //             </form>
// //         </div>
// //         <div class="image-container"> 
// //           <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' alt='image'/>
// //         </div> 
// //       </div>
    
// //     </>
// //   );
// // };

// // export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import Navbar from './navbar';
import axios from 'axios';

function Register() {
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [username, setusername] = useState("");
    const [isStudent, setStudent] = useState(false);
    const navigate = useNavigate();

    const google = () => {
      window.location.href = "http://localhost:8000/auth/google/callback";
    }

    const adddata = async () => {
        try {
            const res = await axios.post("http://localhost:8000/signup_user", { username, email, pass, isStudent});
            if(!isStudent)
            navigate("/tutor_profile");
            else
            navigate("/student_profile");
        } catch (err) {
          console.log(err)
          alert(`${err.response.data.error}`)
        }
    }

return (
    <>
    <div className="card" id="loginCard">
      <div className="alternate-text">
        <Link id="reg-link" to="/register">
          <div></div>
        </Link>
      </div>
      <h1 className="card-title" id="signIn">
        Sign Up
      </h1>
      <div className="log-reg-body">
        <form className="form-body" >
        <div className="radio_button">
            <label>Student</label>
            <input type='radio' name='isStudent' value='student' onChange={(e) => setStudent(true)} required/>  
            <label>Tutor</label>
            <input type='radio' name='isStudent' value='tutor' onChange={(e) => setStudent(false)}/> <br/>
        </div> 
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your username"
              onChange={(e) => {setusername(e.target.value)}}
              name="password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Email"
              onChange={(e) => {setemail(e.target.value)}}
              name="email"
              required
            />
            <div id="emailHelp" className="form-text">
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              onChange={(e) => {setpass(e.target.value)}}
              name="password"
              required
            />
          </div>
          <button onClick={(e) => {e.preventDefault(); adddata();}} type="submit" className="btn">
            Sign up
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;