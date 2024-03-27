import React, { useState, useEffect } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import '../CSS/tutor.css';
import Sidebar from './tutor_sidebar';

const TutorProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();
    const [tutor,setTutor] = useState(location.state);
    //const { tutor } = useParams();
    console.log(tutor);

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const tutorParam = searchParams.get('tutor');
    //     console.log(tutorParam);
    //   }, [location]);

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
        institutes: 'XYZ University',
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

    return (
        <div className="tutor-profile-container">
            <div className="sidebar-container">
                <Sidebar tutor={tutor}/>
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
                                <p><strong>Graduate Levels:</strong> {tutor.gradLevels}</p>
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
                            <button onClick={handleEdit}>Edit Profile</button>
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
                                    <input type="text" value={tutor.city} onChange={(e) => handleInputChange('address.city', e.target.value)} placeholder="City" />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="zipcode">ZipCode:</label>
                                    <input type="text" value={tutor.zipcode} onChange={(e) => handleInputChange('address.zipcode', e.target.value)} placeholder="Zipcode" />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="state">State:</label>
                                    <input type="text" value={tutor.state} onChange={(e) => handleInputChange('address.state', e.target.value)} placeholder="State" />
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
                                {tutorData.subjects.map((subject, index) => (
                                    <div key={index} className="input-row">
                                        <label htmlFor="subject">Subjects:</label>
                                        <input type="text" value={tutor.subject} onChange={(e) => handleInputChange(`subjects[${index}]`, e.target.value)} />
                                    </div>
                                ))}
                                <div className="input-row">
                                        <label htmlFor="social profile">SocialProfile:</label>
                                        <input type="text" value={tutor.gradLevels} onChange={(e) => handleInputChange('gradLevels', e.target.value)} placeholder="Graduate Levels" />
                                    </div>
                                    <input type="text" value={tutor.socialProfiles} onChange={(e) => handleInputChange('socialProfiles', e.target.value)} placeholder="Social Profiles" />
                                </div>
                                <div className="other-details1">
                                    <h3>Other Details</h3>
                                    <div className="input-row">
                                        <label htmlFor="hourlyrate">HourlyRate:</label>
                                        <input type="text" value={tutor.hourlyRates} onChange={(e) => handleInputChange('hourlyRate', e.target.value)} placeholder="Hourly Rate" />
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="languages">Languages:</label>
                                        {tutorData.languages.map((language, index) => (
                                            <div key={index} className="input-row">
                                                <input type="text" value={tutor.language} onChange={e => handleLanguageChange(index, e.target.value)} placeholder="Language" />
                                                <button onClick={() => handleRemoveLanguage(index)}>-</button>
                                            </div>
                                        ))}
                                        <div className="input-row">
                                            <input type="text" value={tutor.languages} onChange={handleNewLanguageChange} placeholder="New Language" />
                                            <button onClick={handleAddNewLanguage}>+</button>
                                        </div>
                                    </div>
                                    <div className="input-row">
                                        <label htmlFor="bio">Bio:</label>
                                        <textarea value={tutor.introduction} onChange={(e) => handleInputChange('bio', e.target.value)} placeholder="Bio"></textarea>
                                    </div>
                                </div>
                                <button onClick={handleSave}>Save</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

export default TutorProfile;
