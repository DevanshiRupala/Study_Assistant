import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/viewsession.css'
import { useLocation, useNavigate, Link } from 'react-router-dom';

const DisplaySessions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessions, setSessions] = useState();
  const {tutor} = location.state;
  console.log(tutor);

  useEffect(() => {
    const id = tutor.tutor_id;
    console.log(id)
    axios.post("http://localhost:8000/fetchsessionbytutor",{id})
    .then((res) => {console.log(res.data);setSessions(res.data)})
    .catch((err) => {console.log(err)});
  }, []);

  const handleBookSession = (sessionId) => {
    alert(`Session ${sessionId} booked!`);
  };

  const handleButtonClick = () => {
    navigate('/tutorsearched', {params:{tutor}});
    <Link ></Link>
  };

  return (
    <div className='v_session'>
      <h1>Session List</h1>
      <ul>
        {sessions && sessions.map((session) => (
          <li key={session.session_id}>
            <p>Date: {session.date}</p>
            <p>Start Time: {session.start_time}</p>
            <p>End Time: {session.end_time}</p>
            <p>Mode: {session.mode}</p>
            {session.mode === 'offline' && <p>Location: {session.location}</p>}
            {session.mode === 'online' && <p>Online Meeting Link: {session.online_meeting_link}</p>}
            <p>Grade: {session.grade}</p>
            <p>Subject: {session.subject}</p>
            <p>Topic: {session.topic}</p>
            <p>Status: {session.status}</p>
            <p>Max Students: {session.limit}</p>
            <button onClick={() => handleBookSession(session.session_id)}>Book Session</button>
          </li>
        ))}
      </ul>
      <Link to='/tutorsearched' state={tutor} className='btn_index1'>Back</Link> 
    </div>
     
  );
};

export default DisplaySessions;