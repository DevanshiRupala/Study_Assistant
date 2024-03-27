import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/session.css'; 
import stickyImage from '../../images/sticky-1.png';
import Sidebar from './tutor_sidebar';
import { useLocation } from 'react-router-dom';

const SessionForm = () => {
  const [sessionDetails, setSessionDetails] = useState({
    date: '',
    start_time: '',
    end_time: '',
    mode: 'offline', 
    location: '',
    online_meeting_link: '',
    status: 'scheduled' ,
    grade: '',
    subject: '',
    topic: '',
    limit:'',
  });
  const location = useLocation();
  const tutor = location.state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setSessionDetails(prevState => ({
      ...prevState,
      mode,
      location: mode === 'offline' ? '' : sessionDetails.location,
      online_meeting_link: mode === 'online' ? '' : sessionDetails.online_meeting_link
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tutor_id = tutor.tutor_id;
    console.log(tutor_id)
    axios.post("http://localhost:8000/addsession", sessionDetails, {params : {tutor_id}})
      .then((res) => { console.log(res); })
      .catch((err) => { console.log(err); })
  };

  return (
    <div className='wrapper'>
      <Sidebar tutor={tutor}/>
    <div className="session-form-container">
      
      <form onSubmit={handleSubmit} className="session-form">
      <div className="session-image">
            <img src={stickyImage} alt="Sticky Image" className='image' /> 
            <h1>Add Session</h1>
       </div>
        <div className="s-form-row">
          <label>Date:</label>
          <input type="date" name="date" value={sessionDetails.date} onChange={handleChange} />
        </div>
        <div className="s-form-row">
          <div className="time-input">
            <label>Start Time:</label>
            <input type="time" name="start_time" value={sessionDetails.start_time} onChange={handleChange} />
          </div>
          <div className="time-input1">
            <label>End Time:</label>
            <input type="time" name="end_time" value={sessionDetails.end_time} onChange={handleChange} />
          </div>
        </div>
        <div className="s-form-row">
        <div className='num-input'>
          <label>Grade:</label>
          <input type="number" name="grade" value={sessionDetails.grade} onChange={handleChange} />
          </div>
          <div className='num-input1'>
          <label>Max Student:</label>
          <input type="number" name="limit" value={sessionDetails.limit} onChange={handleChange} />
          </div>
        </div>
        <div className="s-form-row">
          <div className='sub-input'>
          <label>Subject:</label>
          <input type="text" name="subject" value={sessionDetails.subject} onChange={handleChange} />
          </div>
          <div className='sub-input1'>
          <label>Topic:</label>
          <input type="text" name="topic" value={sessionDetails.topic} onChange={handleChange} />
          </div>
        </div>
        <div className="s-form-row">
          <label>Mode:</label>
          <select className="select-input" name="mode" value={sessionDetails.mode} onChange={handleModeChange}>
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
        </div>
        {sessionDetails.mode === 'offline' && (
          <div className="s-form-row">
            <label>Location:</label>
            <input type="text" name="location" value={sessionDetails.location} onChange={handleChange} />
          </div>
        )}
        {sessionDetails.mode === 'online' && (
          <div className="s-form-row">
            <label>Online Meeting Link:</label>
            <input type="text" name="online_meeting_link" value={sessionDetails.online_meeting_link} onChange={handleChange} />
          </div>
        )}
        <div className="s-form-row">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SessionForm;