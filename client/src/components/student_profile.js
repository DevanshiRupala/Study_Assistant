import React, { useState, useRef } from 'react';
import './student_profile.css';
import axios from 'axios';

const StudentRegistrationForm = () => {
    const [subjectFields, setSubjectFields] = useState([{ value: '' }]);
    const [languageFields, setLanguageFields] = useState([{ value: '' }]);
    const fileInputRef = useRef(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

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
    
    const formdata =  Object.fromEntries(formData1.entries());
    console.log(formdata)
    
    try {
      const response = await axios.post("http://localhost:8000/submitStudentProfile", formData, {params : formdata});
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='StudentBox'>
    <div className='Student'>
      <form className="student-registration-form " onSubmit={handleSubmit}>
        <div className='placeholder1'>Student Profile</div> 
        <section>
        <input
        type="file"
        name="photo"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}/>
        <div className='circle' onClick={handleAddPhotoClick}>
        {selectedPhoto ? (
          <img src={selectedPhoto} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '50%'}} />
        ) : (
          <span>Add Photo</span>
        )}
      </div>
         <label htmlFor="fullName">Full Name<span>*</span></label>
          <div className="name-container">
            <input type="text" id="firstName" name="firstName" placeholder="First Name" required/>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required/>
          </div>
        <label >Email:</label>
        <div className='email'>
        <input type="email" id="email" name="email" placeholder='Email'required /></div>
        <label htmlFor="birthDate">Birth Date:</label>
        <div className="name-container">
            <input type="Date" id="firstName" name="birthday" placeholder="Day" required/>
        </div>
        <label htmlFor="educationLevel">Education Level:</label>
        <input type="text" name="grade" placeholder='Grade' required/>
        <label htmlFor="educationLevel">School Name:</label>
        <input type="text" name="school" placeholder='School Name' required/>
      </section>
      <section>
        <label>Address<span>*</span>:</label>
          <div className="city-state-container">
            <div>
              <input type="text" id="city" name="city" placeholder='City' required/>
            </div>
            <div>
              <input type="text" id="state" name="state" placeholder='State' required/>     
            </div>
          </div>

          <input type="text" id="zipCode" name="zipCode"  placeholder='Zip Code'required/>
          </section>

    <button type="submit">Submit</button>

    </form>
    </div>
    </div>
  );
}

export default StudentRegistrationForm;