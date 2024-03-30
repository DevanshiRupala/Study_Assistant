import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/login.css";
import axios from 'axios';
import Image1 from "../../images/anim-1-1.gif";
import { Google } from '@mui/icons-material';

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    
    const google = () => {
        window.location.href = "http://localhost:8000/auth/google/callback";
    };
    
    const verifyData = async () => {
        try {
            const res = await axios.post("http://localhost:8000/login_user", { email, pass });
            if (res.status === 200) {
                const tutor = res.data;
                const tutor_id = tutor.tutor_id;
                navigate(`/tutor_dashboard?state=${tutor_id}`);
            } else if (res.status === 201) {
                const student = res.data;
                navigate(`/studashboard?state=${student.student_id}`);
            }
        } catch (err) {
            console.log(err);
            alert(`${err}`);
            
        }
    };

    return (
        <div className="login_background">
            <div className="login_side_image1">
                <img src={Image1} alt="Webinar" />
            </div>
            <div className="login_card1" id="loginCard">
                <div className="login_alternate-text">
                    <Link className="login_reg-link" to="/register">
                        <div><b>No Account? Sign Up!</b></div>
                    </Link>
                </div>
                <h1 className="login_card-title" id="signIn">
                    Sign In
                </h1>
                <div className="login_log-reg-body">
                    <form className="login_form-body">
                        <div className="mb-3">
                            <label htmlFor="loginEmail" className="login_form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="login_form-control"
                                id="loginEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                required
                            />
                            <div id="emailHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPassword" className="login_form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="login_form-control"
                                id="loginPassword"
                                placeholder="Enter your password"
                                onChange={(e) => setPass(e.target.value)}
                                name="password"
                                required
                            />
                        </div>
                        <button onClick={(e) => { e.preventDefault(); verifyData(); }} type="submit" className="login_btn">
                            Login
                        </button>
                    </form>
                    <label className="login_or">Or</label>
                    <button onClick={google} type="submit" className="login_btn1" style={{display:"flex"}}>&nbsp;&nbsp;&nbsp;&nbsp;<span><Google/></span>&nbsp;
                        Continue with google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;