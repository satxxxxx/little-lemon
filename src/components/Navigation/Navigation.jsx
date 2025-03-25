import React from 'react';
import './Navigation.css';
import "../../styles/layout.css";

function Navigation() {
  const menuItems = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Menu', link: '#menu' },
    { name: 'Reservation', link: '#reservation' },
    { name: 'Order Online', link: '#orderOnline' },
    { name: 'Login', link: '#login' }
  ];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a href={item.link} className="nav-link">{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;