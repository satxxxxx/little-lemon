//Testimonials.jsx 
import React from 'react';
import './Testimonials.css';
import "../../styles/layout.css";
import TestimonialsCard from './TestimonialsCard/TestimonialsCard';
import testimonialImage1 from '../../assets/testimonial1.jpg';
import testimonialImage2 from '../../assets/testimonial2.jpg';
import testimonialImage3 from '../../assets/testimonial3.jpg';
import testimonialImage4 from '../../assets/testimonial4.jpg';

function Testimonials() {

    const testimonials = [
        {
            name: 'John Doe',
            imageSrc: testimonialImage1,
            imageAlt: 'John Doe',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: 'Jane Doe',
            imageSrc: testimonialImage2,
            imageAlt: 'Jane Doe',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: 'Alice Doe',
            imageSrc: testimonialImage3,
            imageAlt: 'Alice Doe',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            name: 'Bob Doe',
            imageSrc: testimonialImage4,
            imageAlt: 'Bob Doe',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ];
    
    return (
        <section className="testimonials-section">
            <div className="page-container">
                <div className="inner-container">
                    <h2 className="section-title">Testimonials</h2>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialsCard
                                key={index}
                                name={testimonial.name}
                                imageSrc={testimonial.imageSrc}
                                imageAlt={testimonial.imageAlt}
                                description={testimonial.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;