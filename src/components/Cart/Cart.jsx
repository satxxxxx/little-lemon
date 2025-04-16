// src/components/Cart/Cart.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getItemCount,
    clearCart 
  } = useCart();
  
  // NOTA: Funzione per aprire/chiudere il carrello
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  
  // NOTA: Funzione per gestire il checkout
  const handleCheckout = () => {
    setIsOpen(false); // Chiude il carrello
    navigate('/checkout'); // Reindirizza alla pagina di checkout
  };
  
  return (
    <div className={`cart-container ${isOpen ? 'open' : ''}`}>
      <button 
        className="cart-toggle"
        onClick={toggleCart}
        aria-label="Shopping cart"
        aria-expanded={isOpen}
        aria-controls="cart-panel"
      >
        <span aria-hidden="true">🛒</span>
        {getItemCount() > 0 && (
          <span className="cart-badge" aria-label={`${getItemCount()} items in cart`}>{getItemCount()}</span>
        )}
      </button>
      
      <div 
        id="cart-panel"
        className="cart-panel"
        role="dialog" 
        aria-label="Shopping cart content"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="cart-header">
          <h2 className="subtitle">Your order</h2>
          <button 
            className="cart-close-button" 
            onClick={toggleCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p className="lead-text">Your cart is empty</p>
            <p className="paragraph empty-suggestion">Add some dishes from the menu!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image-container">
                    <img 
                      src={item.imageSrc} 
                      alt={item.title} 
                      className="cart-item-image" 
                    />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="highlight-text cart-item-price">{item.price}</p>
                    
                    <div className="cart-item-controls">
                      <div className="cart-quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-button small"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          -
                        </button>
                        <span className="quantity-value" aria-live="polite">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-button small"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <span aria-hidden="true">🛒</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-subtotal">
                <span className="lead-text">Subtotal:</span>
                <span className="lead-text highlight-text" aria-live="polite">${getCartTotal().toFixed(2)}</span>
              </div>
              
              <p className="paragraph delivery-info">
                <span className="delivery-icon" aria-hidden="true">🛵</span> 
                Delivery included
              </p>
              
              <div className="cart-actions">
                <button 
                  className="clear-cart-button"
                  onClick={clearCart}
                  aria-label="Clear all items from cart"
                >
                  Clear Cart
                </button>
                
                <button 
                  className="checkout-button"
                  onClick={handleCheckout}
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;