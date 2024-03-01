// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './register.css';

// const Register = () => {
//     const [email, setemail] = useState("");
//     const [pass, setpass] = useState("");
//     const navigate = useNavigate();

//     const google = () => {
//       window.location.href = "http://localhost:8000/auth/google/callback";
//     }

//     const verifydata = async () => {
//         try {
//             const res = await axios.post("http://localhost:8000/login_user", { email, pass});
//             if(res.status === 200 && !res.data.isStudent)
//             {
//                navigate('/tutor_dashboard')
//             } 
//             else if(res.status === 200 && res.data.isStudent)
//             {
//                 navigate('/studashboard')
//             }
//         } catch (err) {
//           console.log(err)
//           alert(`${err}`)
//         }
//     }

//     return (
//         <>
//             <form onSubmit={(e) => {e.preventDefault(); verifydata();}} className='signup_form'>
//             <input type="email" name="email" placeholder='email' onChange={(e) => setemail(e.target.value)} required/><br/>
//             <input type="password" name="password" placeholder='password' onChange={(e) => setpass(e.target.value)} required/><br/>
//             <button type="submit">submit</button><br/>
//             <button onClick={google}>Continue with google</button>
//             </form>
//         </>
//     )
// }

// export default Register;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import Navbar from './navbar';
import axios from 'axios';

function Login() {
    const [email, setemail] = useState("");
        const [pass, setpass] = useState("");
        const navigate = useNavigate();
    
        const google = () => {
          window.location.href = "http://localhost:8000/auth/google/callback";
        }
    
        const verifydata = async () => {
            try {
                const res = await axios.post("http://localhost:8000/login_user", { email, pass});
                if(res.status === 200 && !res.data.isStudent)
                {
                   navigate('/tutor_dashboard')
                } 
                else if(res.status === 200 && res.data.isStudent)
                {
                    navigate('/studashboard')
                }
            } catch (err) {
              console.log(err)
              alert(`${err}`)
            }
        }

return (
    <>
    <div className="card" id="loginCard">
      <div className="alternate-text">
        <Link id="reg-link" to="/register">
          <div>No Account? Sign Up!</div>
        </Link>
      </div>
      <h1 className="card-title" id="signIn">
        Sign In
      </h1>
      <div className="log-reg-body">
        <form className="form-body" >
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
          <button onClick={(e) => {e.preventDefault(); verifydata();}} type="submit" className="btn">
            Login
          </button>
        </form>
        <label>Or</label>
        <button onClick={google} type="submit" className="btn">
            Continue with google
          </button>
      </div>
    </div>
    </>
  );
}

export default Login;