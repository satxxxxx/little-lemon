// src/pages/MenuPage.jsx
import React from 'react';
import MenuList from '../components/MenuList/MenuList';
import '../styles/MenuPage.css';

function MenuPage() {
  return (
    <section id="menu-section" className="menu-page-section" aria-labelledby="menu-page-title">
      <div className="page-container">
        <h1 id="menu-page-title" className="display-title">Our Menu</h1>
        <p className="lead-text delivery-notice">
          <span
            className="order-icon"
            aria-hidden="true"
            style={{ fontSize: '1.8rem', marginRight: '10px' }}
          >
            🛵
          </span>
          "Home delivery available for all orders!"
        </p>
        <MenuList />
      </div>
    </section>
  );
}

export default MenuPage;