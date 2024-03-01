import React, { useState } from 'react';
import './studashboard.css';
import axios from 'axios';

const Search = () => {
    const [result,setresult] = useState([]);

    const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        gender: e.target.dropdown.value,
        city: e.target.city.value,
        subject: e.target.subject.value,
        state: e.target.state.value
    };  

    axios.post("http://localhost:8000/searchuser",formData)
      .then((res) => {setresult(res.data); })
      .catch((err) => console.log(err))
    }

  return (
    <div  className='search-page'>
      <h2>Search Page</h2>
      <form className='search' onSubmit={handleSubmit}>
        <div>
          <label>Gender:</label>
          <select name="dropdown">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city"/>
        </div>
        <div>
          <label>State:</label>
          <input type="text" name="state"/>
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" name="subject"/>
        </div>
        <button type="submit">Search</button>
      </form>
      {Array.isArray(result) ? (<ul>
       {result.map((item) => (
           <li key={item._id[0]}>{item._id[0]} - {item.city[0]} - {item.subject[0]} - {item.gender[0]}</li>
         ))}
       </ul>) : (<></>)}
    </div>
  );
};

export default Search;



