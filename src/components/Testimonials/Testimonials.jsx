// src/components/Testimonials/Testimonials.jsx
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
            name: 'Gigi La Trottola',
            imageSrc: testimonialImage1,
            imageAlt: 'Photo of customer Gigi La Trottola',
            description: (
                <>
                    Absolutely loved my experience at Little Lemon! The food is always <strong>fresh</strong>, and the service is top-notch.
                </>
            ),
            rating: '4.8'
        },
        {
            name: 'Pippo Baudo',
            imageSrc: testimonialImage2,
            imageAlt: 'Photo of customer Pippo Baudo',
            description: ( 
                <> 
                    Little Lemon never disappoints! <strong>Great ambiance</strong>, delicious dishes, and friendly staff.'
                </> 
            ),
            rating: '4.5'
        },
        {
            name: 'Platinette',
            imageSrc: testimonialImage3,
            imageAlt: 'Photo of customer Platinette',
            description: (
                <>
                    A perfect spot for a <strong>healthy meal!</strong> The flavors at Little Lemon are always amazing.  
                </>
            ),
            rating: '4.7'
        },
        {
            name: 'Topo Gigio',
            imageSrc: testimonialImage4,
            imageAlt: 'Photo of customer Topo Gigio',
            description: (
                <>
                    <strong>Fast</strong> and reliable home delivery from Little Lemon! The food arrives hot and fresh, just like dining in!.
                </>
            ),
            rating: '4.9'
        }
    ];
    
    return (
        <section className="testimonials-section" aria-labelledby="testimonials-title">
            <div className="page-container">
                <div className="inner-container">
                    <h2 id="testimonials-title" className="section-title">Testimonials</h2>
                    <div className="testimonials-grid" aria-label="Customer testimonials">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialsCard
                                key={index}
                                name={testimonial.name}
                                imageSrc={testimonial.imageSrc}
                                imageAlt={testimonial.imageAlt}
                                description={testimonial.description}
                                rating={testimonial.rating}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;