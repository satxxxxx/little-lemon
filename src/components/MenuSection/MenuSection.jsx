// src/components/MenuSection/MenuSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MenuCard from '../MenuCard/MenuCard';
import './MenuSection.css';
import GreekSaladImage from '../../assets/GreekSalad.jpg';
import BruschettaImage from '../../assets/Bruschetta.jpg';
import LemonDessertImage from '../../assets/LemonDessert.jpg';

function MenuSection() {
  const menuItems = [
    {
      title: 'Greek Salad',
      price: '$12.99',
      description: 'Salad with feta, tomatoes, cucumbers, and olives',
      imageSrc: GreekSaladImage,
      imageAlt: 'Greek salad with feta, tomatoes, cucumbers, and olives'
    },
    {
      title: 'Bruschetta',
      price: '$16.99',
      description: "Toasted bread with fresh tomatoes, basil, and olive oil",
      imageSrc: BruschettaImage,
      imageAlt: 'Bruschetta with fresh tomatoes and basil'
    },
    {
      title: 'Lemon Dessert',
      price: '$8.50',
      description: 'Fresh lemon dessert with glaze and vanilla',
      imageSrc: LemonDessertImage,
      imageAlt: 'Lemon dessert with glaze and vanilla'
    }
  ];
  
  return (
    <section className="menu-section" id="menu" aria-labelledby="menu-section-title">
      <div className="title-container">
        <h2 id="menu-section-title" className="section-title">SPECIALS</h2>
        <Link 
          to="/menu" 
          className="menu-button"
          aria-label="View full menu"
        >
          Online Menu
        </Link>
      </div>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          // NOTA: Usando frammento di React invece di div quando la div è solo un contenitore
          <React.Fragment key={index}>
            <div className="menu-item-container">
              <MenuCard {...item} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default MenuSection;