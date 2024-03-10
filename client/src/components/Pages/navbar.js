import React, { useState } from 'react';
import '../CSS/navbar.css'; 
import logo from '../../images/logo (2).png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt='logo'></img>
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/"><b>Home</b></Link>
          <Link to="/login"><b>Login</b></Link>
          <Link to="/register"><b>Register</b></Link>
          <Link to="/contact"><b>Contact Us</b></Link>
        </div>

        <div className="navbar-toggle" onClick={toggleNavbar}>
          <span className={`bar ${isOpen ? 'rotate-up' : ''}`}></span>
          <span className={`bar ${isOpen ? 'hidden' : ''}`}></span>
          <span className={`bar ${isOpen ? 'rotate-down' : ''}`}></span>
        </div>
    </nav>
    </>
  );
};

export default Navbar;
