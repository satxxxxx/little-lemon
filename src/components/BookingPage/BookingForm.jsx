// src/components/BookingPage/BookingForm.jsx
import React, { useState } from 'react';
import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';
import '../../styles/CheckoutPage.css'; // Usa lo stesso file CSS del checkout

function BookingForm({ availableTimes, updateTimes, onSubmit }) {
  // NOTA: Usa 3 step invece di 4
  const bookingSteps = ["Personal Info", "Reservation Details", "Confirmation"];
  
  // NOTA: Stato per tenere traccia del passo corrente
  const [currentStep, setCurrentStep] = useState(0);
  
  // NOTA: Stato per tutti i dati del form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: availableTimes[0] || '05:00 pm',
    guests: 1,
    occasion: 'Birthday',
    notes: '',
    privacyConsent: false
  });
  
  // NOTA: Stati aggiuntivi per UI e validazione
  const [errors, setErrors] = useState({});
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  
  // IMPORTANTE: Questi stati devono essere definiti qui, all'inizio, e non possono dipendere da condizioni o essere settati indirettamente
  // MODIFICATO: Ora definito come stato indipendente
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // NOTA: Funzione per generare le opzioni di data
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      
      options.push({
        value: date.toISOString().split('T')[0],
        label: formattedDate
      });
    }
    
    return options;
  };
  
  const dateOptions = generateDateOptions();
  
  // NOTA: Gestori eventi per l'aggiornamento dei dati del form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // NOTA: Gestori per la selezione di data e ora
  const handleDateSelect = (selectedDate) => {
    setFormData({
      ...formData,
      date: selectedDate
    });
    updateTimes(selectedDate); // Aggiorna gli orari disponibili in base alla data
    setIsDateDropdownOpen(false);
  };
  
  const handleTimeSelect = (selectedTime) => {
    setFormData({
      ...formData,
      time: selectedTime
    });
    setIsTimeDropdownOpen(false);
  };
  
  // NOTA: Validazione del form in base allo step corrente
  const validateCurrentStep = () => {
    const newErrors = {};
    
    switch(currentStep) {
      case 0: // Dati personali
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
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
        
      case 1: // Dettagli prenotazione
        if (!formData.date) {
          newErrors.date = 'Please select a date';
        }
        
        if (!formData.guests || formData.guests < 1) {
          newErrors.guests = 'Number of guests must be at least 1';
        } else if (formData.guests > 10) {
          newErrors.guests = 'For parties larger than 10, please call us directly';
        }
        
        if (!formData.privacyConsent) {
          newErrors.privacyConsent = 'You must accept the privacy policy';
        }
        break;
        
      case 2: // Nessuna validazione aggiuntiva per lo step di conferma
        // Lo step di conferma non ha validazioni aggiuntive
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // NOTA: Funzioni di navigazione tra gli step
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // MODIFICATO: Funzione handleShowConfirmation per focus sul mostrare la modale
  const handleShowConfirmation = () => {
    console.log("Showing confirmation modal");
    // MODIFICATO: Forza l'aggiornamento dello stato
    setShowConfirmation(true);
    
    // AGGIUNTO: Forza un re-render attraverso un timeout se necessario
    setTimeout(() => {
      if (!showConfirmation) {
        setShowConfirmation(true);
      }
    }, 50);
  };
  
  // NOTA: Gestione della conferma prenotazione
  const confirmBooking = () => {
    onSubmit(formData);
    setShowConfirmation(false);
    setOrderPlaced(true);
  };
  
  // NOTA: Reset del form dopo la prenotazione
  const closeConfirmation = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      time: availableTimes[0] || '05:00 pm',
      guests: 1,
      occasion: 'Birthday',
      notes: '',
      privacyConsent: false
    });
    
    setCurrentStep(0);
    setOrderPlaced(false);
  };
  
  // NOTA: Funzioni helper per formattare i dati
  const getDateLabel = (value) => {
    const option = dateOptions.find(opt => opt.value === value);
    return option ? option.label : "Select date";
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // IMPORTANTE: Controllo primario su orderPlaced e showConfirmation
  // Questi return statements prendono la precedenza e vengono renderizzati se le condizioni sono vere
  
  // NOTA: Schermata di successo - RIMOSSO BLOCCO INFORMAZIONI DI CONTATTO
  if (orderPlaced) {
    return (
      <div className="order-success-overlay" role="dialog" aria-modal="true" aria-labelledby="reservation-success-title">
        <div className="order-success-popup">
          <button 
            onClick={closeConfirmation} 
            className="close-button"
            aria-label="Close reservation confirmation"
          >
            Ã—
          </button>
          
          <div className="success-icon" aria-hidden="true">âœ“</div>
          <h2 className="subtitle" id="reservation-success-title">Reservation Confirmed!</h2>
          <p className="lead-text">Thank you {formData.firstName} for your reservation!</p>
          
          <div className="confirmation-details">
            <p className="paragraph">We've sent a confirmation to: <strong>{formData.email}</strong></p>
            <p className="paragraph">
              Your table is reserved for <strong>{formatDate(formData.date)}</strong> at <strong>{(formData.time)}</strong>
            </p>
            <p className="paragraph">
              Number of guests: <strong>{formData.guests}</strong>
              {formData.occasion !== 'None' && `, Occasion: ${formData.occasion}`}
            </p>
          </div>
          
          <button onClick={closeConfirmation} className="done-button">
            Done
          </button>
        </div>
      </div>
    );
  }
  
  // NOTA: Modale di conferma - MANTENUTO IL BLOCCO DI INFORMAZIONI DI CONTATTO
  // MODIFICATO: Controllato che questa sezione funzioni correttamente
  if (showConfirmation) {
    console.log("Rendering confirmation modal");
    return (
      <div className="confirmation-overlay" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
        <div className="confirmation-modal">
          <div className="confirmation-header">
            <h2 id="confirmation-title">Reservation Summary</h2>
          </div>
          
          <div className="confirmation-body">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{formData.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{formData.phone}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{getDateLabel(formData.date)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Time:</span>
              <span className="detail-value">{(formData.time)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Guests:</span>
              <span className="detail-value">{formData.guests}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Occasion:</span>
              <span className="detail-value">{formData.occasion}</span>
            </div>
            {formData.notes && (
              <div className="detail-row">
                <span className="detail-label">Notes:</span>
                <span className="detail-value">{formData.notes}</span>
              </div>
            )}
          </div>
          
          <div className="subtotal-section">
            <p>If you need any assistance, please contact us:</p>
            <div className="contact-detail">
              <span>Phone:</span> 00341234567
            </div>
            <div className="contact-detail">
              <span>Email:</span> Littlelemon@littlelemon.es
            </div>
          </div>
          
          <div className="confirmation-actions">
            <button 
              type="button" 
              className="back-button"
              onClick={() => setShowConfirmation(false)}
            >
              Back
            </button>
            <button 
              type="button" 
              className="continue-button"
              onClick={confirmBooking}
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // NOTA: Renderizzazione dei passi del form
  const renderStep = () => {
    switch (currentStep) {
      case 0: // Dati personali
        return (
          <div className="info-section">
            <h3 className="info-section-title">Personal Information</h3>
            
            <div className="two-columns">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                  <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  minLength={3}
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
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.smith@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                {errors.email && <span className="error-message" role="alert">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                {errors.phone && <span className="error-message" role="alert">{errors.phone}</span>}
              </div>
            </div>
          </div>
        );
        
      case 1: // Dettagli prenotazione
        return (
          <div className="info-section">
            <h3 className="info-section-title">Reservation Details</h3>
            
            <div className="two-columns">
              <div className="form-group">
                <label htmlFor="date">Reservation Date</label>
                <div className="custom-select-container">
                  <div 
                    className="custom-select-button"
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    role="combobox"
                    aria-expanded={isDateDropdownOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="date-label"
                    aria-required="true"
                    tabIndex={0}
                    aria-controls="date-listbox"
                  >
                    <span className="select-icon" aria-hidden="true">ðŸ—“</span>
                    <span className="select-text">{formData.date ? getDateLabel(formData.date) : "Select date"}</span>
                    <span className="select-arrow" aria-hidden="true">â–¼</span>
                  </div>
                  
                  {isDateDropdownOpen && (
                    <div 
                      className="custom-select-dropdown" 
                      role="listbox" 
                      id="date-listbox"
                      aria-labelledby="date-label"
                    >
                      {dateOptions.map((option, index) => (
                        <div 
                          key={index}
                          role="option"
                          aria-selected={formData.date === option.value}
                          className={`custom-select-option ${formData.date === option.value ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(option.value)}
                          tabIndex={0}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.date && <span className="error-message" role="alert">{errors.date}</span>}
              </div>
              
              <div className="form-group">
                <label id="time-label" htmlFor="time">Reservation Time</label>
                <div className="custom-select-container">
                  <div 
                    className="custom-select-button"
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    role="combobox"
                    aria-expanded={isTimeDropdownOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="time-label"
                    aria-required="true"
                    tabIndex={0}
                    aria-controls="time-listbox"
                  >
                    <span className="select-icon" aria-hidden="true">ðŸ•‘</span>
                    <span className="select-text">{(formData.time)}</span>
                    <span className="select-arrow" aria-hidden="true">â–¼</span>
                  </div>
                  <div style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
                    <label htmlFor="test-date">Date</label>
                     <label htmlFor="test-date" style={{ display: 'none' }}>Date</label>
                    <input
                      type="date"
                      name="date"
                      id="test-date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {isTimeDropdownOpen && (
                  <div 
                    className="custom-select-dropdown"
                    role="listbox"
                    id="time-listbox"
                    aria-labelledby="time-label"
                  >
                    {availableTimes.map((timeOption, index) => (
                      <div 
                        key={index}
                        role="option"
                        aria-selected={formData.time === timeOption}
                        className={`custom-select-option ${formData.time === timeOption ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(timeOption)}
                        tabIndex={0}
                      >
                        {timeOption}
                      </div>
                    ))}
                  </div>
                )}
                </div>
                {errors.time && <span className="error-message" role="alert">{errors.time}</span>}
              </div>
            </div>
            
            <div className="two-columns">
              <div className="form-group">
              <label htmlFor="guests">Guests</label>
               <input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  aria-label="Guests"
                />

                {errors.guests && <span className="error-message" role="alert">{errors.guests}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="occasion">Occasion</label>
                <select 
                  id="occasion" 
                  name="occasion"
                  value={formData.occasion} 
                  onChange={handleChange}
                  aria-label="Select occasion"
                >
                  <option value="None">None</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Special Instructions (optional)</label>
              <textarea 
                id="notes"
                name="notes" 
                value={formData.notes} 
                onChange={handleChange}
                placeholder="Let us know if you have any special requests..."
                rows="4"
                aria-label="Special instructions or requests"
              />
            </div>
            
            {/* NOTA: Sezione slot temporali */}
            <div className="available-slots-section" aria-labelledby="available-slots-title">
              <h3 id="available-slots-title">Available Time Slots</h3>
              <div className="slots-container" role="radiogroup" aria-label="Available time slots">
                {availableTimes.map(timeOption => (
                  <div 
                    key={timeOption} 
                    className={`slot ${formData.time === timeOption ? 'selected' : ''}`}
                    onClick={() => setFormData({...formData, time: timeOption})}
                    role="radio"
                    aria-checked={formData.time === timeOption}
                    tabIndex={formData.time === timeOption ? 0 : -1}
                  >
                    {(timeOption)}
                    <span className="slot-button" aria-hidden="true">Select</span>
                  </div>
                ))}
              </div>
            </div>
            
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
        
      case 2: // Conferma - RIMOSSO BLOCCO INFORMAZIONI DI CONTATTO
        return (
          <div className="info-section">
            <h3 className="info-section-title">Review Your Reservation</h3>
            
            <div className="confirmation-details">
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{formData.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{formData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value highlight">{getDateLabel(formData.date)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Time:</span>
                <span className="detail-value highlight">{(formData.time)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Guests:</span>
                <span className="detail-value">{formData.guests}</span>
              </div>
              {formData.occasion !== 'None' && (
                <div className="detail-row">
                  <span className="detail-label">Occasion:</span>
                  <span className="detail-value">{formData.occasion}</span>
                </div>
              )}
              {formData.notes && (
                <div className="detail-row">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value">{formData.notes}</span>
                </div>
              )}
            </div>
            
            {/* RIMOSSO IL BLOCCO DELLE INFORMAZIONI DI CONTATTO */}
          </div>
        );
    }
  };
  
  // NOTA: Struttura IDENTICA a CheckoutPage
  return (
    <section className="checkout-section">
  <div className="page-container">
    <h1 className="display-title">Reserve a Table</h1>

    <CheckoutProgressBar 
      currentStep={currentStep} 
      steps={bookingSteps} 
    />

    <form onSubmit={handleSubmit} aria-label="Modulo di prenotazione" noValidate>
      {/* Nome */}
      <label htmlFor="firstName">Nome</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        aria-required="true"
      />
      {/* Cognome */}
      <label htmlFor="lastName">Cognome</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        aria-required="true"
        aria-describedby="emailHelp"
      />
      <small id="emailHelp">L’indirizzo email verrà usato per confermare la prenotazione.</small>
      {/* Telefono */}
      <label htmlFor="phone">Telefono</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      {/* Data */}
      <label htmlFor="date">Data</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      {/* Orario */}
      <label htmlFor="time">Orario</label>
      <select
        id="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      {/* Numero ospiti */}
      <label htmlFor="guests">Numero di ospiti</label>
      <input
        type="number"
        id="guests"
        name="guests"
        value={formData.guests}
        onChange={handleChange}
        min="1"
        max="10"
      />
      {/* Occasione */}
      <label htmlFor="occasion">Occasione</label>
      <select
        id="occasion"
        name="occasion"
        value={formData.occasion}
        onChange={handleChange}
      >
        <option value="Birthday">Compleanno</option>
        <option value="Anniversary">Anniversario</option>
        <option value="Other">Altro</option>
      </select>
      {/* Note aggiuntive */}
      <label htmlFor="notes">Note aggiuntive</label>
      <textarea
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows="4"
        aria-label="Note per la prenotazione"
      />
      {/* Consenso privacy */}
      <div>
        <input
          type="checkbox"
          id="privacyConsent"
          name="privacyConsent"
          checked={formData.privacyConsent}
          onChange={handleChange}
          required
        />
        <label htmlFor="privacyConsent">
          Accetto la <a href="/privacy">privacy policy</a>
        </label>
      </div>
      {/* Pulsante */}
      <button type="submit" aria-label="Invia la prenotazione">
        Prenota ora
      </button>
    </form>
      </div>
    </section>
  );
}

export default BookingForm;