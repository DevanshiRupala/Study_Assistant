import React from 'react';
import './tutor_search.css'; // Import your custom CSS file

const Tutor = () => {
  // Placeholder data
  const tutorData = {
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    streetAddress: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    professionalSummary: "Experienced tutor specializing in Math and Science.",
    degreesAndCertifications: "B.S. in Mathematics, M.S. in Education",
    educationalInstitutions: "University of Anytown, Anytown College",
    subjectExperience: "5 years",
    teachingEnvironment: "Online and in-person",
    teachingMethods: "Interactive lessons, problem-solving approach",
    hourlyRates: "$50",
    paymentMethods: "Cash, PayPal, Venmo",
    additionalSkillsAndInterests: "Programming, Music, Sports",
    languagesSpoken: "English, Spanish",
    socialMediaLink: "https://www.linkedin.com/in/johndoe",
    // Placeholder URL for profile photo
    profilePhoto: "https://via.placeholder.com/150" 
  };

  return (
    <div className="container tutor-profile">
      <div className="profile-header">
        {/* Profile photo */}
        <div className="profile-photo">
          <img src={tutorData.profilePhoto} alt="Profile" />
        </div>
        {/* Profile information */}
        <div className="profile-info">
          <h1>{tutorData.fullName}</h1>
          <p>{tutorData.email} | {tutorData.phoneNumber}</p>
          <p>{tutorData.streetAddress}, {tutorData.city}, {tutorData.state}, {tutorData.zipCode}</p>
        </div>
      </div>
      
      {/* Additional sections */}
      <div className="profile-section">
        <p><b>Professional Summary :</b> {tutorData.professionalSummary}</p>
      </div>

      <div className="profile-section">
        <p><b>Education Background :</b> {tutorData.degreesAndCertifications}</p>
        <p id='p1'>: {tutorData.educationalInstitutions}</p>
      </div>

      <div className="profile-section">
        <p><b>Subject Experience :</b> {tutorData.subjectExperience} </p>
        <p><b>Teaching Environment :</b> {tutorData.teachingEnvironment}</p>
      </div>

      <div className="profile-section">
        <p><b>Teaching Methods :</b> {tutorData.teachingMethods}</p>
      </div>

      <div className="profile-section">
        <p><b>Additional Skills and Interests :</b> {tutorData.additionalSkillsAndInterests}</p>
      </div>

      <div className="profile-section">
        <p><b>Languages Spoken : </b>{tutorData.languagesSpoken}</p>
      </div>

      <div className="profile-section">
        <p><b>Social Media Link : </b>{tutorData.socialMediaLink}</p>
      </div>
     
    
     <div className="custom-paragraph">
     <h2>Tutor Bio</h2>
      <p>Alexandra, an expert tutor, earned her Bachelor's degree in Theatre at Fairleigh Dickinson University, and her interest in acting helps bring a lot of energy and creativity into her instruction.
         She also completed a double minor in Literature and British Studies, and is well versed in many kinds of literature from America, England, and around the world.
          She received her Masters in Education and is certified to teach secondary English in New Jersey.
           Alexandra has extensive experience tutoring SAT and ACT English, Reading, and Essay sections. She has also tutored students in the reading section of the ISEE, and helped many students brainstorm and 
           create the perfect college admissions essay. All of her students have gotten into the college they wanted! She has extensive knowledge of grammar 
           and essay structure and experience in helping students one on one with essay writing. Alexandra decided to go into tutoring because she loved the idea of getting students comfortable in a personal
            learning environment so that they could gain skills that would help them in later life.</p>
      </div>

      <div class="custom-paragraph1">
  <h2>Availability</h2>
  <div class="panels-container">
    <div class="list-panel">
      <li className='l1'><b>Monday</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01:30 AM - 04:30 AM</li>
      <li className='l1'><b>Monday</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01:30 AM - 04:30 AM</li>
      <li className='l1'><b>Monday</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01:30 AM - 04:30 AM</li>
      <li className='l1'><b>Monday</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01:30 AM - 04:30 AM</li>
    </div>
    <div class="map-panel">
      <p>map is here</p>
    </div>
  </div>
</div>

<div className="custom-paragraph2">
     <h2>Tutor Bio</h2>
     <label id='gra'><b>Grade*</b></label>
     <input type="text" id="grade" name="grade"></input>
     <div className='radio'>
     <label>Request Details</label> 
     <label>
     <input type="radio" id="btn1" name="teachingEnvironment" value="home" checked/>
     Home
     </label>
     <label>
     <input type="radio" id="btn2" name="teachingEnvironment" value="online"/>
     Online
    </label>
    </div>
    <div className='sublist'>
    <label><b>Subject for Tutoring*</b></label>
    <div className='subject'>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label>
    
    </div>
    </div>
    <div className='RequestDetails'>
    <label>Request Details</label><br></br>
    <textarea id="myTextarea" name="myTextarea" rows="4" cols="50">
    Enter your text here...
    </textarea> 
    </div>
    <div className='personal'>
        <h3>Personal & Contact Information</h3><br></br>
        <div className='first'>
        <label id='firstname'><b>FirstName*</b></label><br></br>
        <input type="text" id="firstname1" name="firstname"></input></div>
        <div className='last'>
        <label id='lastname'><b>LastName*</b></label><br></br>
        <input type="text" id="lastname1" name="lastname"></input></div>
        <div className='stu'>
        <label id='stuname'><b>StudentName*</b></label><br></br>
        <input type="text" id="stuname1" name="stuname"></input></div>
        <div className='emai'>
        <label id='email'><b>Email*</b></label><br></br>
        <input type="text" id="email1" name="email"></input></div>
        <div className='phone'>
        <label id='phonno'><b>Phone Number*</b></label><br></br>
        <input type="text" id="phonno1" name="phonno"></input></div>
        <div className='location'>
        <label id='loc'><b>Location*</b></label><br></br>
        <input type="text" id="loc1" name="location"></input></div>
        <div className='line'></div>
        <div className='button'>
            <button id='but1'>Reset</button>
            <button id='but2'>Submit</button>
        </div>
    </div>
    
    
    </div>
</div>    
  );
};

export default Tutor;