// AboutUs.js

import React from 'react';
import '../CSS/knowmore.css'
const KnowMore = () => {
  return (
    <div className='about-us-container'>
      <h1>About Us</h1>
      <p>
        Welcome to our Study Assistant app, where students connect with experienced tutors for personalized learning.
      </p>

      <h2>How Tutors Help Students</h2>
      <p>
        Our tutors are dedicated to helping students succeed. They provide one-on-one guidance, answer questions, and assist in understanding challenging topics.
      </p>

      <h2>Meet Our Team</h2>

      {/* Student Photos and Bios */}
      <div className="scrollable-section student-section">
        <div className="student-card">
          <img src="path/to/student1.jpg" alt="Student 1" />
          <p>Student Name 1</p>
          <p>Course: Subject 1</p>
        </div>

        <div className="student-card">
          <img src="path/to/student2.jpg" alt="Student 2" />
          <p>Student Name 2</p>
          <p>Course: Subject 2</p>
        </div>
        {/* Add more student cards as needed */}
      </div>

      {/* Previous Tutor Profiles */}
      <h2>Previous Tutors</h2>
      <div className="scrollable-section tutor-section">
        <div className="tutor-card">
          <img src="path/to/tutor1.jpg" alt="Tutor 1" />
          <p>Tutor Name 1</p>
          <p>Experience: X years</p>
        </div>

        <div className="tutor-card">
          <img src="path/to/tutor2.jpg" alt="Tutor 2" />
          <p>Tutor Name 2</p>
          <p>Experience: Y years</p>
        </div>
        {/* Add more tutor cards as needed */}
      </div>
    </div>
  );
};

export default KnowMore;
