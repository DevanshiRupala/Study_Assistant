/* tutor_profile.js */
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../CSS/tutor_profile.css';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Tutor = () => {
  const [subjectFields, setSubjectFields] = useState([{ value: '' }]);
  const [languageFields, setLanguageFields] = useState([{ value: '' }]);
  const fileInputRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const location = useLocation();
  const { s_username, s_email, s_pass, isStudent } = location.state;
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

  const handleSubjectChange = (index, event) => {
    const values = [...subjectFields];
    values[index].value = event.target.value;
    setSubjectFields(values);
  };

  const handleLanguageChange = (index, event) => {
    const values = [...languageFields];
    values[index].value = event.target.value;
    setLanguageFields(values);
  };

  const handleAddSubjectField = () => {
    setSubjectFields([...subjectFields, { value: '' }]);
  };

  const handleAddLanguageField = () => {
    setLanguageFields([...languageFields, { value: '' }]);
  };

  const handleRemoveSubjectField = (index) => {
    const values = [...subjectFields];
    values.splice(index, 1);
    setSubjectFields(values);
  };

  const handleRemoveLanguageField = (index) => {
    const values = [...languageFields];
    values.splice(index, 1);
    setLanguageFields(values);
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

    const subjectsArray = subjectFields.map(field => field.value);
    const languagesArray = languageFields.map(field => field.value);
    formData1.append('subjects', JSON.stringify(subjectsArray));
    formData1.append('languages', JSON.stringify(languagesArray));
    formData1.append('s_username', s_username);
    formData1.append('s_email', s_email);
    formData1.append('s_pass', s_pass);
    formData1.append('isStudent', isStudent);
    const formdata = Object.fromEntries(formData1.entries());
    console.log(formdata);

    try {
      const response = await axios.post("http://localhost:8000/submitTutorProfile", formData, { params: formdata });
      navigate("/tutor_dashboard");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='tutorp_TutorBox tutorp_light-purple-background'>
      <div className='tutorp_Tutor'>
        <form className="tutorp_tutor-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='tutorp_header'>Tutor Profile</div>
          <section>
            <h2 className="tutorp_h2">Personal Information</h2>
            <input
              type="file"
              name="photo"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange} />
            <div className='tutorp_circle' onClick={handleAddPhotoClick}>
              {selectedPhoto ? (
                <img src={selectedPhoto} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                <span>Add Photo</span>
              )}
            </div>
            <div className='tutorp_form-row'>
              <label htmlFor="fullName">Full Name<span>*</span>:</label>
              <div className="tutorp_name-container">
                <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
              </div>
            </div>
            <div className='tutorp_form-row'>
              <label htmlFor="address">Address<span>*</span>:</label>
              <div className="tutorp_city-state-container">
                <input type="text" id="city" name="city" placeholder='City' required />
                <input type="text" id="state" name="state" placeholder='State' required />
                <input type="text" id="zipCode" name="zipCode" placeholder='Zip Code' required />
              </div>
            </div>
            <div className='tutorp_form-row'>
              <div className='tutorp_label_email'>
                <label htmlFor="email">Email:</label>
              </div>
              <div className='tutorp_email1'>
                <input type="email" id="email" name="email" placeholder='Email' required />
              </div>
            </div>
            <div className='tutorp_form-row'>
              <label>Gender<span>*</span>:</label>
              <div className="tutorp_gender">
                <label><input id='female' type="radio" name="gender" value="Female" required />Female</label>
                <label><input id='male' type="radio" name="gender" value="Male" required />Male</label>
              </div>
            </div>
          </section>

          <section>
            <h2 className="tutorp_h2">Professional Summary</h2>
            <div className='tutorp_form-row'>
              <label htmlFor="introduction">Introduction:</label>
              <textarea id="introduction" name="introduction" placeholder='Introduction' required />
            </div>
          </section>

          <section>
            <h2 className="tutorp_h2">Educational Background</h2>
            <div className='tutorp_form-row'>
              <label htmlFor="degreesCertifications">Degrees and Certifications:</label>
              <input type="text" id="degreesCertifications" name="qualifications" placeholder='Degrees and Certifications' required />
            </div>
            <div className='tutorp_form-row'>
              <label htmlFor="educationalInstitutions">Educational Institutions:</label>
              <input type="text" id="educationalInstitutions" name="institutions" placeholder='Educational Institutions' required />
            </div>
          </section>

          <section>
            <h2 className="tutorp_h2">Subject Expertise</h2>
            <div className='tutorp_form-row'>
              {subjectFields.map((field, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor={`subjectOffered${index}`}>Subject {index + 1}:</label>
                  <input
                    type="text"
                    id={`subjectOffered${index}`}
                    name={`subjectOffered[${index}]`}
                    value={field.value}
                    onChange={(e) => handleSubjectChange(index, e)}
                    placeholder='Subject'
                    required
                  />
                  {index === 0 && (
                    <button className='tutorp_btn3' style={{ marginLeft: '10px' }} onClick={handleAddSubjectField}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  )}
                  {index > 0 && (
                    <button className='tutorp_btn3' style={{ marginLeft: '10px' }} onClick={() => handleRemoveSubjectField(index)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className='tutorp_form-row'>
              <label htmlFor="gradeLevels">Grade Levels:</label>
              <input type="text" id="gradeLevels" name="gradeLevels" placeholder='Grade Levels' required />
            </div>
          </section>

          <section>
            <h2 className="tutorp_h2">Rates and Working mode Information</h2>
            <div className='tutorp_form-row'>
              <label htmlFor="hourlyRates">Hourly Rates:</label>
              <input type="text" id="hourlyRates" name="hourlyRates" placeholder='Rates' required />
            </div>
            <br />
            <div className='tutorp_form-row'>
              <label>Mode<span>*</span>:</label>
              <div className='tutorp_mode'>
                <label><input type="radio" name="mode" value="Online" required />Online</label>
                <label><input type="radio" name="mode" value="Offline" required />Offline</label>
                <label><input type="radio" name="mode" value="Both" required />Both</label>
              </div>
            </div>
          </section>

          <section>
            <h2 className="tutorp_h2">Language Spoken</h2>
            <div className='tutorp_form-row'>
            {languageFields.map((field, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor={`LanguageOffered${index}`}>Language {index + 1}:</label>
                <input
                  type="text"
                  id={`LanguageOffered${index}`}
                  name={`LanguageOffered[${index}]`}
                  value={field.value}
                  onChange={(e) => handleLanguageChange(index, e)}
                  placeholder='Language'
                  required
                />
                {index === 0 && (
                  <button className='tutorp_btn3'  onClick={() => handleAddLanguageField()}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                  </button>
                )}
                {index > 0 && (
                  <button className='tutorp_btn3'  onClick={() => handleRemoveLanguageField(index)}>
                    <FontAwesomeIcon icon={faMinus} style={{ marginRight: '5px' }} />
                  </button>
                )}
              </div>
            ))}
          </div>
          </section>

          <section>
          <h2 className="tutorp_h2">Social Media Links</h2>
          <div className='tutorp_form-row'>
            <div className="tutorp_social-icons">
              <div className="tutorp_social-icon">
                <FontAwesomeIcon icon={faFacebook} />
                <input type="text" id="facebookProfile" name="facebookProfile" placeholder="Facebook Profile" />
              </div>
              <div className="tutorp_social-icon">
                <FontAwesomeIcon icon={faTwitter} />
                <input type="text" id="twitterProfile" name="twitterProfile" placeholder="Twitter Profile" />
              </div>
              <div className="tutorp_social-icon">
                <FontAwesomeIcon icon={faInstagram} />
                <input type="text" id="instagramProfile" name="instagramProfile" placeholder="Instagram Profile" />
              </div>
            </div>
          </div>
        </section>

          <button className="p_btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Tutor;