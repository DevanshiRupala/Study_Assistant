import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../CSS/tutordashboard.css';
import Sidebar from './tutor_sidebar';
import { FaRupeeSign } from 'react-icons/fa';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import ScheduleIcon from '@mui/icons-material/Schedule';

function TutorDashboard() {
    const location = useLocation();
    const [sessions, setSessions] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);
    const  tutor  = location.state;
    const [session, setSession] = useState(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tutor_id = tutor.tutor.tutor_id;
                console.log(tutor_id)
                const response = await axios.post("http://localhost:8000/fetchsession", { tutor_id });
                setSessions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [tutor.tutor_id]);

    const handleViewMore = (session) => { // Accept session date as argument
        setSession(session); // Set the session date
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const onDelete = async (s) => {
        const id = s._id;
        console.log(id);
        axios.post("http://localhost:8000/deletesession",{id})
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    const onUpdate = async (s) => {
        const id = s._id;
        await axios.post("http://localhost:8000/deletesession",id)
        .then((res) => {alert("session deleted successfully")})
        .catch((err) => {console.log(err);})
    }
    
    return (
        <div>
            <div className="dashboard">
                <Sidebar tutor={tutor} />
                <div className="main-content">
                    <div className='box'>
                        <ScheduleIcon className='icon' style={{ fontSize: 30, color: 'white' }} />
                        <label className='lab'>29</label>
                        <h2>Current Session</h2>
                    </div>
                    <div className="box">
                        <FaRupeeSign className='icon' style={{ fontSize: 30, color: 'white' }} />
                        <label className='lab'>29</label>
                        <h2>Earnings</h2>
                    </div>
                    <div className="box">
                        <GroupIcon className='icon' style={{ fontSize: 30, color: 'white' }} />
                        <label className='lab'>29</label>
                        <h2>Total Students</h2>
                    </div>
                    <div className="box">
                        <StarIcon className='icon' style={{ fontSize: 30, color: 'white' }} />
                        <label className='lab'>29</label>
                        <h2>Reviews</h2>
                    </div>
                </div>
                <div className="big-box1">
                    <label className='upcoming'><b>Upcoming Session :</b> </label><br /><br />
                    <table className='border'>
                        <tr>
                            <td className='left'><b>Upcoming Session</b></td>
                            <td className='topic'><b>Topic</b></td>
                            <td className='right'><b>Action</b></td>
                        </tr>
                        {sessions && sessions.map(session => (
                            <tr key={session._id}>
                                <td className='left'>{session.subject}&nbsp;&nbsp;({session.start_time}-{session.end_time})</td>
                                <td className='topic'>{session.topic}</td>
                                <td className='right'>
                                    <button className='viewmore' onClick={()=>handleViewMore(session)}>View More</button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
                {modalOpen && (
                    <div>
                    <div className="modal-overlay" onClick={handleCloseModal} />
                    <div className="modal" ref={modalRef}>
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>&times;</span>
                            <h2>Session</h2>
                            <div className="input-group">
                                <label className='session_date'>Date:</label>
                                <input type="text" placeholder="Date" value={formatDate(session.date)} />
                            </div>
                            <div className="input-group">
                                <label>Start Time:</label>
                                <input type="time" value={session.start_time} placeholder="Start Time" />
                                <label>End Time:</label>
                                <input type="time" value={session.end_time} placeholder="End Time" />
                            </div>
                            <div className="input-group">
                                <label>Grade:</label>
                                <input type="text" value={session.grade} placeholder="Grade" />
                                <label>Max Students:</label>
                                <input type="number" value={session.limit} placeholder="Max Students" />
                            </div>
                            <div className="input-group">
                                <label className='session_date'>Mode:</label>
                                <input type="text" value={session.mode} placeholder="Mode" />
                            </div>
                            <div className="input-group">
                                <label className='session_date'>Location:</label>
                                <input type="text" value={session.location} placeholder="Location" />
                            </div>
                            <div className="input-group">
                                <button className='Session_button' onClick={()=>setModalOpen(false)}>OK</button>
                                <button className='Session_button' onClick={onUpdate}>Update</button>
                                <button className='Session_button' onClick={() => onDelete(session)}>Delete</button>
                            </div>
                            {/* Add more input groups as needed */}
                        </div>
                    </div>
                </div>                
                )}
            </div>
        </div>
    );
}

export default TutorDashboard;