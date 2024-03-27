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
  const [tutors,settutors] = useState();
  const location = useLocation();
  const [student,setstudent] = useState();

  const handleSearch = async () => {
    const res = await axios.post("http://localhost:8000/search",searchParams);
    console.log(res.data)
    settutors(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const student_id = new URLSearchParams(location.search).get("state");
            const response = await axios.post("http://localhost:8000/getstudent", { student_id });
            setstudent(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, []);


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
      {tutors && <div className="dummy-data-container">
        {tutors.map(data => ( 
          <DataBox tutor = {data}/>
        ))}
        </div>
      }
      </div>
    </div>
  );
}

export default SearchTutor;
