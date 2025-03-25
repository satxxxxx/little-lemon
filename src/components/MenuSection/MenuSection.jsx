import React from 'react';
import MenuCard from '../MenuCard/MenuCard';
import './MenuSection.css';
// import '../../styles/layout.css';
import GreekSaladImage from '../../assets/GreekSalad.jpg';
import BruschettaImage from '../../assets/Bruschetta.jpg';
import LemonDessertImage from '../../assets/LemonDessert.jpg';

function MenuSection() {
  const menuItems = [
    {
      title: 'Greek Salad',
      price: '$12.99',
      description: 'Insalata fresca con feta, pomodori, cetrioli e olive nere',
      imageSrc: GreekSaladImage,
      imageAlt: 'Insalata greca con feta, pomodori, cetrioli e olive'
    },
    {
      title: 'Bruschetta',
      price: '$16.99',
      description: "Pane tostato con pomodori freschi, basilico e olio d'oliva",
      imageSrc: BruschettaImage,
      imageAlt: 'Bruschetta con pomodori freschi e basilico'
    },
    {
      title: 'Lemon Dessert',
      price: '$8.50',
      description: 'Dolce al limone fresco con glassa e vaniglia',
      imageSrc: LemonDessertImage,
      imageAlt: 'Dolce al limone con glassa e vaniglia'
    }
  ];

  return (
    <section className="menu-section">
      <h2 className="section-title">SPECIALS</h2>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div className="menu-item-container" key={index}>
            <MenuCard {...item} />
          </div>
        ))}
      </div>
      <button className="menu-button">Online Menu</button>
    </section>
  );
}

export default MenuSection;
