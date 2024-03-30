import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/tutor.css';
import Sidebar from './tutor_sidebar';

const TutorProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const [tutor, setTutor] = useState(location.state);
    const [newSubject, setNewSubject] = useState(''); 

    const [tutorData, setTutorData] = useState({
        photo: 'path_to_photo',
        fullname: 'John Doe',
        address: {
            city: 'New York',
            zipcode: '10001',
            state: 'NY'
        },
        email: 'john@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        degree: 'Bachelor of Science',
        institutes: 'Dharmashinh Desai University',
        subjects: ['Math', 'Physics'],
        gradLevels: 'High School, College',
        hourlyRate: '$50',
        languages: ['English'],
        socialProfiles: 'LinkedIn: john-doe, Twitter: @john_doe'
    });
    const [newLanguage, setNewLanguage] = useState('');

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            [field]: value
        }));
    };

    const handleAddLanguage = () => {
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            languages: [...prevTutorData.languages, '']
        }));
    };

    const handleRemoveLanguage = index => {
        const languages = [...tutorData.languages];
        languages.splice(index, 1);
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            languages
        }));
    };

    const handleLanguageChange = (index, value) => {
        const languages = [...tutorData.languages];
        languages[index] = value;
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            languages
        }));
    };

    const handleNewLanguageChange = event => {
        setNewLanguage(event.target.value);
    };

    const handleAddNewLanguage = () => {
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            languages: [...prevTutorData.languages, newLanguage]
        }));
        setNewLanguage('');
    };

    const handleSubjectChange = (index, value) => {
        const subjects = [...tutorData.subjects];
        subjects[index] = value;
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            subjects
        }));
    };
    
    const handleRemoveSubject = index => {
        const subjects = [...tutorData.subjects];
        subjects.splice(index, 1);
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            subjects
        }));
    };
    
    const handleNewSubjectChange = event => {
        setNewSubject(event.target.value);
    };
    
    const handleAddNewSubject = () => {
        setTutorData(prevTutorData => ({
            ...prevTutorData,
            subjects: [...prevTutorData.subjects, newSubject]
        }));
        setNewSubject('');
    };
    
    const handleAddSubject = () => {
        setTutorData(prevState => ({
        ...prevState,
        subjects: [...prevState.subjects, ""]
        }));
    };
  
    return (
        <div className="tutor-profile-container">
            <div className="sidebar-container">
                <Sidebar tutor={tutor} />
            </div>
            <div className="tutor-info-container">
                <div className="tutor-info">
                    <div className="photo-container">
                        <div className="placeholder"><img src={tutor.profile_picture}  style={{ width: '190%' }} alt="Profile" /></div>
                    </div>
                    {!isEditing ? (
                        <>
                            <div className='fullname'><h2>{tutor.fullName}</h2></div>
                            <div className="personal-info">
                                <h3>Personal Information</h3>
                                <p><strong>City:</strong> {tutor.city}</p>
                                <p><strong>Zipcode:</strong> {tutor.zipCode}</p>
                                <p><strong>State:</strong> {tutor.state}</p>
                                <p><strong>Email:</strong> {tutor.email}</p>
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
                            <div className="other-details">
                                <h3>Other Details</h3>
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
                                <input type="text" value={tutor.fullname} onChange={(e) => handleInputChange('fullname', e.target.value)} />
                            </div>
                            <div className="personal-info1">
                                <h3>Personal Information</h3>
                                <div className="input-row">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" value={tutor.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="City" />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="zipcode">ZipCode:</label>
                                    <input type="text" value={tutor.zipcode} onChange={(e) => handleInputChange('zipcode', e.target.value)} placeholder="Zipcode" />
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
                                    <input type="text" value={tutor.qualifications} onChange={(e) => handleInputChange('degree', e.target.value)} placeholder="Degree" />
                                     </div>
                                     <div className="input-row">
                                        <label htmlFor="institutes">Institutes:</label>
                                        <input type="text" value={tutor.institutions} onChange={(e) => handleInputChange('institutes', e.target.value)} placeholder="Institutes" />
                                     </div>
                                     <div className="language-list">
                                                <div className="language-item">
                                                    <label htmlFor="languages">Subjects:</label>
                                                    <div className="language-row">
                                                        <input type="text" value={tutorData.subjects[0]} onChange={e => handleLanguageChange(0, e.target.value)} placeholder="Subject" />
                                                        <button onClick={handleAddNewSubject}>+</button>
                                                    </div>
                                                    {tutorData.subjects.slice(1).map((subject, index) => (
                                                        <div key={index} className="language-row">
                                                            <input type="text" value={subject} onChange={e => handleSubjectChange(index + 1, e.target.value)} placeholder="Subject" />
                                                            <button onClick={() => handleRemoveSubject(index + 1)}>-</button>
                                                        </div>
                                                    ))}
                                                    <div className="language-row">
                                                        <input type="text" value={newSubject} onChange={handleNewSubjectChange} placeholder="New subject" />
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
                                            <label htmlFor="hourlyrate">HourlyRate:</label>
                                            <input type="text" value={tutor.hourlyRates} onChange={(e) => handleInputChange('hourlyRate', e.target.value)} placeholder="Hourly Rate" />
                                         </div>
                        
                                         <div className="language-list">
                                                <div className="language-item">
                                                    <label htmlFor="languages">Languages:</label>
                                                    <div className="language-row">
                                                        <input type="text" value={tutorData.languages[0]} onChange={e => handleLanguageChange(0, e.target.value)} placeholder="Language" />
                                                        <button onClick={handleAddNewLanguage}>+</button>
                                                    </div>
                                                    {tutorData.languages.slice(1).map((language, index) => (
                                                        <div key={index} className="language-row">
                                                            <input type="text" value={language} onChange={e => handleLanguageChange(index + 1, e.target.value)} placeholder="Language" />
                                                            <button onClick={() => handleRemoveLanguage(index + 1)}>-</button>
                                                        </div>
                                                    ))}
                                                    <div className="language-row">
                                                        <input type="text" value={newLanguage} onChange={handleNewLanguageChange} placeholder="New Language" />
                                                        <button onClick={handleAddNewLanguage}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="input-row1">
                                            <label htmlFor="bio">Bio:</label>
                                            <textarea value={tutor.introduction} onChange={(e) => handleInputChange('bio', e.target.value)} placeholder="Bio"></textarea>
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