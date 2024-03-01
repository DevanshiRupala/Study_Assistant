import React from 'react';
import './index.css'; 
import Image from '../images/yellow.png'
import Navbar from '../components/navbar'
import Bg from '../images/index.webp'
import Blue from '../images/blue.png'

const Index = () => {

    return ( 
        <>
        <div className='yellow'>
          <img src={Image}></img>
        </div>
        <Navbar/>
        <div className="page-content">
        <h6 className='p1'>Unlock Your Potential: </h6><h6 className='p2'>Find the Perfect Tutor for Your Success Journey!</h6>
        <button className='btn_index'><b>Know More</b></button>
        </div>
        <div className="image-container">
        <img src={Bg} />
      </div>
        <div className='blue'>
        <img src={Blue}></img>
        </div>
        
        </>
    );
}

export default Index;