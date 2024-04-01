// StudentSessionsPage.js
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import '../CSS/studentsession.css';
import Sidebar from './student_sidebar';
import axios from 'axios';

const StudentSessionsPage = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [student, setStudent] = useState();
    const location = useLocation();
    const [tutor, setTutor] = useState();
    const [session, setsessions] = useState();
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const student_id = new URLSearchParams(location.search).get("state");
              console.log(student_id)
              const response = await axios.post("http://localhost:8000/getstudent", { student_id });
              console.log(response.data)
              setStudent(response.data)
              const res = await axios.post("http://localhost:8000/getsessionbystudent",{student_id});
              console.log(res.data.tutor,res.data.session)
              setTutor(res.data.tutor);
              setsessions(res.data.session);
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, []);

  
    // Function to handle view more details
    const handleViewMore = (session) => {
      setSelectedSession(session);
      setShowDetails(true);
    };
  
    // Function to close the details box
    const handleCloseDetails = () => {
      setShowDetails(false);
    };

    const getphoto = (session) => {
      const Tutor = tutor.find((t) => t.tutor_id === session.tutor_id);
      return Tutor.profile_picture;
    }

    const getname = (session) => {
      const Tutor = tutor.find((t) => t.tutor_id === session.tutor_id);
      return Tutor.fullName;
    }

    return (
      <div className="student-sessions-page">
        <Sidebar student={student}/> 
        <div className="sessions-container">
              <h2>Booked Sessions</h2>
          <table>
            <thead>
              <tr>
                <th>Tutor Name</th>
                <th>Subject</th>
                <th style={{width: '20px'}}></th>
              </tr>
            </thead>
            <tbody>
            {session && session.map((s) => (
              <tr key={s._id}>
                <td style={{ display:'flex'}}>
                  <img src={getphoto(s)} alt={getname(s)} style={{ width: '50px', borderRadius: '50%', marginRight: '10px' }} />
                  <p>{getname(s)}</p>
                </td>
                <td>{s.subject}</td>
                <td className='buttonclass'>
                  <button className="studentbutton" onClick={() => handleViewMore(s)}>View More</button>
                </td>
              </tr>
            ))}
          </tbody>

          </table>
          {showDetails && (
            <div className="session-details">
              <div className="details-box-container">
                <div className="details-box">
                  <button className="close-button" onClick={handleCloseDetails}>Close</button>
                  <img src={getphoto(selectedSession)} alt={getname(selectedSession)} style={{ width: '100px', borderRadius: '50%' }} />
                  <h2>{getname(selectedSession)}</h2>
                  <p><strong>Subject:</strong> {selectedSession.subject}</p>
                  <p><strong>Date:</strong> {new Date(selectedSession.date).getDate()+'-'+new Date(selectedSession.date).getMonth()+'-'+new Date(selectedSession.date).getFullYear()}</p>
                  <p><strong>Start Time:</strong> {selectedSession.start_time}</p>
                  <p><strong>End Time:</strong> {selectedSession.end_time}</p>
                  <p><strong>Location:</strong> {selectedSession.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default StudentSessionsPage;