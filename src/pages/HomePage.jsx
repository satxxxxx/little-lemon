// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import MenuSection from '../components/MenuSection/MenuSection';
import Testimonials from '../components/Testimonials/Testimonials';
import About from '../components/About/About';

function HomePage() {
  // NOTA: Usando un React.Fragment invece di un div ridondante
  return (
    <>
      <HeroSection />
      <MenuSection />
      <Testimonials />
      <About />
    </>
  );
}

export default HomePage;