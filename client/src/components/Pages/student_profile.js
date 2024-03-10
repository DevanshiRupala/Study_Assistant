import React, { useState, useRef } from 'react';
import '../CSS/student_profile.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentRegistrationForm = () => {
    const fileInputRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const location = useLocation();
    const {s_username, s_email, s_pass, isStudent} = location.state;
    const navigate = useNavigate();

    const handleAddPhotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            setSelectedPhoto(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('photo', selectedPhoto);
        const formData1 = new FormData();
        const form = event.target;
        const formInputs = form.elements;
        for (let i = 0; i < formInputs.length; i++) {
            const input = formInputs[i];
            if (input.type !== 'file') {
                formData1.append(input.name, input.value);
            }
        }
        
        formData1.append('s_username',s_username);
        formData1.append('s_email',s_email);
        formData1.append('s_pass',s_pass);
        formData1.append('isStudent',isStudent);
        formData1.append('firstName',fname);
        formData1.append('lastName',lname);
        const formdata =  Object.fromEntries(formData1.entries());
        console.log(formdata)
        
        try {
            const response = await axios.post("http://localhost:8000/submitStudentProfile", formData, {params : formdata});
            const student = response.data;
            navigate('/studashboard', {state : {student}});
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='s_body'>
        <div className='student_profile-container'>
            <div className='student_profile-form-row'>
                <div className='student_profile-circle' onClick={handleAddPhotoClick}>
                    {selectedPhoto ? (
                        <img src={selectedPhoto} alt="Selected" />
                    ) : (
                        <span style={{marginTop : "60px"}}>Add Photo</span> 
                    )}
                </div>
                <div className='student_profile-form-row'>
                <div className='student_profile-form-column'>
                    <div className='student_profile-profile-title'>
                        <h2>Student Profile</h2>
                    </div>
                    <label htmlFor="fullName">Full Name<span>*</span>:</label>
                    <div className="student_profile-name-row">
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" onChange={(e)=>setfname(e.target.value)} required/>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" onChange={(e)=>setlname(e.target.value)} required/>
                    </div>
                </div>
            </div>

            </div>
            <input
                type="file"
                name="photo"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />
            <form className="student_profile-student-registration-form" onSubmit={handleSubmit}>
                <div className='student_profile-form-row'>
                    <div className='student_profile-form-column'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" placeholder='Email' required/>
                    </div>
                </div>
                <div className='student_profile-form-row'>
                    <div className='student_profile-form-column'>
                        <label htmlFor="educationLevel">Education Level:</label>
                        <input type="text" name="grade" placeholder='Grade' required/>
                    </div>
                    <div className='student_profile-form-column'>
                        <label htmlFor="birthDate">Birth Date:</label>
                        <input type="date" name="birthday" required/>
                    </div>
                </div>
                <div className='student_profile-form-row'>
                    <div className='student_profile-form-column'>
                        <label htmlFor="schoolName">School Name:</label>
                        <input type="text" name="school" placeholder='School Name' required/>
                    </div>
                </div>
                <div className='student_profile-form-row'>
                <div className='student_profile-form-column'>
                        <label>Address<span>*</span>:</label>
                        <div className="student_profile-address-row">
                            <input type="text" id="city" name="city" placeholder='City' required/>
                            <input type="text" id="state" name="state" placeholder='State' required/>
                            <input type="text" id="zipCode" name="zipCode" placeholder='Zip Code' required/>
                        </div>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
    );
}

export default StudentRegistrationForm;