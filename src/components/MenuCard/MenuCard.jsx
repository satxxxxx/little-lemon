// src/components/MenuCard/MenuCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCard.css';
import "../../styles/layout.css";

function MenuCard({ title, price, description, imageSrc, imageAlt }) {
  return (
    // NOTA: L'elemento semantico article è perfetto per una card di menu
    <article className="menu-card">
      <img src={imageSrc} alt={imageAlt} className="menu-image" />
      <div className="menu-content">
        <h2 className="menu-title">{title}</h2>
        <p className="menu-price">{price}</p>
        <p className="menu-description">{description}</p>
        <Link 
          to="/menu" 
          className="order-button"
          aria-label={`Order ${title}`}
        >
          <span aria-hidden="true">🛵 </span>
          Order Now
        </Link>
      </div>
    </article>
  );
}

export default MenuCard;