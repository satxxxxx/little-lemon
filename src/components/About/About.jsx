// src/components/About/About.jsx
import React from 'react';
import './About.css';
import '../../styles/layout.css';
import restaurantImage from '../../assets/restaurant-interior.jpg';
import chefImage from '../../assets/chef-cooking.jpg';

function About() {
    return (
        // NOTA: Utilizziamo un elemento semantico <section> per la sezione About
        // L'attributo id="about" permette di navigare a questa sezione tramite link di ancoraggio
        <section className="about-section" id="about">
            <div className="page-container">
                {/* NOTA: Utilizziamo un <div> qui perché è un contenitore stilizzato reale */}
                <div className="about-container">
                    <div className="about-content">
                        <h2 className="about-title">Little Lemon</h2>
                        {/* NOTA: Utilizziamo un <div> per raggruppare i paragrafi con uno stile specifico */}
                        <div className="about-description">
                            <p>
                            Nestled in the heart of the city, Little Lemon is a charming
                            restaurant known for its fresh ingredients and vibrant Mediterranean
                            flavors. The cozy atmosphere, combined with a carefully curated menu,
                            makes it a favorite spot for both locals and tourists. From zesty 
                            lemon-infused dishes to traditional Greek and Italian specialties,
                            every meal is crafted with passion and authenticity..
                            </p>
                            <p>
                            Beyond its delicious cuisine, Little Lemon prides itself on excellent
                            customer service and a warm, welcoming ambiance. Whether you're stopping
                            by for a quick lunch or a romantic dinner, the restaurant offers a memorable
                            dining experience. With its commitment to quality and tradition,
                            Little Lemon continues to be a must-visit destination for food lovers.
                            </p>
                        </div>
                    </div>
                    <div className="about-images">
                    <img 
                        src={chefImage}
                        alt="Chef preparing food"
                        className="about-chef-image"
                        />
                    <img 
                        src={restaurantImage} 
                        alt="Little Lemon restaurant interior" 
                        className="about-main-image" 
                        />                                    
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;