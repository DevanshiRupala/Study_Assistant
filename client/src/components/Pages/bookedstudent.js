import React, { useEffect, useState } from 'react';
import '../CSS/bookedstudent.css';
import Sidebar from './tutor_sidebar'; 
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Showstudent = () => {
    const [students,setStudents] = useState([]);
    const location = useLocation();
    const tutor = location.state;
    console.log(tutor)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
        const tutor_id = tutor.tutor_id;
        const res = await axios.post("http://localhost:8000/bookedstudent", {tutor_id});
        console.log(res.data)
        setStudents(res.data);}
        fetchdata();
    },[])

    const onviewmore = (student) => {
        navigate('/viewstudent',{state:{student}})
    }

    return (
        <div className="page-container">
            <Sidebar tutor={tutor}/> 
            {students && students.map((s) => (
            <div className="student-card">
                <div className="student-avatar">
                    <img src={s.profile_picture} alt="Student" />
                </div>
                <div className="student-info">
                    <h3>{s.fullName}</h3>
                    <div className="student-address">
                        <p>{s.city},{s.state}</p>
                    </div>
                    <button className="view-more-btn" onClick={() => onviewmore(s)}>View More</button>
                </div>
            </div>))}
        </div>
    );
}

export default Showstudent;