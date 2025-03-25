import React from 'react';
import './MenuCard.css';
import "../../styles/layout.css";

function MenuCard({ title, price, description, imageSrc, imageAlt }) {
  return (
    <article className="menu-card">
      <img src={imageSrc} alt={imageAlt} className="menu-image" />
      <div className="menu-content">
        <h2 className="menu-title">{title}</h2>
        <p className="menu-price">{price}</p>
        <p className="menu-description">{description}</p>
        <button className="order-button">Ordina ora</button>
      </div>
    </article>
  );
}

export default MenuCard;


