import React, { useState } from 'react'
import {FaBars,FaUserAlt,FaHome,FaPersonBooth} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import "../CSS/student_sidebar.css";

const Stuprofile = ({ student, children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    console.log(student)
    let menuItem = [];
    if(student) {
        console.log(student.student_id)
    menuItem = [
        {
            path: `/student?state=${student.student_id}`,
            name: "Profile",
            icon: <FaUserAlt />
        },
        {
            path: "/studashboard",
            name: "Home",
            icon: <FaHome />
        },
        {
            path: "/",
            name: "Logout",
            icon: <FaPersonBooth />
        },

    ] }

    return (
        <div className="d-container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="d-sidebar">
                <div className="d-top_section">


                    <div style={{ marginLeft: isOpen ? "8px" : "8px" }} className="d-bars">
                        <FaBars onClick={toggle} />
                    </div>

                </div>
                { student &&
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="d-link" activeclassName="active">
                            <div className="d-icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="d-link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Stuprofile;
