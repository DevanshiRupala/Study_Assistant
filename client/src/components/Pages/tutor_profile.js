import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './tutor_profile.css';

const Tutor = () => {

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
    const formdata =  Object.fromEntries(formData1.entries());
    console.log(formdata)
    
    try {
      const response = await axios.post("http://localhost:8000/submitTutorProfile", formData, {params : formdata});
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <div className='TutorBox'>
     
    <div className='Tutor'>
        <form className="tutor-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='header'>Tutor Profile</div> 
        <section>
        <input
        type="file"
        name="photo"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}/>
        <div className='circle' onClick={handleAddPhotoClick}>
        {selectedPhoto ? (
          <img src={selectedPhoto} alt="Selected" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          <span>Add Photo</span>
        )}
      </div>

            <h2>Personal Information</h2>
            <label htmlFor="fullName">Full Name<span>*</span>:</label>
          <div className="name-container">
            <input type="text" id="firstName" name="firstName" placeholder="First Name" required/>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required/>
          </div>
          <label htmlFor="address">Address<span>*</span>:</label>

          <div className="city-state-container">
            <div>
              <input type="text" id="city" name="city" placeholder='City' required/>
            </div>
            <div>
              <input type="text" id="state" name="state" placeholder='State' required/>     
            </div>
          </div>

          <input type="text" id="zipCode" name="zipCode"  placeholder='Zip Code'required/>

          <label>Gender<span>*</span>:</label>

          <div className="gender">
              <label><input type="radio"  name="gender" value="Female" required />Female</label>
              <label><input type="radio"  name="gender" value="Male" required/>Male</label>
          </div><br/>

          <div className="contact-row">
            <div className='label_email'>
              <label htmlFor="email">Email:</label></div>
              <input type="email" id="email" name="email" placeholder='Email' required />
          </div> 
        </section>
       
    <section>
      <h2>Professional Summary</h2>
      <label for="introduction">Introduction:</label>
      <textarea id="introduction" name="introduction" required/>
    </section>
    
    <section>
      <h2>Educational Background</h2>
      <label for="degreesCertifications">Degrees and Certifications:</label>
      <input type="text" id="degreesCertifications" name="qualifications" required/>

      <label for="educationalInstitutions">Educational Institutions:</label>
      <input type="text" id="educationalInstitutions" name="institutions" required/>
    </section>

   
    <section>
      <h2>Subject Expertise</h2>
      {subjectFields.map((field, index) => (
                <div key={index}>
                  <label htmlFor={`subjectOffered${index}`}>Subject {index + 1}:</label>
                  <input
                    type="text"
                    id={`subjectOffered${index}`}
                    name={`subjectOffered[${index}]`}
                    value={field.value}
                    onChange={(e) => handleSubjectChange(index, e)}
                    required
                  />

          {index > 0 && (
            <button className='btn3' onClick={() => handleRemoveSubjectField(index)}>
            <FontAwesomeIcon icon={faMinus} />
            </button>
             )}
        </div>
      ))}
      <div>
      <button className='btn3'>  <FontAwesomeIcon icon={faPlus} onClick={handleAddSubjectField} /></button>
      </div>
      <label For="gradeLevels">Grade Levels:</label>
      <input type="text" id="gradeLevels" name="gradeLevels" required />
    </section>

    <section> 
      <h2>Rates and Payment Information</h2>
      <label for="hourlyRates">Hourly Rates:</label>
      <input type="text" id="hourlyRates" name="hourlyRates" required/>
    </section>

      <section>
      <h2>Language Spoken</h2>
      {languageFields.map((field, index) => (
                <div key={index}>
                  <label htmlFor={`LanguageOffered${index}`}>Language {index + 1}:</label>
                  <input
                    type="text"
                    id={`LanguageOffered${index}`}
                    name={`LanguageOffered[${index}]`}
                    value={field.value}
                    onChange={(e) => handleLanguageChange(index, e)}
                    required
                  />

          {index > 0 && (
                              <button className='btn3' onClick={() => handleRemoveLanguageField(index)}>
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                            )}
        </div>
      ))}
      <div>
      <button className='btn3'>  <FontAwesomeIcon icon={faPlus} onClick={handleAddLanguageField} /></button>
      </div>
    </section>
    

    <section>
      <h2>Social Media Links</h2>
      <label for="socialProfiles">Social Profiles:</label>
      <textarea id="socialProfiles" name="socialProfiles" required/>
    </section>

    <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
}

export default Tutor;