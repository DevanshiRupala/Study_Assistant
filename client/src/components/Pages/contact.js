// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';
// // import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
// // import { Link } from 'react-router-dom'
// // import contactus from '../../images/contact_us.jpeg'
// import '../CSS/contact.css'
// export const ContactUs = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm('service_a8g2zac', 'template_w2bbisk', form.current, {
//         publicKey: 'p87uqnWwKKSNYaJxS',
//       })
//       .then(
//         (result) => {
//           console.log('SUCCESS!', result.text);
//         },
//         (error) => {
//           console.log('FAILED...', error.text);
//         },
//       );
//   };

//   return (
//     <form ref={form} onSubmit={sendEmail}>
//       <label>Name</label>
//       <input type="text" name="user_name" />
//       <label>Email</label>
//       <input type="email" name="user_email" />
//       <label>Message</label>
//       <textarea name="message" />
//       <input type="submit" value="Send" />
//     </form>

//   );
// };

// const styles = {
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     maxWidth: '300px',
//     margin: 'auto',
//   },
//   label: {
//     margin: '5px 0',
//     fontWeight: 'bold',
//   },
//   input: {
//     padding: '8px',
//     margin: '5px 0',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   },
//   textarea: {
//     padding: '8px',
//     margin: '5px 0',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     resize: 'vertical',
//   },
//   button: {
//     padding: '10px',
//     background: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
// };

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../CSS/contact.css';
import bg from '../../images/bg1.png';
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
        },
        (error) => {
          console.log('FAILED...', error.text);
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
            <img src={bg} alt=''></img>

          </div>
          
        </div>
        
      </div>
    </div>
    
  );
};
