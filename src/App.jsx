// App.jsx 
import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import MenuSection from './components/MenuSection/MenuSection';
import Testimonials from './components/Testimonials/Testimonials';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import './styles/App.css';
import './styles/layout.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MenuSection />
        <Testimonials />
        <About /> 
      </main>
      <Footer />
    </>
  );
}

export default App;