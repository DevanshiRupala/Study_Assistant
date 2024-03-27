import React, { useState } from 'react';
import '../CSS/student.css';
import Stuprofile from '../Pages/student_sidebar';
import { Twitter, GitHub, Facebook } from '@material-ui/icons';

const StudentDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [studentData, setStudentData] = useState({
        fullname:'John Doe',
        email: 'johndoe@gmail.com',
        birthDate: '2000-01-03',
        educationLevel: '12',
        schoolName: 'Springfield High School',
        address: {
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
        },
        links: {
            twitter: '@johndoe',
            facebook: 'facebook.com/johndoe',
            github: 'github.com/johndoe',
        },
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Implement save logic here
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        const updatedStudentData = { ...studentData };
        const fieldParts = field.split('.');

        if (fieldParts.length === 2) {
            updatedStudentData[fieldParts[0]][fieldParts[1]] = value;
        } else {
            updatedStudentData[field] = value;
        }

        setStudentData(updatedStudentData);
    };

    return (
        <div className='wrapper'>
            <Stuprofile/>
            <div className="student-profile-container">
                <div className="student-info-container">
                    <div className="student-info left-box">
                        <div className="photo-container">
                            <div className="placeholder">Photo</div>
                        </div>
                        <div className='studentfullname'>
                            {isEditing ? (
                                <div className="input-row">
                                    <label htmlFor="fullname">Full Name:</label>
                                    <input type="text" value={studentData.fullname} onChange={(e) => handleInputChange('fullname', e.target.value)} />
                                </div>
                            ) : (
                                <h2>{studentData.fullname}</h2>
                            )}
                        </div>
                        <div className='links'>
                            {Object.entries(studentData.links).map(([key, value]) => (
                                <div key={key}>
                                    {isEditing ? (
                                        <div className="input-row">
                                            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                            <input type="text" value={value} onChange={(e) => handleInputChange(`links.${key}`, e.target.value)} />
                                        </div>
                                    ) : (
                                        <a href={`https://${key}.com/${value}`}>
                                            {key === 'twitter' ? <Twitter /> : key === 'facebook' ? <Facebook /> : <GitHub />}
                                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="student-info right-box">
                        {!isEditing ? (
                            <>
                                <p><strong>Email:</strong> {studentData.email}</p>
                                <p><strong>Birth Date:</strong> {studentData.birthDate}</p>
                                <p><strong>Education Level:</strong> {studentData.educationLevel}</p>
                                <p><strong>School Name:</strong> {studentData.schoolName}</p>
                                <p><strong>City:</strong> {studentData.address.city}</p>
                                <p><strong>State:</strong> {studentData.address.state}</p>
                                <p><strong>Zipcode:</strong> {studentData.address.zipcode}</p>
                            </>
                        ) : (
                            <>
                                <div className="input-row">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" value={studentData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="birthDate">Birth Date:</label>
                                    <input type="date" value={studentData.birthDate} onChange={(e) => handleInputChange('birthDate', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="educationLevel">Education Level:</label>
                                    <input type="text" value={studentData.educationLevel} onChange={(e) => handleInputChange('educationLevel', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="schoolName">School Name:</label>
                                    <input type="text" value={studentData.schoolName} onChange={(e) => handleInputChange('schoolName', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="city">City:</label>
                                    <input type="text" value={studentData.address.city} onChange={(e) => handleInputChange('address.city', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="state">State:</label>
                                    <input type="text" value={studentData.address.state} onChange={(e) => handleInputChange('address.state', e.target.value)} />
                                </div>
                                <div className="input-row">
                                    <label htmlFor="zipcode">Zipcode:</label>
                                    <input type="text" value={studentData.address.zipcode} onChange={(e) => handleInputChange('address.zipcode', e.target.value)} />
                                </div>
                            </>
                        )}
                        {!isEditing ? (
                            <button onClick={handleEdit}>Edit Profile</button>
                        ) : (
                            <button onClick={handleSave}>Save</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDetails;
