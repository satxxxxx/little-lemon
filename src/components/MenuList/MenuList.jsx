// src/components/MenuList/MenuList.jsx
import React, { useState } from 'react';
import MenuItemCard from '../MenuItemCard/MenuItemCard';
import './MenuList.css';

// Importa le immagini
import GreekSaladImage from '../../assets/GreekSalad.jpg';
import BruschettaImage from '../../assets/Bruschetta.jpg';
import LemonDessertImage from '../../assets/LemonDessert.jpg';
import FlorentinesteakImage from '../../assets/Florentinesteak.jpg';
import CaponataImage from '../../assets/Caponata.jpg';
import pastameatImage from '../../assets/pastameat.jpg';
import pastatomatoImage from '../../assets/pastatomato.jpg';
import pastapestoImage from '../../assets/pastapesto.jpg';

function MenuList() {
  // NOTA: Definiamo le categorie
  const categories = [
    'All',
    'Starters',
    'First Courses',
    'Main Courses',
    'Desserts'
  ];
  
  // NOTA: Stato per tenere traccia della categoria selezionata
  const [activeCategory, setActiveCategory] = useState('All');
  
  // NOTA: Lista completa dei piatti del menu
  const allMenuItems = [
    {
      id: 1,
      title: 'Greek Salad',
      price: '$12.99',
      description: 'Fresh salad with feta, tomatoes, cucumbers, and black olives.',
      imageSrc: GreekSaladImage,
      imageAlt: 'Fresh salad with feta, tomatoes, cucumbers, and black olives.',
      category: 'Starters'
    },
    {
      id: 2,
      title: 'Bruschetta',
      price: '$16.99',
      description: "Toasted bread with fresh tomatoes, basil, and olive oil.",
      imageSrc: BruschettaImage,
      imageAlt: 'Bruschetta with fresh tomatoes and basil.',
      category: 'Starters'
    },
    {
      id: 3,
      title: 'Lemon Dessert',
      price: '$8.50',
      description: 'Fresh lemon dessert with glaze and vanilla.',
      imageSrc: LemonDessertImage,
      imageAlt: 'Lemon dessert with glaze and vanilla.',
      category: 'Desserts'
    },
    {
      id: 4,
      title: 'Florentine Steak',
      price: '$24.50',
      description: 'A tender, bone-in steak, grilled to perfection, traditional to Tuscany.',
      imageSrc: FlorentinesteakImage,
      imageAlt: 'A classic Tuscan bone-in steak, grilled to perfection.',
      category: 'Main Courses'
    },
    {
      id: 5,
      title: 'Caponata',
      price: '$15.99',
      description: 'Traditional Sicilian dish with eggplant, tomatoes, and olives.',  
      imageSrc: CaponataImage,
      imageAlt: 'Traditional Sicilian dish with eggplant, tomatoes, and olives.',
      category: 'Main Courses'
    },
    {
      id: 6,
      title: 'Pasta with meat',
      price: '$15.99',
      description: 'A hearty pasta dish with rich meat sauce, simmered to bring out deep flavors.',  
      imageSrc: pastameatImage,
      imageAlt: 'Pasta with a rich, flavorful meat sauce.',
      category: 'First Courses'
    },
    {
      id: 7,
      title: 'Pasta with tomato',
      price: '$15.99',
      description: 'A simple yet delicious pasta with a fresh tomato sauce, seasoned with herbs for a classic Italian taste.',  
      imageSrc: pastatomatoImage,
      imageAlt: 'Pasta with a fresh, savory tomato sauce.',
      category: 'First Courses'
    },
    {
      id: 8,
      title: 'Pasta with pesto',
      price: '$15.99',
      description: 'Pasta tossed in a fragrant basil pesto sauce, made with fresh basil, garlic, and pine nuts.',  
      imageSrc: pastapestoImage,
      imageAlt: 'Pasta with a fragrant basil pesto sauce.',
      category: 'First Courses'
    },
  ];
  
  // NOTA: Filtra i piatti in base alla categoria selezionata
  const filteredItems = activeCategory === 'All'
    ? allMenuItems 
    : allMenuItems.filter(item => item.category === activeCategory);
  
  return (
    <section className="menu-list">
      {/* NOTA: Filtri per categoria */}
      <div className="category-filters" role="tablist" aria-label="Menu categories">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            role="tab"
            aria-selected={activeCategory === category}
            aria-controls="menu-items-grid"
            id={`category-${category.toLowerCase().replace(' ', '-')}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* NOTA: Grid di piatti */}
      <div 
        id="menu-items-grid"
        className="menu-items-grid" 
        role="tabpanel" 
        aria-labelledby={`category-${activeCategory.toLowerCase().replace(' ', '-')}`}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItemCard 
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              category={item.category}
            />
          ))
        ) : (
          <p className="no-items-message">No items available in this category</p>
        )}
      </div>
    </section>
  );
}

export default MenuList;