import '../CSS/viewsession.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';


const Session = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const location = useLocation();
  const [sessions, setSessions] = useState();
  const [tutor, setTutor] = useState(null);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      if (location.state) {
        setTutor(location.state.tutor);
        console.log(tutor)
        setStudent(location.state.student);
      } else {
        const tutorId = new URLSearchParams(location.search).get('tutor');
        const studentId = new URLSearchParams(location.search).get('student');
        try {
          const response = await axios.post("http://localhost:8000/gettutorandstudent", { tutor_id: tutorId, student_id: studentId });
          setTutor(response.data.tutor);
          setStudent(response.data.student);
        } catch (error) {
          console.error('Error fetching tutor and student:', error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tutor && student) {
      const id = tutor.tutor_id;
      axios.post("http://localhost:8000/fetchsessionbytutor", { id })
        .then((res) => setSessions(res.data))
        .catch((err) => console.log(err));
    }
  }, [tutor, student]);

  const handleViewMore = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const onpay = async (id) => {
    const amount = tutor.hourlyRates;
    console.log(amount);
    const res = await axios.post("http://localhost:8000/payment",{amount});
    console.log(res.data);
    const order = res.data;
    const options = {
      key: "rzp_test_hUvLud5nAc9kpa", 
      amount: order.amount, 
      currency: "INR",
      name: "Devanshi Rupala", 
      description: "Test Transaction",
      image: "../../images/logo (2).png",
      order_id: order.id, 
      callback_url: `http://localhost:8000/pay?tutor_id=${tutor.tutor_id}&stu_id=${student.student_id}&session_id=${id}&amount=${amount}`,
      prefill: { 
        "name": student.fullName, 
        "email": student.email,   
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#528FF0"
      }
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
  }

  return (
    <div className='background_gradient'>
    <div>
      <h1 style={{marginLeft:"650px"}}>Session List</h1>
      {sessions && sessions.map((session) => (
      <div className="s-info-box" style={{marginLeft:"30px"}} key={session._id}>
      <div className="s-info-field">
        <label htmlFor="session">Subject:</label>
        <span id="session">&nbsp;{session.subject}</span>
      </div>
      <div className="s-info-field">
        <label htmlFor="topic">Topic:</label>
        <span id="topic">&nbsp;{session.topic}</span>
      </div>
      <div className="s-info-field">
        <label htmlFor="grad">Grade:</label>
        <span id="grad">&nbsp;{session.grade}</span>
      </div>
      <button className="s-view-more-btn" onClick={handleViewMore}>View More</button>

      {modalOpen && (
        <div>
          <div className="s-modal-overlay" onClick={handleCloseModal}/>
          <div className="s-modal" ref={modalRef}>
            <div className="s-modal-content">
              <span className="s-close" onClick={handleCloseModal}>&times;</span>
              <h2 style={{marginLeft:"100px"}}>Session</h2>
              <div className="s-input-group">
                <label>Subject:</label>
                <span>&nbsp;{session.subject}</span><br></br>
              </div>
              <div className="s-input-group">
                <label>Topic:</label>
                <span>&nbsp;{session.topic}</span><br></br>
              </div>
              <div className="s-input-group">
                <label className='s-session_date'>Date:</label>
                <span>{new Date(session.date).getDate() + "-"+new Date(session.date).getMonth()+"-"+new Date(session.date).getFullYear()}</span>
              </div>
              <div className="s-input-group">
                <label>Start Time:</label>
                <span>&nbsp;{session.start_time}</span><br></br>
              </div>
              <div className='s-input-group'>
              <label>End Time:</label>
                <span>&nbsp;{session.end_time}</span>
                </div>
              <div className="s-input-group">
                <label>Grade:</label>
                <span>&nbsp;{session.grade}</span>
              </div>
              {/* <div className='s-input-group'>
              <label>Max Students:</label>
                <span>&nbsp;{session.limit}</span>
              </div> */}
              {session.mode === "offline" && <div className="s-input-group">
                <label className='s-session_date'>Location:</label>
                <span>{session.location}</span><br/>
              </div>}
              {session.mode === "online" && <div className="s-input-group">
                <label className='s-session_date'>Online Meeting Link:</label>
                <span>{session.online_meeting_link}</span><br/>
              </div>}
              <div className="s-input-group">
                <button className='s-Session_button' onClick={() => onpay(session._id)} style={{marginTop:"10px"}}>Book Session</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>))}
    </div>
    <Link to='/tutorsearched' state={{tutor,student}} ><button style={{marginLeft:"40px"}} className='back_button'>Back</button></Link>
    </div>
  );
}

export default Session;
