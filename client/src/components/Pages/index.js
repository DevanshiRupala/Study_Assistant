import React from 'react';
import '../CSS/index.css'; 
import Image from '../../images/yellow.png'
import Navbar from './navbar'
import Bg from '../../images/index.webp'
import Blue from '../../images/blue.png'
import { useNavigate } from 'react-router-dom';
const Index = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Redirect to the home page
    navigate('/knowmore');
  };
    return ( 
        <>
        <div className='yellow'>
          <img src={Image} alt=''></img>
        </div>
        <Navbar/>
        <div className="page-content">
        <h6 className='p1'>Unlock Your Potential: </h6><h6 className='p2'>Find the Perfect Tutor for Your Success Journey!</h6>
        <button className='btn_index' onClick={handleButtonClick}><b>Know More</b></button>
        </div>
        <div className="image-container">
        <img src={Bg} alt='' />
      </div>
        <div className='blue'>
        <img src={Blue} alt=''></img>
        </div>
        
        </>
    );
}

export default Index;