import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './tutor_sidebar';

const FileUploadForm = () => {
  const location = useLocation();
  const [file, setFile] = useState(null);
  const tutor = location.state;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('file', file);
    formData.append('tutor_id',tutor.tutor_id);

    try {
      const response = await axios.post('http://localhost:8000/uploadfile', {params : {formData}}, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        console.log('File uploaded successfully');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onpay = async () => {
    const res = await axios.post("http://localhost:8000/payment");
    console.log(res.data);
    const order = res.data;
    const options = {
      key: "rzp_test_hUvLud5nAc9kpa", 
      amount: order.amount, 
      currency: "INR",
      name: "Devanshi Rupala", 
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, 
      callback_url: "https://localhost:3000/",
      prefill: { 
          "name": "Gaurav Kumar", 
          "email": "gaurav.kumar@example.com", 
          "contact": "9000090000"  
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#528FF0"
      }
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar tutor={tutor}/>
      <h2>Upload a PDF File</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <button onClick={onpay}>Pay now</button>
    </div>
  );
};

export default FileUploadForm;