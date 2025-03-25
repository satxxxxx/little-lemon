import React from 'react';
import './HeroSection.css';
import '../../styles/layout.css';
import heroImage from '../../assets/RestauranFood.jpg'; // Importa un'immagine da usare

function HeroSection() {
    return (
      <section className="hero-section">
        <div className="page-container">
            <div className="inner-container">
                <div className="hero-content">
                    <div className="hero-text-column">
                        <h1 className="hero-title">Little Lemon</h1>
                        <h2 className="hero-subtitle">Chicago</h2>
                        <p className="hero-description">
                            Little Lemon is a cozy Chicago Mediterranean restaurant offering fresh Greek and Italian dishes from Benevento. With quality ingredients and a casual atmosphere, it serves popular salads, grilled seafood and meats with select wines.
                        </p>
                        <button className="cta-button">Reserve a Table</button>
                    </div>
                    <div className="hero-image-column">
                        <img src={heroImage} alt="Little Lemon Restaurant" className="hero-image" />
                    </div>
                </div>
            </div>
        </div>
      </section>
    );
}

export default HeroSection;