

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../CSS/contact.css';
import bg from '../../images/img_contact.jpeg';
import { blue } from '@mui/material/colors';
// import Stuprofile from './sidenav';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_a8g2zac', 'template_w2bbisk', form.current, {
        publicKey: 'p87uqnWwKKSNYaJxS',
      })
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message. Please try again.');
        },
      );
  };

  return (
    // <form ref={form} onSubmit={sendEmail} className="form">
    //   <label className="label">Name</label>
    //   <input type="text" name="user_name" className="input" />
    //   <label className="label">Email</label>
    //   <input type="email" name="user_email" className="input" />
    //   <label className="label">Message</label>
    //   <textarea name="message" className="textarea" />
    //   <input type="submit" value="Send" className="button" />
    // </form>
   
    <div className="contact-form" style={{background : blue}}>
      
      <h1>Contact Us</h1>
      <div className="container">
        <div className="main">
        {/* <Stuprofile/> */}
          <div className="content">
          
            <h2>Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
              {/* <input type="text" name="name" placeholder="Enter Your Name">

                <input type="email" name="name" placeholder="Enter Your Email"> */}
              {/* <textarea name="message" placeholder="Your Message"></textarea> */}
              <label className="label">Name</label>
              <input type="text" name="user_name" className="input" />
              <label className="label">Email</label>
              <input type="email" name="user_email" className="input" />
              <label className="label">Message</label>
              <textarea name="message" className="textarea" />
              <button type="submit" className="btn">Send</button>
            </form>
          </div>
          <div className="form-img">
            <img src={bg} alt='' style={{width: 800}}></img>

          </div>
          
        </div>
        
      </div>
    </div>
    
  );
};
