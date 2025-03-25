import React from 'react';
import logo from '../../assets/lemon2.png';
import './Logo.css';
import "../../styles/layout.css";

function Logo() {
  return (
    <div className="logo-container">
      <img src={logo} alt="Little Lemon Logo" className="logo" />
    </div>
  );
}

export default Logo;