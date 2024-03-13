import React from 'react';
import '../CSS/tutorsearched.css'; 
import { useLocation, useNavigate } from 'react-router-dom';

const Tutor = () => {
    const location = useLocation();
    const tutor = location.state;
    const navigate = useNavigate();

    const handleviewsession = () => {
      navigate('/viewsession', {state:{tutor}});
    }

  return (
    <div className="container-tutor-profile">
      <div className="profile-header">
        <div className="profile-photo">
          <img src={tutor.profile_picture} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{tutor.fullName}</h1>
          <p>{tutor.email} </p>
          <p>{tutor.city}, {tutor.state}, {tutor.zipCode}</p>
        </div>
        <div>
        <button className='profile-button' onClick={handleviewsession}>View Sessions</button>
      </div>
      </div>
      <div className="profile-section">
        <p><b>Professional Summary :</b> {tutor.professionalSummary}</p>
      </div>

      <div className="profile-section">
        <p><b>Education Background :</b> {tutor.qualifications}</p>
        <p id='p1'>: {tutor.institutions}</p>
      </div>

      <div className="profile-section">
        <p><b>Subject Experience :</b> {tutor.subjects} </p>
        <p><b>Teaching Environment :</b> {tutor.learningmode}</p>
      </div>

      <div className="profile-section">
        <p><b>Teaching Methods :</b> {tutor.teachingMethods}</p>
      </div>

      <div className="profile-section">
        <p><b>Additional Skills and Interests :</b> {tutor.additionalSkillsAndInterests}</p>
      </div>

      <div className="profile-section">
        <p><b>Languages Spoken : </b>{tutor.languages}</p>
      </div>

      <div className="profile-section">
        <p><b>Social Media Link : </b><a href={tutor.facebookProfile}>{tutor.facebookProfile}</a></p>
        <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b><a href={tutor.twitterProfile}>{tutor.twitterProfile}</a></p>
        <p><b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b><a href={tutor.instagramProfile}>{tutor.instagramProfile}</a></p>
      </div>
     
    
     <div className="custom-paragraph">
     <h2>Tutor Bio</h2>
      <p>{tutor.introduction}</p>
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
    <label id='gra'><b>Grade*</b></label><br></br>
    <input type="text" id="grade" name="grade"></input>
    <div className='radio'>
    <label>Request Details</label> <br></br>
    <label>
    <input type="radio" id="btn1" name="teachingEnvironment" value="home" checked/>
    Home
    </label><br></br>
    <label>
    <input type="radio" id="btn2" name="teachingEnvironment" value="online"/>
    Online
    </label>
    </div>
    <div className='sublist'>
    <label><b>Subject for Tutoring*</b></label><br></br>
    <div className='subject'>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
    <input type="checkbox"  id="subject1" name="subjects" value="Math"></input>
    <label for="subject1">Math</label><br></br>
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