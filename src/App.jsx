// src/App.jsx
import React, { useState, useEffect, useReducer } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import BookingPage from './components/BookingPage/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import ConfirmedBooking from './components/BookingPage/ConfirmedBooking'; // ✅ Nuovo import
import { fetchAPI, submitAPI } from './api';

function initializeTimes() {
  const today = new Date();
  return fetchAPI(today);
}

function availableTimesReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(action.payload);
    default:
      return state;
  }
}

function App() {
  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (location.pathname === "/menu") {
      const menuSection = document.getElementById("menu-section");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (location.pathname === "/menu") {
      const menuSection = document.getElementById("menu-section");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, [], initializeTimes);

  const updateTimes = (date) => {
    dispatch({ type: 'UPDATE_TIMES', payload: date });
  };

  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      navigate('/confirmation');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const handleLogin = (email, password) => {
    const username = email.split('@')[0];
    setUser({ email, username });
    closeLogin();
  };

  const handleLogout = () => setUser(null);

  return (
    <CartProvider>
      <Header openLogin={openLogin} user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route 
            path="/booking" 
            element={
              <BookingPage 
                availableTimes={availableTimes} 
                updateTimes={updateTimes} 
                submitForm={submitForm}
              />
            } 
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmedBooking />} />
          <Route path="/little-lemon/" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Cart />
      <Footer openLogin={openLogin} user={user} onLogout={handleLogout} />
      <Login isOpen={isLoginOpen} onClose={closeLogin} onLogin={handleLogin} />
    </CartProvider>
  );
}

export default App;
