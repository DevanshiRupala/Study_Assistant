import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/register.css";
import axios from 'axios';
import Image from "../../images/anim-1-1.gif";

function Register() {
    const [s_email, setEmail] = useState("");
    const [s_pass, setPass] = useState("");
    const [s_username, setUsername] = useState("");
    const [isStudent, setStudent] = useState(false);
    const navigate = useNavigate();

    const isPasswordStrong = (password) => {
        if (password.length < 8) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return false;
        }
        return true;
    };

    const addData = async () => {
        if(isPasswordStrong(s_pass))
        {
        if (!isStudent)
            navigate("/tutor_profile", {state : {s_username, s_email, s_pass, isStudent}});
        else
            navigate("/student_profile", {state : {s_username, s_email, s_pass, isStudent}});
        }
        else {
            alert("password skould contain one lowercase,uppercase letter,digit and special character.")
        }
    };

    return (
        <div className="register_background">
            <div className="register_side_image">
                <img src={Image} alt="Webinar" />
            </div>
            <div className="register_card" id="loginCard">
                <div className="register_alternate-text">
                    <Link className="register_reg-link" to="/register">
                        <div></div>
                    </Link>
                </div>
                <h1 className="register_card-title" id="signIn">
                    Sign Up
                </h1>
                <div className="register_log-reg-body">
                    <form className="register_form-body">
                    <div className="register_radio_button">
                            <input type='radio' name='isStudent' id='studentRadio' value='student' onChange={(e) => setStudent(true)} required/>
                            <label htmlFor='studentRadio'>Student</label>
                            
                            <input type='radio' name='isStudent' id='tutorRadio' value='tutor' onChange={(e) => setStudent(false)}/>
                            <label htmlFor='tutorRadio'>Tutor</label>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="registerUsername" className="register_form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="register_form-control"
                                id="registerUsername"
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="registerEmail" className="register_form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="register_form-control"
                                id="registerEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                required
                            />
                            <div id="emailHelp" className="form-text"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="registerPassword" className="register_form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="register_form-control"
                                id="registerPassword"
                                placeholder="Enter your password"
                                onChange={(e) => setPass(e.target.value)}
                                name="password"
                                required
                            />
                        </div>
                        <button onClick={(e) => { e.preventDefault(); addData(); }} type="submit" className="register_btn">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;