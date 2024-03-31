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
    const [tutor, settutor] = useState();
    const [session, setSession] = useState(); 
    let earning = 0;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tutor_id = new URLSearchParams(location.search).get("state");
                console.log(tutor_id)
                const response = await axios.post("http://localhost:8000/fetchsession", { tutor_id });
                settutor(response.data.tutor)
                console.log(tutor)
                earning = response.data.earning
                setSessions(response.data.session)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleViewMore = (session) => { 
        setSession(session); 
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
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
        console.log(id)
        await axios.post("http://localhost:8000/updatesession",session)
        .then((res) => {alert("session updated successfully"); setModalOpen(false)})
        .catch((err) => {console.log(err);})
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
    setSession(prevSession => ({
        ...prevSession,
        [name]: name === 'date' ? new Date(value) : value
    }));
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
                        <label className='lab'>{earning}</label>
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
                    <label className='upcoming'><b>Upcoming Sessions :</b> </label><br /><br />
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
                                <input type="text" placeholder="Date" name="date" onChange={handleChange} value={formatDate(session.date)} />
                            </div>
                            <div className="input-group">
                                <label>Start Time:</label>
                                <input type="time" value={session.start_time} onChange={handleChange} name="start_time" placeholder="Start Time" />
                                <label>End Time:</label>
                                <input type="time" value={session.end_time} onChange={handleChange} name="end_time" placeholder="End Time" />
                            </div>
                            <div className="input-group">
                                <label>Grade:</label>
                                <input type="text" value={session.grade} onChange={handleChange} name="grade" placeholder="Grade" />
                                <label>Max Students:</label>
                                <input type="number" value={session.limit} onChange={handleChange} name="limit" placeholder="Max Students" />
                            </div>
                            <div className="input-group">
                                <label>Subject:</label>
                                <input type="text" value={session.subject} onChange={handleChange} name="subject" placeholder="Subject" />
                                <label>Topic:</label>
                                <input type="text" value={session.topic} onChange={handleChange} name="topic" placeholder="Topic" />
                            </div>
                            <div className="input-group">
                                <label className='session_date'>Mode:</label>
                                <input type="text" value={session.mode} onChange={handleChange} name="mode" placeholder="Mode" />
                            </div>
                            <div className="input-group">
                                <label className='session_date'>Location:</label>
                                <input type="text" value={session.location} onChange={handleChange} name="location" placeholder="Location" />
                            </div>
                            <div className="input-group">
                                <button className='Session_button' onClick={() => setModalOpen(false)}>OK</button>
                                <button className='Session_button' onClick={() => onUpdate(session)}>Update</button>
                                <button className='Session_button' onClick={() => onDelete(session)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>                
                )}
            </div>
        </div>
    );
}

export default TutorDashboard;