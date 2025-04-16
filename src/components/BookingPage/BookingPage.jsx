// src/components/BookingPage/BookingPage.jsx
import React from 'react';
import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';
import ReservationForm from '../FormSteps/ReservationForm';
import './BookingPage.css';

function BookingPage({ availableTimes, updateTimes, submitForm }) {
  return (
    <div className="booking-page-container">
      {/* Intestazione della pagina di prenotazione */}
      <div className="booking-page-header">
      <h1 className="display-title">Reserve a Table</h1>
        <p className="lead-text">
          We look forward to serving you at Little Lemon. Please fill out the form below to book your table.
        </p>
      </div>

      {/* Componente del form di prenotazione tavolo */}
      <ReservationForm 
        availableTimes={availableTimes} 
        updateTimes={updateTimes} 
        onSubmit={submitForm} 
      />
    </div>
  );
}



export default BookingPage;
