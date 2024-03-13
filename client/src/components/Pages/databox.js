// DummyDataBox.js
import React from 'react';
import '../CSS/databox.css';
import {Link} from 'react-router-dom';

const DummyDataBox = ({tutor}) => {

  return (
    <div className="profile-container">
        <div className="profile-card" key={tutor.tutor_id}>
          <img src={tutor.profile_picture} alt="profile" className="profile-icon" />
          <div className="profile-name">{tutor.fullName}</div>
          <div className="profile-position">{tutor.city}</div>
          <div className="profile-bio">{tutor.zipCode}</div>
<<<<<<< HEAD
          <Link to='/tutorsearched' state={tutor} className="dashbord-button">Connect</Link>
=======
          <a href="#" className="dashbord-button">Connect</a>
>>>>>>> 19731c4b961f64d2374e4553ebae0087c683cc62
        </div>
    </div>
  );
};

export default DummyDataBox;
