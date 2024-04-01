import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/tutor.css';
import Sidebar from './tutor_sidebar';
import axios from 'axios';

const TutorProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const [tutor, setTutor] = useState(location.state);
    const [newSubject, setNewSubject] = useState(''); 
    const [newLanguage, setNewLanguage] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(tutor)
        const res = await axios.post('http://localhost:8000/updatetutor',{tutor});
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setTutor(prevTutorData => ({
            ...prevTutorData,
            [field]: value
        }));
    };

    const handleAddLanguage = () => {
        setTutor(prevTutorData => ({
            ...prevTutorData,
            languages: [...prevTutorData.languages, '']
        }));
    };

    const handleRemoveLanguage = index => {
        const languages = [...tutor.languages];
        languages.splice(index, 1);
        setTutor(prevTutorData => ({
            ...prevTutorData,
            languages
        }));
    };

    const handleLanguageChange = (index, value) => {
        const languages = [...tutor.languages];
        languages[index] = value;
        setTutor(prevTutorData => ({
            ...prevTutorData,
            languages
        }));
    };

    const handleNewLanguageChange = event => {
        setNewLanguage(event.target.value);
    };

    const handleAddNewLanguage = () => {
        setTutor(prevTutorData => ({
            ...prevTutorData,
            languages: [...prevTutorData.languages, newLanguage]
        }));
        setNewLanguage('');
    };

    const handleSubjectChange = (index, value) => {
        const subjects = [...tutor.subjects];
        subjects[index] = value;
        setTutor(prevTutorData => ({
            ...prevTutorData,
            subjects
        }));
    };
    
    const handleRemoveSubject = index => {
        const subjects = [...tutor.subjects];
        subjects.splice(index, 1);
        setTutor(prevTutorData => ({
            ...prevTutorData,
            subjects
        }));
    };
    
    const handleNewSubjectChange = event => {
        setNewSubject(event.target.value);
    };
    
    const handleAddNewSubject = () => {
        setTutor(prevTutorData => ({
            ...prevTutorData,
            subjects: [...prevTutorData.subjects, newSubject]
        }));
        setNewSubject('');
    };
  
  
    return (
        <div className="tutor-profile-container">
            <div className="sidebar-container">
                <Sidebar tutor={tutor} />
            </div>
            <div className="tutor-info-container">
                <div className="tutor-info">
                    <div className="photo-container">
                        <div className="placeholder"><img src={tutor.profile_picture}  style={{ width: '100%' }} alt="Profile" /></div>
                    </div>
                    {!isEditing ? (
                        <>
                            <div className='fullname'><h2 style={{font:"20px"}}>{tutor.fullName}</h2></div>
                            <div className='tutorinfo'>
                            <div className="personal-info">
                                <h3>Personal Information</h3>
                                <p><strong>Email:</strong> {tutor.email}</p>
                                <p><strong>Gender:</strong> {tutor.gender}</p>
                                <p><strong>City:</strong> {tutor.city}</p>
                                <p><strong>Zipcode:</strong> {tutor.zipCode}</p>
                                <p><strong>State:</strong> {tutor.state}</p>
                            </div>
                            <div className="professional-info">
                                <h3>Professional Information</h3>
                                <p><strong>Degree:</strong> {tutor.qualifications}</p>
                                <p><strong>Institutes:</strong> {tutor.institutions}</p>
                                <p><strong>Subjects:</strong> {tutor.subjects.join(', ')}</p>
                                <p><strong>Grade Levels:</strong> {tutor.gradeLevels}</p>
                                <p><strong>Social Profiles:</strong><a href={tutor.facebookProfile}> {tutor.facebookProfile}</a></p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href={tutor.twitterProfile}>:&nbsp;{tutor.twitterProfile}</a></p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href={tutor.instagramProfile}>:&nbsp;{tutor.instagramProfile}</a></p>
                            </div>
                            </div>
                            <div className="other-details">
                                <h3>Other Details</h3>
                                <p><strong>Teaching Mode:</strong> {tutor.mode}</p>
                                <p><strong>Hourly Rate:</strong> {tutor.hourlyRates}</p>
                                <p><strong>Languages:</strong> {tutor.languages.join(', ')}</p>
                                <p><strong>Bio:</strong> {tutor.introduction}</p>
                            </div><br/>
                            <button onClick={handleEdit} className='tutor_edit_btn'>Edit Profile</button>
                        </>
                    ) : (
                        <>
                            <div className='fullname1'>
                                <label htmlFor="name">Name:</label>
                                <input type="text" value={tutor.fullName} onChange={(e) => handleInputChange('fullname', e.target.value)} />
                            </div>
                            <div className="personal-info1">
                                <h3>Personal Information</h3>
                                <div className="input-row">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" value={tutor.gender} onChange={(e) => handleInputChange('gender', e.target.value)} placeholder="Gender" />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="zipcode">ZipCode:</label>
                                    <input type="text" value={tutor.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} placeholder="Zipcode" />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" value={tutor.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="City" />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="state">State:</label>
                                    <input type="text" value={tutor.state} onChange={(e) => handleInputChange('state', e.target.value)} placeholder="State" />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" value={tutor.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Email" />
                                </div>
                            </div>
                            <div className="professional-info1">
                                <h3>Professional Information</h3>
                                <div className="input-row">
                                    <label htmlFor="degree">Degree:</label>
                                    <input type="text" value={tutor.qualifications} onChange={(e) => handleInputChange('qualifications', e.target.value)} placeholder="Degree" />
                                     </div>
                                     <div className="input-row">
                                        <label htmlFor="institutes">Institutes:</label>
                                        <input type="text" value={tutor.institutions} onChange={(e) => handleInputChange('institutions', e.target.value)} placeholder="Institutes" />
                                     </div>
                                     <div className="language-list">
                                                <div className="language-item">
                                                    <label>Subjects:</label>
                                                    <div className="language-row">
                                                        <input type="text" value={tutor.subjects[0]} onChange={e => handleSubjectChange(0, e.target.value)} placeholder="Subject" />
                                                        <button onClick={handleAddNewSubject}>+</button>
                                                    </div>
                                                    {tutor.subjects.slice(1).map((subject, index) => (
                                                        <div key={index} className="language-row">
                                                            <input type="text" value={subject} onChange={e => handleSubjectChange(index + 1, e.target.value)} placeholder="Subject" />
                                                            <button onClick={() => handleRemoveSubject(index + 1)}>-</button>
                                                        </div>
                                                    ))}
                                                    <div className="language-row">
                                                        <input type="text"  id="lastSubjectField" onChange={handleNewSubjectChange} placeholder="New subject" />
                                                        <button onClick={handleAddNewSubject}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                     <div className="input-row2">
                                            <label htmlFor="social profile">SocialProfile:</label>
                                            <input type="text" value={tutor.facebookProfile} onChange={(e) => handleInputChange('facebookProfile', e.target.value)} placeholder="Social Profiles" />
    
                                         </div>
                                         <div className="input-row3">
                                            <input type="text" value={tutor.instagramProfile} onChange={(e) => handleInputChange('instagramProfile', e.target.value)} placeholder="Social Profiles" /></div>
                                            <div className="input-row3">
                                            <input type="text" value={tutor.twitterProfile} onChange={(e) => handleInputChange('twitterProfile', e.target.value)} placeholder="Social Profiles" /></div>
                                     </div>
                                     <div className="other-details1">
                                         <h3>Other Details</h3>
                                         <div className="input-row">
                                            <label htmlFor="hourlyrate">Teaching Mode:</label>
                                            <input type="text" value={tutor.mode} onChange={(e) => handleInputChange('mode', e.target.value)} placeholder="Hourly Rate" />
                                         </div>
                                         <div className="input-row">
                                            <label htmlFor="hourlyrate">HourlyRate:</label>
                                            <input type="text" value={tutor.hourlyRates} onChange={(e) => handleInputChange('hourlyRates', e.target.value)} placeholder="Hourly Rate" />
                                         </div>
                        
                                         <div className="language-list">
                                                <div className="language-item">
                                                    <label htmlFor="languages">Languages:</label>
                                                    <div className="language-row">
                                                        <input type="text" value={tutor.languages[0]} onChange={e => handleLanguageChange(0, e.target.value)} placeholder="Language" />
                                                        <button onClick={handleAddNewLanguage}>+</button>
                                                    </div>
                                                    {tutor.languages.slice(1).map((language, index) => (
                                                        <div key={index} className="language-row">
                                                            <input type="text" value={language} onChange={e => handleLanguageChange(index + 1, e.target.value)} placeholder="Language" />
                                                            <button onClick={() => handleRemoveLanguage(index + 1)}>-</button>
                                                        </div>
                                                    ))}
                                                    <div className="language-row">
                                                        <input type="text" value={newLanguage} id="lastLanguageField" onChange={handleNewLanguageChange} placeholder="New Language" />
                                                        <button onClick={handleAddNewLanguage}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="input-row1">
                                            <label htmlFor="bio">Bio:</label>
                                            <textarea value={tutor.introduction} type="text" onChange={(e) => handleInputChange('introduction', e.target.value)} placeholder="Bio"></textarea>
                                         </div>
                                    </div>
                                    <button onClick={handleSave} className='tutor_edit_btn'>Save</button>
                                </>
                             )}
                        </div>
                    </div>
                </div>
        );
    };
     
export default TutorProfile;