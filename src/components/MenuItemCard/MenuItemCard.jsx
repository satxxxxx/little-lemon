// src/components/MenuItemCard/MenuItemCard.jsx
import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import './MenuItemCard.css';

function MenuItemCard({ id, title, price, description, imageSrc, imageAlt, category }) {
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();
  
  const handleOrder = () => {
    const item = {
      id,
      title,
      price,
      description,
      imageSrc,
      imageAlt,
      category
    };
    
    addToCart(item, quantity);
    
    // NOTA: Crea e mostra il messaggio
    setMessage(`You have added ${quantity} ${quantity === 1 ? 'dish' : 'dishes'} to the cart`);
    setShowMessage(true);
    
    // NOTA: Nascondi il messaggio dopo 3 secondi
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    
    // NOTA: Reset della quantità dopo l'aggiunta al carrello
    setQuantity(1);
  };

  return (
    <article className="menu-item-card">
      <img src={imageSrc} alt={imageAlt} className="menu-item-image" />
      <div className="menu-item-content">
        <div className="menu-item-header">
          <h3 className="card-title">{title}</h3>
          <p className="highlight-text menu-item-price">{price}</p>
        </div>
        <p className="paragraph menu-item-description">{description}</p>
        
        <div className="menu-item-order">
          <div className="quantity-control" role="group" aria-label={`Select quantity for ${title}`}>
            <button 
              className="quantity-button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              aria-controls={`quantity-${id}`}
            >
              -
            </button>
            <span 
              id={`quantity-${id}`} 
              className="quantity-value" 
              aria-live="polite"
              aria-atomic="true"
            >
              {quantity}
            </span>
            <button 
              className="quantity-button"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              aria-controls={`quantity-${id}`}
            >
              +
            </button>
          </div>
          
          <button 
            className="menu-item-order-button"
            onClick={handleOrder}
            aria-label={`Add ${quantity} ${title} to cart`}
          >
            <span className="order-icon" aria-hidden="true">🛵</span> Order Now
          </button>
          
          {/* NOTA: Messaggio di conferma con attributi ARIA */}
          {showMessage && (
            <div 
              className="confirmation-message" 
              role="status" 
              aria-live="polite"
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default MenuItemCard;