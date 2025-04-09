// src/components/Navigation/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({ openLogin, user, onLogout }) {
  // NOTA: Funzione per scorrere a una sezione specifica
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    // Se non siamo nella homepage, vai alla homepage con l'hash
    if (window.location.pathname !== '/' && window.location.pathname !== '/little-lemon/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Se siamo nella homepage, scorri alla sezione
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector('.header').offsetHeight || 0;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  // NOTA: Gestisci il click sul pulsante Login/Logout
  const handleAuthClick = (e) => {
    e.preventDefault();
    
    if (user) {
      // Se l'utente è loggato, effettua il logout
      onLogout();
    } else {
      // Altrimenti apri il modulo di login
      openLogin();
    }
  };

  return (
    <nav className="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <a 
            href="#about" 
            className="nav-link" 
            onClick={(e) => scrollToSection(e, 'about')}
            aria-label="About section"
          >
            About
          </a>
        </li>
        <li className="nav-item">
          <Link to="/menu" className="nav-link">Menu</Link>
        </li>
        <li className="nav-item">
          <Link to="/booking" className="nav-link">Reservations</Link>
        </li>
        <li className="nav-item">
          <Link to="/menu" className="nav-link">Order Online</Link>
        </li>
        <li className="nav-item">
          <a 
            href="#" 
            className="nav-link" 
            onClick={handleAuthClick}
            aria-label={user ? "Log out" : "Log in"}
          >
            {user ? 'Logout' : 'Login'}
          </a>
          {user && (
            <div className="user-greeting" aria-live="polite">
              Hi, {user.username}!
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;