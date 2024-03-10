// DummyDataBox.js
import React from 'react';
import '../CSS/databox.css'

const DummyDataBox = () => {
  const profiles = [
    {
      image: 'https://i.imgur.com/bZBG9PE.jpg',
      name: 'Kelly Seikma',
      position: 'Web Designer',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum ante et nisl blandit, eu euismod tellus congue.'
    },
    
  ];

  return (
    <div className="profile-container">
      {profiles.map((profile, index) => (
        <div className="profile-card" key={index}>
          <img src={profile.image} alt="profile" className="profile-icon" />
          <div className="profile-name">{profile.name}</div>
          <div className="profile-position">{profile.position}</div>
          <div className="profile-bio">{profile.bio}</div>
          <a href="#" className="dashbord-button">Connect</a>
        </div>
      ))}
    </div>
  );
};

export default DummyDataBox;
