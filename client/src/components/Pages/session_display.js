import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/sessiondisplay.css'
import { useNavigate } from 'react-router-dom';
const DisplaySessions = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([
    {
      session_id: 1,
      date: '2024-03-14',
      start_time: '10:00 AM',
      end_time: '12:00 PM',
      mode: 'offline',
      location: 'Example Location',
      online_meeting_link: '',
      grade: 9,
      subject: 'Math',
      topic: 'Algebra',
      status: 'scheduled',
      limit: 15,
    },
    {
        session_id: 2,
        date: '2024-03-15',
        start_time: '2:00 PM',
        end_time: '4:00 PM',
        mode: 'online',
        location: '',
        online_meeting_link: 'https://example.com/meeting-2',
        grade: 10,
        subject: 'Science',
        topic: 'Physics',
        status: 'completed',
        limit: 20,
      },
      {
        session_id: 3,
        date: '2024-03-16',
        start_time: '1:30 PM',
        end_time: '3:30 PM',
        mode: 'offline',
        location: 'Example Location 3',
        online_meeting_link: '',
        grade: 8,
        subject: 'History',
        topic: 'Ancient Civilizations',
        status: 'scheduled',
        limit: 18,
      },
    // Add more dummy data as needed
  ]);

  useEffect(() => {
    // This useEffect is just for demonstration purposes.
    // In a real application, you would fetch data from your server.
    // For now, we are using dummy data.
  }, []);


  const handleBookSession = (sessionId) => {
    // Implement your booking logic here, e.g., redirect to a booking page
    alert(`Session ${sessionId} booked!`);
  };

  const handleButtonClick = () => {
    // Redirect to the home page
    navigate('/session');
  };

  return (
    <div className='session'>
      <h1>Session List</h1>
      <ul>
        {sessions.map((session) => (
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
      <button className='btn_index1' onClick={handleButtonClick}><b>Back</b></button> 
    </div>
     
  );
};

export default DisplaySessions;
