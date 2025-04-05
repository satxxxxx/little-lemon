// src/components/CheckoutProgressBar/CheckoutProgressBar.jsx
import React from 'react';
import './CheckoutProgressBar.css';

function CheckoutProgressBar({ currentStep, steps }) {
  return (
    <div className="checkout-progress-container">
      <div 
        className="checkout-progress-bar" 
        role="progressbar" 
        aria-valuemin="0" 
        aria-valuemax={steps.length - 1} 
        aria-valuenow={currentStep}
      >
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`progress-step-container ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
          >
            <div 
              className={`progress-step ${index === currentStep ? 'active' : ''}`}
              aria-label={`Step ${index + 1}: ${step} ${index < currentStep ? '(completed)' : index === currentStep ? '(current)' : ''}`}
            >
              {index < currentStep ? (
                <span className="step-check" aria-hidden="true">✓</span>
              ) : (
                <span className="step-number" aria-hidden="true">{index + 1}</span>
              )}
            </div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutProgressBar;