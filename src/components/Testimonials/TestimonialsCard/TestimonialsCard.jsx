import React from 'react';
import './TestimonialsCard.css';

function TestimonialsCard({ name, imageSrc, imageAlt, description }) {
    return (
        <div className="testimonial-card">
            <img src={imageSrc} alt={imageAlt} className="testimonial-image" />
            <h3 className="testimonial-name">{name}</h3>
            <p className="testimonial-description">{description}</p>
        </div>
    );
}

export default TestimonialsCard;