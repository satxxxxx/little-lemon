import React from 'react';
import FooterColumn from '../FooterColumn/FooterColumn';
import logo from '../../assets/lemon1.png';
import './Footer.css';
import '../../styles/layout.css';

function Footer() {
  // Links per il footer con URL
  const navLinks = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'menu', link: '#menu' },
    { name: 'Reservations', link: '#reservations' },
    { name: 'Order Online', link: '#orderOnline' },
    { name: 'Login', link: '#login' }
  ];
  
  // Per i contatti, puoi mantenere l'approccio attuale o aggiungere link
  const contacts = ['Gigio St.', '003412345678', 'Littlelemon@littlelemon.es'];
  
  // Social con URL
  const socials = [
    { name: 'Facebook', link: 'https://facebook.com' },
    { name: 'Instagram', link: 'https://instagram.com' },
    { name: 'Twitter', link: 'https://twitter.com' }
  ];

  return (
    <footer className="footer">
      <div className="page-container">
        <div className="inner-container footer-content">
          <FooterColumn>
            <img src={logo} alt="Little Lemon Logo" className="footer-logo" />
          </FooterColumn>
          
          <FooterColumn>
            {navLinks.map((link, index) => (
              <a key={index} href={link.link} className="footer-link">{link.name}</a>
            ))}
          </FooterColumn>
          
          <FooterColumn title="Contatti">
           {contacts.map((contact, index) => (
              <span key={index}>{contact}</span>  // Usa span invece di p
           ))}
          </FooterColumn>
          
          <FooterColumn title="Social">
            {socials.map((social, index) => (
              <a key={index} href={social.link} className="footer-link" target="_blank" rel="noopener noreferrer">{social.name}</a>
            ))}
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
}

export default Footer;