import React from 'react';
import '../../styles/App.css';

function Nav() {
  return (
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reservation">Reservation</a></li>
        <li><a href="#orderOnline">Order Online</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Nav;