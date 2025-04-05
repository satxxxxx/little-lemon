// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

// NOTA: Creiamo il contesto
const CartContext = createContext(undefined);

// NOTA: Esportiamo il provider
export function CartProvider({ children }) {
  // NOTA: Stato per la lista degli elementi nel carrello
  const [cartItems, setCartItems] = useState([]);
  
  // NOTA: Funzione per aggiungere un elemento al carrello
  const addToCart = (item, quantity) => {
    if (quantity <= 0) return;
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };
  
  // NOTA: Funzione per rimuovere un elemento dal carrello
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // NOTA: Funzione per aggiornare la quantità di un elemento
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // NOTA: Funzione per calcolare il totale del carrello
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };
  
  // NOTA: Funzione per ottenere il numero totale di elementi
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  // NOTA: Funzione per svuotare il carrello
  const clearCart = () => {
    setCartItems([]);
  };
  
  // NOTA: Oggetto con tutte le funzioni per manipolare il carrello
  const value = {
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    getItemCount, 
    clearCart
  };
  
  // NOTA: Forniamo il context a tutti i componenti figli
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// NOTA: Esportiamo l'hook useCart per accedere facilmente al context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve essere utilizzato all'interno di un CartProvider");
  }
  return context;
}