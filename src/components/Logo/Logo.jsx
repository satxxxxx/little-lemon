// src/components/Logo/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/lemon2.png';
import './Logo.css';
import "../../styles/layout.css";

function Logo() {
  // NOTA: Qui utilizziamo semplicemente l'elemento appropriato, non c'è necessità di frammenti
  return (
    <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="Little Lemon Logo" className="logo" />
      </Link>
    </div>
  );
}

export default Logo;