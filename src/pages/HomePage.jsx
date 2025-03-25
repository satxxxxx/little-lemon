import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import MenuSection from '../components/MenuSection/MenuSection';
import Testimonials from '../components/Testimonials/Testimonials';

function HomePage() {
    return (
        <>
            <HeroSection />
            <MenuSection />
            <Testimonials />
        </>
    );
}

export default HomePage;