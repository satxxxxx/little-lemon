import React from 'react';
import logo from './assets/logo.svg'; // Importa il file SVG

function Header() {
  return (
    <header>
      <img src={logo} alt="logo" className="logo" />
    </header>
  );
}

export default Header;