// src/components/BookingPage/ConfirmedBooking.jsx
import React from 'react';
import './ConfirmedBooking.css';
import { useNavigate } from 'react-router-dom';

function ConfirmedBooking() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-icon" aria-hidden="true">
        <div className="circle-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="12" fill="#495E57" />
            <path d="M17 7l-7.5 8L7 11" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
      <h2 className="confirmation-title">Reservation Confirmed!</h2>
      <p className="confirmation-message">Your table has been successfully reserved.</p>
      <p className="confirmation-submessage">A confirmation has been sent to your email.</p>

      <div className="assistance-contact">
        <p className="contact-info"><strong>If you need any assistance, please contact us:</strong></p>
        <div className="contact-details">
          <p><span className="label">Phone:</span> 00341234567</p>
          <p><span className="label">Email:</span> Littlelemon@littlelemon.es</p>
        </div>
      </div>

      <button className="back-home-button" onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
}

export default ConfirmedBooking;
    