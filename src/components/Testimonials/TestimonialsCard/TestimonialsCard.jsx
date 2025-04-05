// src/components/Testimonials/TestimonialsCard/TestimonialsCard.jsx
import React from 'react';
import './TestimonialsCard.css';

function TestimonialsCard({ name, imageSrc, imageAlt, description, rating }) {
    return (
        <article className="testimonial-card">
            <div className="testimonial-header">
                <img src={imageSrc} alt={imageAlt} className="testimonial-image" />
                {rating && (
                    <div 
                        className="rating-badge" 
                        aria-label={`Rating: ${rating} out of 5`}
                    >
                        <span className="star" aria-hidden="true">★</span>
                        <span className="rating-value">{rating}</span>
                    </div>
                )}
            </div>
            <h3 className="testimonial-name">{name}</h3>
            <p className="testimonial-description">{description}</p>
        </article>
    );
}

export default TestimonialsCard;