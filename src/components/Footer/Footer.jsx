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

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/' && location.pathname !== '/little-lemon/') {
      window.location.href = `/#${id}`;
      return;
    }
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

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (user) {
      onLogout();
    } else {
      openLogin();
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="page-container">
        <div className="footer-grid">
          <div className="footer-logo-column">
            <img src={logo} alt="Little Lemon Logo" className="footer-logo" />
          </div>

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
            <address className="footer-address">
              <div><span role="img" aria-label="address">📍</span> Gigio St.</div>
              <div><span role="img" aria-label="phone">📞</span> <a href="tel:+34003412345678">003412345678</a></div>
              <div><span role="img" aria-label="email">✉️</span> <a href="mailto:littlelemon@littlelemon.es">littlelemon@littlelemon.es</a></div>
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
