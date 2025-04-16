// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';
import CheckoutProgressBar from '../components/CheckoutProgressBar/CheckoutProgressBar';



function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Definizione degli step in inglese
  const checkoutSteps = ["Summary", "Personal Info", "Delivery", "Payment"];
  
  // Stato per tenere traccia dello step corrente
  const [currentStep, setCurrentStep] = useState(0);
  
  // Stati per i dropdown dei selettori
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  
  // Genera opzioni di data (oggi e i prossimi 3 giorni)
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
      
      options.push({
        value: date.toISOString().split('T')[0],
        label: formattedDate
      });
    }
    
    return options;
  };

  // Genera opzioni di orario (dalle 5:00 PM alle 10:00 PM, ogni 30 minuti)
  const generateTimeOptions = () => {
    const options = [];
    
    for (let hour = 17; hour <= 22; hour++) {
      for (let minute of [0, 30]) {
        // Salta le 22:30
        if (hour === 22 && minute === 30) continue;
        
        const hours12 = hour > 12 ? hour - 12 : hour;
        const period = 'pm';
        const formattedMinute = minute === 0 ? '00' : minute;
        
        // Format with leading zeros
        const displayTime = `${hours12.toString().padStart(2, '0')}:${formattedMinute} ${period}`;
        
        options.push({
          value: displayTime,
          label: displayTime
        });
      }
    }
    
    return options;
  };

  const dateOptions = generateDateOptions();
  const timeOptions = generateTimeOptions();

  // Stato iniziale del form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    deliveryDate: dateOptions[0].value, // Imposta oggi come valore predefinito
    deliveryTime: '05:00 pm', // Imposta le 5:00 pm come orario predefinito
    notes: '',
    paymentMethod: 'cash',
    // Campi per la carta di credito
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    // Privacy
    privacyConsent: false
  });

  // Stato per gli errori di validazione
  const [errors, setErrors] = useState({});

  // Stato per il messaggio di conferma dell'ordine
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Stato per l'elaborazione del pagamento
  const [isProcessing, setIsProcessing] = useState(false);

  // Gestisce i cambiamenti nei campi del form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Rimuove l'errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Gestione selezione data
  const handleDateSelect = (value) => {
    setFormData({
      ...formData,
      deliveryDate: value
    });
    setIsDateDropdownOpen(false);
  };

  // Gestione selezione orario
  const handleTimeSelect = (value) => {
    setFormData({
      ...formData,
      deliveryTime: value
    });
    setIsTimeDropdownOpen(false);
  };

  // Valida lo step corrente
  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch(currentStep) {
      case 0: // Riepilogo - non c'è niente da validare
        return true;
        
      case 1: // Dati personali
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'Please enter your first name';
        } else if (!/^[a-zA-Z\s-]+$/.test(formData.firstName)) {
          newErrors.firstName = 'First name can include only letters, spaces, or hyphens';
        }
        
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Please enter your last name';
        } else if (!/^[a-zA-Z\s-]+$/.test(formData.lastName)) {
          newErrors.lastName = 'Last name can include only letters, spaces, or hyphens';
        }
        
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{9,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        }
        
        break;
        
      case 2: // Dettagli di consegna
        if (!formData.address.trim() || !/.*[a-zA-ZÀ-ÿ'’].*/.test(formData.address)) {
          newErrors.address = "Please enter a valid address with at least one letter";
        }
        
        if (!formData.city.trim() || !/.*[a-zA-ZÀ-ÿ'’].*/.test(formData.city)) {
          newErrors.city = "Please enter a valid city name with at least one letter";
        }
        
        if (!formData.zip.trim()) {
          newErrors.zip = 'ZIP code is required';
        } else if (!/^\d{5}$/.test(formData.zip)) {
          newErrors.zip = 'Please enter a valid ZIP code (5 digits)';
        }
        
        break;
        
      case 3: // Pagamento
        if (formData.paymentMethod === 'card') {
          if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'Card number is required';
          } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ''))) {
            newErrors.cardNumber = 'Please enter a valid card number (16 digits)';
          }
          
          if (!formData.cardName.trim()) {
            newErrors.cardName = 'Cardholder name is required';
          }
          
          if (!formData.cardExpiry.trim()) {
            newErrors.cardExpiry = 'Expiration date is required';
          } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
            newErrors.cardExpiry = 'Invalid date format (MM/YY)';
          }
          
          if (!formData.cardCVV.trim()) {
            newErrors.cardCVV = 'CVV code is required';
          } else if (!/^\d{3,4}$/.test(formData.cardCVV)) {
            newErrors.cardCVV = 'Please enter a valid CVV (3-4 digits)';
          }
        }
        
        if (!formData.privacyConsent) {
          newErrors.privacyConsent = 'You must accept the Privacy Policy to proceed';
        }
        
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestisce il passaggio allo step successivo
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Gestisce il passaggio allo step precedente
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Funzione per chiudere manualmente la finestra di conferma
  const closeConfirmation = () => {
    clearCart();
    navigate('/');
  };

  // Gestisce l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      // Mostriamo un indicatore di caricamento o un messaggio
      setIsProcessing(true);
      
      // Simuliamo un ritardo nel processo di pagamento (3 secondi)
      setTimeout(() => {
        // Qui invieremmo i dati a un'API in un'applicazione reale
        console.log('Order submitted:', {
          customer: formData,
          items: cartItems,
          total: getCartTotal()
        });
        
        // Nascondiamo l'indicatore di caricamento
        setIsProcessing(false);
        
        // Mostra il messaggio di conferma
        setOrderPlaced(true);
      }, 3000);
    }
  };

  // Formatta una data per la visualizzazione
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };


  // Funzione renderStep per renderizzare il contenuto in base allo step corrente
  const renderStep = () => {
    switch(currentStep) {
      case 0: // Riepilogo dell'ordine
        return (
          <div className="order-summary">
            <h3 className="info-section-title">ORDER SUMMARY</h3>
            
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-image-container">
                    <img src={item.imageSrc} alt={item.title} className="item-image" />
                  </div>
                  <div className="item-details">
                    <h4 className="card-title">{item.title}</h4>
                    <div className="item-meta">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="highlight-text">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="divider"></div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span className="highlight-text">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Delivery:</span>
                <span>Included</span>
              </div>
              <div className="total-row final-total">
                <span>Total:</span>
                <span className="highlight-text">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
        
      case 1: // Dati personali
        return (
          <div className="info-section">
            <h3 className="info-section-title">PERSONAL INFORMATION</h3>
            
            <div className="two-columns">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus={currentStep === 1}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="John"
                  aria-required="true"
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
                {errors.firstName && <span className="error-message" role="alert">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Smith"
                  aria-required="true"
                  aria-invalid={errors.lastName ? "true" : "false"}
                />
                {errors.lastName && <span className="error-message" role="alert">{errors.lastName}</span>}
              </div>
            </div>
            
            <div className="two-columns">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="john.smith@example.com"
                  aria-required="true"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <span className="error-message" role="alert">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="1234567890"
                  aria-required="true"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && <span className="error-message" role="alert">{errors.phone}</span>}
              </div>
            </div>
          </div>
        );
        
      case 2: // Dettagli di consegna
        return (
          <div className="delivery-section">
            <h3 className="info-section-title">DELIVERY INFORMATION</h3>
            
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="123 Main St"
                aria-required="true"
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address && <span className="error-message" role="alert">{errors.address}</span>}
            </div>
            
            <div className="two-columns">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                  placeholder="New York"
                  aria-required="true"
                  aria-invalid={errors.city ? "true" : "false"}
                />
                {errors.city && <span className="error-message" role="alert">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="zip">ZIP Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className={errors.zip ? 'error' : ''}
                  placeholder="10001"
                  aria-required="true"
                  aria-invalid={errors.zip ? "true" : "false"}
                />
                {errors.zip && <span className="error-message" role="alert">{errors.zip}</span>}
              </div>
            </div>
            
            <div className="two-columns">
              <div className="form-group">
                <label id="date-label">Delivery Date</label>
                <div className="custom-select-container">
                  <div 
                    className="custom-select-button"
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    role="combobox"
                    aria-expanded={isDateDropdownOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="date-label"
                    tabIndex={0}
                  >
                    <span className="select-icon" aria-hidden="true">🗓</span>
                    <span className="select-text">{getDateLabel(formData.deliveryDate)}</span>
                    <span className="select-arrow" aria-hidden="true">▼</span>
                  </div>
                  
                  {isDateDropdownOpen && (
                    <div 
                      className="custom-select-dropdown" 
                      role="listbox" 
                      aria-labelledby="date-label"
                    >
                      {dateOptions.map((option, index) => (
                        <div 
                          key={index}
                          role="option"
                          aria-selected={formData.deliveryDate === option.value}
                          className={`custom-select-option ${formData.deliveryDate === option.value ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(option.value)}
                          tabIndex={0}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label id="time-label">Delivery Time</label>
                <div className="custom-select-container">
                  <div 
                    className="custom-select-button"
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    role="combobox"
                    aria-expanded={isTimeDropdownOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="time-label"
                    tabIndex={0}
                  >
                    <span className="select-icon" aria-hidden="true">🕔</span>
                    <span className="select-text">{formData.deliveryTime}</span>
                    <span className="select-arrow" aria-hidden="true">▼</span>
                  </div>
                  
                  {isTimeDropdownOpen && (
                    <div 
                      className="custom-select-dropdown time-grid" 
                      role="listbox" 
                      aria-labelledby="time-label"
                    >
                      {timeOptions.map((option, index) => (
                        <div 
                          key={index}
                          role="option"
                          aria-selected={formData.deliveryTime === option.value}
                          className={`custom-select-option ${formData.deliveryTime === option.value ? 'selected' : ''}`}
                          onClick={() => handleTimeSelect(option.value)}
                          tabIndex={0}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Special Instructions (optional)</label>
              <textarea 
                id="notes"
                name="notes" 
                value={formData.notes} 
                onChange={handleChange}
                placeholder="Any special requests for your order..."
                rows="4"
                aria-label="Special instructions or requests"
              />
            </div>
          </div>
        );
        
      case 3: // Pagamento
        return (
          <div className="payment-section">
            <h3 className="info-section-title">PAYMENT METHOD</h3>
            
            <div className="payment-options">
              <label 
                className={`payment-option ${formData.paymentMethod === 'cash' ? 'selected' : ''}`}
                htmlFor="payment-cash"
              >
                <input
                  type="radio"
                  id="payment-cash"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleChange}
                />
                <div className="payment-option-content">
                  <span className="payment-icon" aria-hidden="true">💵</span>
                  <span>Cash on Delivery</span>
                </div>
              </label>
              
              <label 
                className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
                htmlFor="payment-card"
              >
                <input
                  type="radio"
                  id="payment-card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                <div className="payment-option-content">
                  <span className="payment-icon" aria-hidden="true">💳</span>
                  <span>Credit / Debit Card</span>
                </div>
              </label>
            </div>
            
            {formData.paymentMethod === 'card' && (
              <div className="credit-card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={errors.cardNumber ? 'error' : ''}
                    placeholder="1234 5678 9012 3456"
                    aria-required="true"
                    aria-invalid={errors.cardNumber ? "true" : "false"}
                  />
                  {errors.cardNumber && <span className="error-message" role="alert">{errors.cardNumber}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={errors.cardName ? 'error' : ''}
                    placeholder="John Smith"
                    aria-required="true"
                    aria-invalid={errors.cardName ? "true" : "false"}
                  />
                  {errors.cardName && <span className="error-message" role="alert">{errors.cardName}</span>}
                </div>
                
                <div className="two-columns">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiration Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className={errors.cardExpiry ? 'error' : ''}
                      placeholder="MM/YY"
                      aria-required="true"
                      aria-invalid={errors.cardExpiry ? "true" : "false"}
                    />
                    {errors.cardExpiry && <span className="error-message" role="alert">{errors.cardExpiry}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cardCVV">CVV</label>
                    <input
                      type="text"
                      id="cardCVV"
                      name="cardCVV"
                      value={formData.cardCVV}
                      onChange={handleChange}
                      className={errors.cardCVV ? 'error' : ''}
                      placeholder="123"
                      aria-required="true"
                      aria-invalid={errors.cardCVV ? "true" : "false"}
                    />
                    {errors.cardCVV && <span className="error-message" role="alert">{errors.cardCVV}</span>}
                  </div>
                </div>
              </div>
            )}
            
            <div className="form-group privacy-consent">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={errors.privacyConsent ? "true" : "false"}
                />
                <span className="checkmark" aria-hidden="true"></span>
                <span className="consent-text">
                  I agree to the <a href="#" className="privacy-link">Privacy Policy</a> and consent to the processing of my personal data.
                </span>
              </label>
              {errors.privacyConsent && <span className="error-message" role="alert">{errors.privacyConsent}</span>}
            </div>
          </div>
        );
        
      default:
        return null;
    }

  };
  // Trova l'etichetta per un valore di data
  const getDateLabel = (value) => {
    const option = dateOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };
  
  // Se il carrello è vuoto, reindirizza alla pagina del menu
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="empty-checkout">
        <h2 className="subtitle">Your cart is empty</h2>
        <p className="paragraph">Add some dishes before proceeding to checkout.</p>
        <button 
          onClick={() => navigate('/menu')} 
          className="back-to-menu-button"
          aria-label="Go back to menu"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  // Se l'ordine è stato completato con successo
  if (orderPlaced) {
    return (
      <div 
        className="order-success-overlay" 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="order-success-title"
      >
        <div className="order-success-popup">
          <button 
            onClick={closeConfirmation} 
            className="close-button"
            aria-label="Close order confirmation"
          >
            ×
          </button>
          
          <div className="success-icon" aria-hidden="true">✓</div>
          <h2 id="order-success-title" className="subtitle">Order Confirmed!</h2>
          <p className="lead-text">Thank you {formData.firstName} for your order!</p>
          
          <div className="confirmation-details">
            <p className="paragraph">We've sent a confirmation to: <strong>{formData.email}</strong></p>
            <p className="paragraph">
              Your food will be delivered on <strong>{formatDate(formData.deliveryDate)}</strong> at <strong>{formData.deliveryTime}</strong>
            </p>
            <p className="paragraph">
              Delivery address: <strong>{formData.address}, {formData.city}</strong>
            </p>
            
            <div className="order-summary-confirmation">
              <h3 className="card-title">Order Summary:</h3>
              <ul className="order-items-list">
                {cartItems.map(item => (
                  <li key={item.id}>
                    {item.quantity}x {item.title} - ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div className="confirmation-total">
                <span>{formData.paymentMethod === 'cash' ? 'Total due:' : 'Total paid:'}</span>
                <span className="highlight-text">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="contact-info">
              <p className="paragraph">If you need any assistance, please contact us:</p>
              <p className="contact-detail"><strong>Phone:</strong> 003412345678</p>
              <p className="contact-detail"><strong>Email:</strong> Littlelemon@littlelemon.es</p>
            </div>
          </div>
          
          <button 
            onClick={closeConfirmation} 
            className="done-button"
            aria-label="Complete order process and return to homepage"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // Rendering principale
  return (
    <section className="checkout-section">
      <div className="page-container">
        <h1 className="display-title">Checkout</h1>
  
        <CheckoutProgressBar 
          currentStep={currentStep} 
          steps={checkoutSteps} 
        />
  
        <div className="checkout-container-vertical">
          <div className="checkout-close-wrapper">
            <button
              className="close-button"
              onClick={() => navigate('/')}
              aria-label="Close checkout form"
            >
              ×
            </button>
          </div>
  
          <form onSubmit={handleSubmit} className="checkout-form" aria-label="Checkout form">
            {renderStep()}
  
            <div className="checkout-actions">
              {currentStep > 0 && (
                <button 
                  type="button" 
                  onClick={handlePrevStep} 
                  className="back-button"
                  disabled={isProcessing}
                  aria-disabled={isProcessing}
                  aria-label="Go back to previous step"
                >
                  Back
                </button>
              )}
  
              {currentStep === 0 && (
                <button 
                  type="button" 
                  onClick={() => navigate('/menu')} 
                  className="back-button"
                  disabled={isProcessing}
                  aria-disabled={isProcessing}
                  aria-label="Return to menu"
                >
                  Back to Menu
                </button>
              )}
  
              {currentStep < checkoutSteps.length - 1 ? (
                <button 
                  type="button" 
                  onClick={handleNextStep} 
                  className="confirm-button"
                  disabled={isProcessing}
                  aria-disabled={isProcessing}
                  aria-label="Continue to next step"
                >
                  Continue
                </button>
              ) : (
                isProcessing ? (
                  <button 
                    className="confirm-button processing" 
                    disabled
                    aria-disabled="true"
                    aria-label="Processing payment"
                  >
                    <span className="processing-spinner" aria-hidden="true"></span> Processing Payment...
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="confirm-button"
                    aria-label="Confirm order"
                  >
                    Confirm Order
                  </button>
                )
              )}
            </div>  
          </form>
        </div>
      </div>
    </section>
  );
  }
  
  export default CheckoutPage;