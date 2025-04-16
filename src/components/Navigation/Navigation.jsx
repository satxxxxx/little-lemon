import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({ openLogin, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (window.location.pathname !== '/' && window.location.pathname !== '/little-lemon/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: sectionTop - headerHeight, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleAuthClick = (e) => {
    e.preventDefault();
    user ? onLogout() : openLogin();
    setMenuOpen(false);
  };

  return (
    <nav className="navigation" aria-label="Main navigation">
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className="nav-item">
          <a href="#about" className="nav-link" onClick={(e) => scrollToSection(e, 'about')}>About</a>
        </li>
        <li className="nav-item">
          <Link to="/menu" className="nav-link" onClick={() => setMenuOpen(false)}>Menu</Link>
        </li>
        <li className="nav-item">
          <Link to="/booking" className="nav-link" onClick={() => setMenuOpen(false)}>Reservations</Link>
        </li>
        <li className="nav-item">
          <Link to="/checkout" className="nav-link" onClick={() => setMenuOpen(false)}>Cart</Link>
        </li>
        <li className="nav-item">
          <button className="nav-link auth-button" onClick={handleAuthClick}>
            {user ? 'Logout' : 'Login'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
