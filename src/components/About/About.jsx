// src/components/About/About.jsx
import React from 'react';
import './About.css';
import '../../styles/layout.css';
import restaurantImage from '../../assets/chef-cooking.jpg'; // Immagine principale
import chefImage from '../../assets/restaurant-interior.jpg'; // Immagine secondaria

function About() {
    return (
        <section className="about-section">
            <div className="page-container">
                <div className="about-container">
                    <div className="about-content">
                        <h2 className="about-title">Little Lemon</h2>
                        <div className="about-description">
                            <p>
                                Amet minim mollit non deserunt ullamco est sit
                                aliqua dolor do amet sint. Velit officia consequat
                                duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </p>
                            <p>
                                Amet minim mollit non deserunt ullamco est sit
                                aliqua dolor do amet sint. Velit officia consequat
                                duis enim velit mollit.
                            </p>
                        </div>
                    </div>
                    <div className="about-images">
                        <img 
                            src={restaurantImage} 
                            alt="Little Lemon restaurant interior" 
                            className="about-main-image" 
                        />
                        <img 
                            src={chefImage}
                            alt="Chef preparing food"
                            className="about-chef-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;