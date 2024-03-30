import React, { useEffect, useState, useRef } from 'react';
import '../CSS/student.css';
import Stuprofile from '../Pages/student_sidebar';
import { Twitter, Instagram, Facebook } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [student, setStudentData] = useState();
    const location = useLocation();
    const [photo, setPhoto] = useState(null);
    const fileInputRef = useRef(null);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        console.log(student)
        const response = await axios.post("http://localhost:8000/updatestudent", { student });
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        let updatedValue = value;
    if (field === 'birthday') {
        // Parse the string into a Date object
        updatedValue = new Date(value);
    }
    const updatedStudentData = { ...student };
    updatedStudentData[field] = updatedValue;
    setStudentData(updatedStudentData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const student_id = new URLSearchParams(location.search).get("state");
                console.log(student_id)
                const response = await axios.post("http://localhost:8000/getstudent", { student_id });
                console.log(response.data)
                setStudentData(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const setbirthday = (birthday) => {
        const d = new Date(birthday);
        // Extract the date part in "yyyy-MM-dd" format
        return d.toISOString().split('T')[0];
    }

    const handlePhotoChange = (event) => {
        // Update the photo state with the selected file
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            setPhoto(event.target.result);
        };

        reader.readAsDataURL(file);
    };


    return (
        <>
        { student ? (<div className='wrapper'>
            <Stuprofile student={student}/>
            <div className="student-profile-container">
                <div className="student-info-container">
                    <div className="student-info-left-box">
                        {!isEditing && <div className="photo-container">
                        <img src={student.profile_picture} alt="Student Photo" className='placeholder'/>
                        </div>}
                        {isEditing && <div className="photo-container">
                        {photo && <img src={photo} onClick={() => fileInputRef.current.click()} className='placeholder'/>}
                        {!photo && <img src={student.profile_picture} alt="Student Photo" onClick={() => fileInputRef.current.click()} className='placeholder'/>}
                        <input type="file" accept="image/*" onChange={handlePhotoChange} ref={fileInputRef}/>
                        </div>}
                        <div className='studentfullname'>
                            {isEditing ? (
                                <div className="input-row">
                                    <label htmlFor="fullname">Full Name:</label>
                                    <input type="text" value={student.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
                                </div>
                            ) : (
                                <>
                                <h2>{student.fullName}</h2>
                                </>
                            )}
                        </div>
                        {!isEditing && <div className='links'>
                            <div style={{display: "flex", marginBottom: "5px"}}><Facebook/><a style={{marginLeft:"20px"}} href={student.facebookProfile}>{student.facebookProfile}</a></div>
                            <div style={{display: "flex", marginBottom: "5px"}}><Twitter/><a style={{marginLeft:"20px"}}href={student.twitterProfile}>{student.twitterProfile}</a></div>
                            <div style={{display: "flex", marginBottom: "5px"}}><Instagram/><a style={{marginLeft:"20px"}}href={student.instagramProfile}>{student.instagramProfile}</a></div>
                        </div> }
                        {isEditing &&<div className='socialprofiles'>
                           <div style={{display: "flex", marginLeft:"-40px",marginBottom: "10px",marginTop:"10px"}}><Facebook/><input type='text' style={{marginRight:"-100px",marginLeft:"40px",width:"250px"}} value={student.facebookProfile} onChange={(e) => handleInputChange('facebookProfile',e.target.value)}></input></div>
                           <div style={{display: "flex",marginLeft:"-40px", marginBottom: "10px"}}><Twitter/><input type='text' style={{marginRight:"-100px",marginLeft:"40px",width:"250px"}}value={student.twitterProfile} onChange={(e) => handleInputChange('twitterProfile',e.target.value)}></input></div>
                           <div style={{display: "flex", marginLeft:"-40px",marginBottom: "10px"}}><Instagram/><input type='text'style={{marginRight:"-100px",marginLeft:"40px",width:"250px"}} value={student.instagramProfile} onChange={(e) => handleInputChange('instagramProfile',e.target.value)}></input></div>
                        </div>}
                    </div>
                    <div className="student-info-right-box">
                        {!isEditing ? (
                            <>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Birth Date:</strong> {setbirthday(student.birthday)}</p>
                                <p><strong>Education Level:</strong> {student.grade}</p>
                                <p><strong>School Name:</strong> {student.school}</p>
                                <p><strong>City:</strong> {student.city}</p>
                                <p><strong>State:</strong> {student.state}</p>
                                <p><strong>Zipcode:</strong> {student.zipCode}</p><br/>
                            </>
                        ) : (
                            <>
                                <div className="input-row">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" value={student.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="birthDate">Birth Date:</label>
                                    <input type="date" value={setbirthday(student.birthday)} onChange={(e) => handleInputChange('birthday', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="educationLevel">Education Level:</label>
                                    <input type="text" value={student.grade} onChange={(e) => handleInputChange('grade', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="schoolName">School Name:</label>
                                    <input type="text" value={student.school} onChange={(e) => handleInputChange('school', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" value={student.city} onChange={(e) => handleInputChange('city', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="state">State:</label>
                                    <input type="text" value={student.state} onChange={(e) => handleInputChange('state', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="zipcode">Zipcode:</label>
                                    <input type="text" value={student.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} />
                                </div><br/>
                            </>
                        )}
                        {!isEditing ? (
                            <button className='editprofile' onClick={handleEdit}>Edit Profile</button>
                        ) : (
                            <button className='editprofile' onClick={handleSave}>Save</button>
                        )}
                    </div>
                </div>
            </div>
        </div>) : (<></>) }
        </>
    );
}

export default StudentDetails;
