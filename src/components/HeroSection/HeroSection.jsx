// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importiamo useNavigate per la navigazione
import './HeroSection.css';
import '../../styles/layout.css';
import heroImage from '../../assets/RestaurantFood.jpg';

function HeroSection() {
    const navigate = useNavigate(); // Hook per la navigazione
    
    // NOTA: Funzione per gestire il click sul pulsante di prenotazione
    const handleReservationClick = () => {
        // Naviga alla pagina di prenotazione
        navigate('/booking');
    };
    
    return (
      // NOTA: Usiamo un elemento semantico section per la sezione hero
      <section className="hero-section" id="home">
        <div className="page-container">
            <div className="inner-container">
                <div className="hero-content">
                    <div className="hero-text-column">
                        <h1 className="hero-title">Little Lemon</h1>
                        <h2 className="hero-subtitle">Chicago</h2>
                        <p className="hero-description">
                            Little Lemon is a cozy Chicago Mediterranean restaurant offering fresh Greek and Italian dishes from Benevento. With quality ingredients and a casual atmosphere, it serves popular salads, grilled seafood and meats with select wines.
                        </p>
                        {/* NOTA: Aggiunto onClick handler e attributi ARIA */}
                        <button 
                            className="cta-button" 
                            onClick={handleReservationClick}
                            aria-label="Reserve a table at Little Lemon"
                        >
                            Reserve a Table
                        </button>
                    </div>
                    <div className="hero-image-column">
                        <img 
                            src={heroImage} 
                            alt="Little Lemon Restaurant featuring beautifully presented dishes" 
                            className="hero-image" 
                        />
                    </div>
                </div>
            </div>
        </div>
      </section>
    );
}

export default HeroSection;