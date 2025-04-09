// src/components/Footer/Footer.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FooterColumn from '../FooterColumn/FooterColumn';
import logo from '../../assets/lemon1.png';
import './Footer.css';
import '../../styles/layout.css';

function Footer({ openLogin, user, onLogout }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const location = useLocation();
  
  // NOTA: Funzione per gestire i click sulle sezioni di navigazione
  const handleSectionClick = (e, id) => {
    e.preventDefault();
    
    // Se non siamo nella homepage, reindirizza alla homepage con hash
    if (location.pathname !== '/' && location.pathname !== '/little-lemon/') {
      window.location.href = `/#${id}`;
      return;
    }
    
    // Altrimenti scorri alla sezione
    const element = document.getElementById(id);
    const headerHeight = document.querySelector('.header').offsetHeight || 0;
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
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
    <footer className="footer" role="contentinfo">
      <div className="page-container">
        <div className="inner-container footer-content">
          <FooterColumn>
            <img src={logo} alt="Little Lemon Logo" className="footer-logo" />
          </FooterColumn>
          
          <FooterColumn>
            <nav aria-label="Footer navigation">
              <Link aria-label="Torna alla Home" to="/" className="footer-link">Home</Link>
              <a 
                href="#about" 
                onClick={(e) => handleSectionClick(e, 'about')} 
                className="footer-link"
              >
                About
              </a>
              <Link to="/menu" className="footer-link">Menu</Link>
              <a 
                href="#reservation" 
                onClick={(e) => handleSectionClick(e, 'reservation')} 
                className="footer-link"
              >
                Reservations
              </a>
              <Link to="/menu" className="footer-link">Order Online</Link>
              <a 
                href="#" 
                onClick={handleAuthClick} 
                className="footer-link"
              >
                {user ? 'Logout' : 'Login'}
              </a>
              {user && (
                <div className="user-info" aria-live="polite">
                  Current user: <span className="username">{user.username}</span>
                </div>
              )}
            </nav>
          </FooterColumn>
          
          <FooterColumn title="Contatti">
            <address>
              <span>Gigio St.</span>
              <span>003412345678</span>
              <span>Littlelemon@littlelemon.es</span>
            </address>
          </FooterColumn>
          
          <FooterColumn title="Social">
            <a href="https://facebook.com" className="footer-link" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page">Facebook</a>
            <a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page">Instagram</a>
            <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page">Twitter</a>
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
}

export default Footer;