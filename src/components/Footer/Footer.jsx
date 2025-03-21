import React from 'react';
import logo from './assets/Logo.svg';
import '../../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 1. Uso di figure per il logo */}
        <figure className="footer-logo">
          <img src={logo} alt="Little Lemon Logo" className="logo" />
        </figure>

        {/* 2. Uso di nav per la navigazione */}
        <div className="footer-sections">
          <nav className="footer-section">
            <h2>Navigazione</h2>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#reservations">Prenotazioni</a></li>
              <li><a href="#order-online">Ordina Online</a></li>
              <li><a href="#login">Login</a></li>
            </ul>
          </nav>

          {/* 3. Uso di address per i contatti */}
          <section className="footer-section">
            <h2>Contatti</h2>
            <address>
              <ul>
                <li>📞 <a href="tel:+391234567890">+39 123 456 7890</a></li>
                <li>✉️ <a href="mailto:info@littlelemon.com">info@littlelemon.com</a></li>
                <li>🏠 Via Roma 123, Milano</li>
                <li>⏰ Lun-Ven: 10-22, Sab-Dom: 12-23</li>
              </ul>
            </address>
          </section>

          {/* 4. Uso di section per i social */}
          <section className="footer-section social">
            <h2>Social</h2>
            <ul className="social-links">
              <li><a href="https://facebook.com" aria-label="Visita la nostra pagina Facebook">Facebook</a></li>
              <li><a href="https://instagram.com" aria-label="Visita il nostro profilo Instagram">Instagram</a></li>
              <li><a href="https://twitter.com" aria-label="Seguici su Twitter">Twitter</a></li>
              <li><a href="https://youtube.com" aria-label="Guarda i nostri video su YouTube">YouTube</a></li>
            </ul>
          </section>
        </div>
      </div>

      {/* 5. Uso di small per il copyright */}
      <div className="copyright">
        <small>© 2025 Little Lemon. Tutti i diritti riservati.</small>
      </div>
    </footer>
  );
}

export default Footer;
