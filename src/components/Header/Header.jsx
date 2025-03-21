import React from 'react';
import logo from './assets/Logo.svg'; // Importa il file SVG
import '../../styles/App.css';

function Header() {
  return (
    <header>
      <img src={logo} alt="logo" className="logo" />
    </header>
  );
}

export default Header;