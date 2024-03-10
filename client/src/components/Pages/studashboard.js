import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSS/studashboard.css';
import axios from 'axios';
import Sidebar from './student_sidebar';
import DataBox from './databox';

const SearchTutor = () => {
  const [searchParams, setSearchParams] = useState({
    gender: '',
    city: '',
    state: '',
    subject: ''
  });
  const location = useLocation();
  const { student } = location.state;

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Search Parameters:', searchParams);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Dummy search results
  // const dummyData = [
  //   {
  //     id: 1,
  //     title: "Math Tutor",
  //     description: "Experienced math tutor available for all levels.",
  //     image: "math_tutor_image_url"
  //   },
  //   {
  //     id: 2,
  //     title: "Science Tutor",
  //     description: "Passionate science tutor specializing in biology and chemistry.",
  //     image: "science_tutor_image_url"
  //   },
  //   {
  //     id: 3,
  //     title: "English Tutor",
  //     description: "Certified English teacher offering personalized tutoring sessions.",
  //     image: "D:\SDP\client\src\images\logo (2).png"
  //   },
  //   {
  //     id: 4,
  //     title: "English Tutor",
  //     description: "Certified English teacher offering personalized tutoring sessions.",
  //     image: "D:\SDP\client\src\images\logo (2).png"
  //   }
  // ];


  return (
    <div className="sidebar-search-container">
      <Sidebar student={student}/>
      <div className='part-container'>
      <div className="search-bar">
        <h3>Find a Tutor</h3>
        <hr className="line"/>
        <div className="search-inputs">
          <input
            type="text"
            value={searchParams.city}
            onChange={handleChange}
            placeholder="Enter City"
            name="city"
          />
          <input
            type="text"
            value={searchParams.state}
            onChange={handleChange}
            placeholder="Enter State"
            name="state"
          /><br/>
          <input
            type="text"
            value={searchParams.subject}
            onChange={handleChange}
            placeholder="Enter Subject"
            name="subject"
          />
          <select
            value={searchParams.gender}
            onChange={handleChange}
            name="gender"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select><br/>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="dummy-data-container">
        {/* {dummyData.map(data => ( */}
          <DataBox
            // key={data.id}
            // photo={data.photo}
            // username={data.username}
            // description={data.description}
          />
        {/*  */}
      </div>
      </div>
    </div>
    );
}

export default SearchTutor;
