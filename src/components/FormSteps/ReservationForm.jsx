// src/components/FormSteps/ReservationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';
import '../../styles/ReservationForm.css';



const formatToAMPM = (timeStr) => {
  if (!timeStr) return '';
  if (typeof timeStr === 'object' && timeStr.label) return timeStr.label;
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(+hour);
  date.setMinutes(+minute);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

function ReservationForm({ availableTimes, updateTimes, onSubmit }) {
  const navigate = useNavigate();
  // Step labels per la progress bar
  const steps = ["Personal Information", "Reservation Details", "Confirmation"];

  // Stato per tracciare lo step corrente
  const [currentStep, setCurrentStep] = useState(0);

  // Stato per tutti i campi del form

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: availableTimes[0] || '17:00',
    guests: 1,
    occasion: 'Nessuna',  // "Nessuna" indica nessuna occasione selezionata
    notes: '',
    privacyConsent: false
  });

  // Stato per messaggi di errore di validazione
  const [errors, setErrors] = useState({});

  // Stati per controllare l'apertura dei menu a tendina personalizzati
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // Stato per mostrare la finestra di conferma (riepilogo) e quella di successo finale
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessingReservation, setIsProcessingReservation] = useState(false);

  

  // Genera le opzioni per i prossimi 7 giorni (etichetta leggibile e valore ISO per confronti)
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

  // Trova etichetta leggibile per una data (usato per mostrare la data formattata)
  const getDateLabel = (value) => {
    const option = dateOptions.find(opt => opt.value === value);
    return option ? option.label : "Select date";
  };

  // Gestore generale per campi di input/testo/select (aggiorna formData e pulisce eventuali errori)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) {
      // Rimuove il messaggio di errore associato al campo se l'utente modifica il valore
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Gestore per la selezione di una data dal menu a tendina personalizzato
  const handleDateSelect = (selectedDate) => {
    setFormData({
      ...formData,
      date: selectedDate
    });
    updateTimes(selectedDate);  // Aggiorna gli orari disponibili in base alla data selezionata
    setIsDateDropdownOpen(false);
    // Rimuove eventuale errore sulla data
    if (errors.date) {
      setErrors({ ...errors, date: null });
    }
  };

  // Gestore per la selezione di un orario dal menu a tendina personalizzato o dai pulsanti
  const handleTimeSelect = (selectedTime) => {
    setFormData({
      ...formData,
      time: selectedTime
    });
    setIsTimeDropdownOpen(false);
    // Rimuove eventuale errore sull'orario (in questo caso non strettamente necessario, l'orario ha sempre un valore)
  };

  // Funzione di validazione per lo step corrente. Ritorna true se tutti i campi dello step sono validi.
  const validateCurrentStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      // Validazione Step 1: informazioni personali
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
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{9,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else if (currentStep === 1) {
      // Validazione Step 2: dettagli prenotazione
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
      // (Nota: `time` non è verificato qui perché viene sempre impostato di default e aggiornato con la data)
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avanza allo step successivo se i dati correnti sono validi
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Torna allo step precedente
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Mostra la finestra di conferma riepilogativa (step di conferma)
  const handleShowConfirmation = () => {
    // Avvia la visualizzazione della finestra riepilogativa
    setShowConfirmation(true);
  };

  // Conferma definitiva della prenotazione (chiamato quando si preme "Confirm Reservation" nel riepilogo)
  const confirmBooking = async () => {
    setIsProcessingReservation(true); // 🔄 Mostra lo spinner
  
    try {
      // 🔽 Simula un piccolo ritardo per mostrare lo spinner (es. 1.5 secondi)
      await new Promise((resolve) => setTimeout(resolve, 1500));
  
      await onSubmit(formData);       // ⏱️ Attendi l’invio dati
      setShowConfirmation(false);     // ✅ Chiudi il riepilogo
      setOrderPlaced(true);           // 🎉 Mostra conferma finale
    } catch (error) {
      console.error("Errore durante la prenotazione:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessingReservation(false); // 🧹 Nascondi lo spinner in ogni caso
    }
  };

  // Chiude il messaggio di conferma finale e resetta il form (chiamato quando si preme "Done" o la X di chiusura)
  const closeConfirmation = () => {
    // Resetta tutti i dati del form allo stato iniziale
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      time: availableTimes[0] || '17:00',
      guests: 1,
      occasion: 'Nessuna',
      notes: '',
      privacyConsent: false
    });
    setErrors({});
    setOrderPlaced(false);
    setCurrentStep(0);
  };

  // Formatta una data in formato leggibile completo (usato per il messaggio finale di conferma)
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

  // **Render delle diverse viste in base allo stato**
  // Schermata di successo (overlay finale con messaggio di conferma e bottone "Done")
  if (orderPlaced) {
    return (
    <>
    <CheckoutProgressBar steps={steps} currentStep={currentStep} />
      <div className="order-success-overlay" role="dialog" aria-modal="true" aria-labelledby="reservation-success-title">
        <div className="order-success-popup">
          <button 
            onClick={closeConfirmation} 
            className="close-button" 
            aria-label="Close reservation confirmation"
          >
            &times;
          </button>
          <div className="success-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="12" r="12" fill="#495E57" />
              <path d="M17 7l-7.5 8L7 11" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          <h2 className="confirmation-title" id="reservation-success-title">Reservation Confirmed!</h2>

          <p className="lead-text">
            Thank you {formData.firstName} for your reservation!
          </p>
          <div className="confirmation-details">
            <p className="paragraph">
              We've sent a confirmation to: <strong>{formData.email}</strong>
            </p>
            <p className="paragraph">
              Your table is reserved for <strong>{formatDate(formData.date)}</strong> at <strong>{formatToAMPM(formData.time)}</strong>.
            </p>
            <p className="paragraph">
              Number of guests: <strong>{formData.guests}</strong>
              {formData.occasion !== 'Nessuna' && `, Occasion: ${formData.occasion}`}
            </p>
          </div>
          <button onClick={closeConfirmation} className="done-button">
            Done
          </button>
        </div>
      </div>
    </div>
    </>
    );
  }

  // Finestra di conferma (riepilogo) prima di finalizzare la prenotazione
  if (showConfirmation) {
    return (
    <>
    <CheckoutProgressBar steps={steps} currentStep={currentStep} />
    <div className="booking-container-vertical">
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
              <span className="detail-value">{formatToAMPM(formData.time)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Guests:</span>
              <span className="detail-value">{formData.guests}</span>
            </div>
            {formData.occasion !== 'Nessuna' && (
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
            <div className="assistance-section">
            <p>If you need any assistance, please contact us:</p>
           <div className="contact-detail">
              <p><strong>Phone:</strong> 00341234567</p>
              <p><strong>Email:</strong> Littlelemon@littlelemon.es</p>
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

            {isProcessingReservation ? (
            <button 
              type="button"
              className="confirm-button processing"
              disabled
              aria-disabled="true"
              aria-label="Processing reservation"
            >
              <span className="processing-spinner" aria-hidden="true"></span>
              Processing...
            </button>
          ) : (
            <button 
              type="button" 
              className="confirm-button"
              onClick={confirmBooking}
            >
              Confirm Reservation
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
    </>
    );
  }

  // Contenuto principale del form (step 0, 1, 2) con progress bar e campi
  return (
    <>
    <CheckoutProgressBar steps={steps} currentStep={currentStep} />
    
      {/* Barra di progresso */}

      {/* Step 1: Informazioni personali */}
      {
  currentStep === 0 && (
    <div className="reservation-form-wrapper">
      <div className="form-section-green">
        <button
                    className="close-button"
                    onClick={() => navigate(-1)}
                    aria-label="Close reservation form"
                  >
                    ×
                  </button>
                  <div className="reservation-form-header">
                  <h2 className="info-section-title">PERSONAL INFORMATION</h2>
                  </div>
                    <div className="two-columns">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className={errors.firstName ? 'error' : ''}
                          aria-required="true"
                          aria-invalid={errors.firstName ? "true" : "false"}
                          autoFocus={currentStep === 0}
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
                          placeholder="Doe"
                          className={errors.lastName ? 'error' : ''}
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
                          placeholder="john@example.com"
                          className={errors.email ? 'error' : ''}
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
                          placeholder="0123456789"
                          className={errors.phone ? 'error' : ''}
                          aria-required="true"
                          aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.phone && <span className="error-message" role="alert">{errors.phone}</span>}
                      </div>
                    </div>
                  
      </div>
      <div className="form-section-white" style={{ display: "flex", justifyContent: "space-between" }}>
  <div></div> {/* Spazio occupato da "Back" */}
          <button 
            type="button" 
            className="continue-button"
            onClick={handleNextStep}
          >
            Continue
          </button>
        </div>
            </div>
          )
        }

      {/* Step 2: Dettagli della prenotazione */}
      {currentStep === 1 && (
        <div className="reservation-form-card">
          <button
            className="close-button"
            onClick={() => navigate(-1) || navigate('/')}
            aria-label="Close reservation form"
          >
            ×
          </button>
          <div className="reservation-form-header">
            <h2>INFORMATION DETAILS</h2>
          </div>
          <div className="reservation-form-body">
            <div className="two-columns">
              {/* Selezione Data */}
              <div className="form-group">
                <label id="date-label" htmlFor="date">Reservation Date</label>
                <div className="custom-select-container">
                  <div 
                    className="custom-select-button"
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    role="combobox"
                    aria-labelledby="date-label"
                    aria-expanded={isDateDropdownOpen}
                    aria-haspopup="listbox"
                    tabIndex={0}
                  >
                    <span className="select-icon" aria-hidden="true">🗓</span>
                    <span className="select-text">{formData.date ? getDateLabel(formData.date) : "Select date"}</span>
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
                          className={`custom-select-option ${formData.date === option.value ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(option.value)}
                          role="option"
                          aria-selected={formData.date === option.value}
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
              {/* Selezione Orario */}
              <div className="form-group">
                <label id="time-label" htmlFor="time">Reservation Time</label>
                <div className="custom-select-container">
                  <div 
                    className="custom-select-button"
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    role="combobox"
                    aria-labelledby="time-label"
                    aria-expanded={isTimeDropdownOpen}
                    aria-haspopup="listbox"
                    tabIndex={0}
                  >
                    <span className="select-icon" aria-hidden="true">🕒</span>
                    <span className="select-text">{formatToAMPM(formData.time)}</span>
                    <span className="select-arrow" aria-hidden="true">▼</span>
                  </div>
                  {isTimeDropdownOpen && (
                    <div 
                      className="custom-select-dropdown"
                      role="listbox"
                      aria-labelledby="time-label"
                    >
                      {availableTimes.map((timeOption, index) => (
  <div 
    key={index}
    className={`custom-select-option ${formData.time === timeOption.value ? 'selected' : ''}`}
    onClick={() => handleTimeSelect(timeOption.value)}
    role="option"
    aria-selected={formData.time === timeOption.value}
    tabIndex={0}
  >
    {timeOption.label}
  </div>
))}
                    </div>
                  )}
                </div>
                {/* Nota: Non è previsto errore specifico per l'orario, quindi niente messaggio qui */}
              </div>
            </div>
            <div className="two-columns">
              <div className="form-group">
                <label htmlFor="occasion">Occasion</label>
                <select 
                  id="occasion" 
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  aria-label="Select an occasion"
                >
                  <option value="Nessuna">None</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="guests">Number of guests</label>
                <input 
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="10"
                  value={formData.guests}
                  onChange={handleChange}
                  className={errors.guests ? 'error' : ''}
                  aria-required="true"
                  aria-invalid={errors.guests ? "true" : "false"}
                />
                {errors.guests && <span className="error-message" role="alert">{errors.guests}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="notes">Special Instructions (optional)</label>
              <textarea 
                id="notes"
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="When you arrive..."
                aria-label="Special instructions or notes for your reservation"
              />
            </div>
            <div className="form-group checkbox-group">
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

            {/* Sezione di suggerimento di orari disponibili come pulsanti (stessa lista di availableTimes) */}
            <div className="available-slots">
              <h3 id="available-slots-heading">Available Booking Slots</h3>
              {availableTimes.length > 0 ? (
                <div 
                  className="slots-container"
                  role="radiogroup"
                  aria-labelledby="available-slots-heading"
                >
                  {availableTimes.map(({ value, label }) => (
  <div 
    key={value}
    className={`slot ${formData.time === value ? 'selected' : ''}`}
    onClick={() => handleTimeSelect(value)}
    role="radio"
    aria-checked={formData.time === value}
    tabIndex={formData.time === value ? 0 : -1}
  >
    {label}
    <span className="slot-button" aria-hidden="true">Select</span>
  </div>
))}
                </div>
              ) : (
                <p className="highlight-text">⚠️ No available times for the selected date.</p>
              )}
            </div>
          </div>
          <div className="reservation-form-actions">
            <button 
              type="button" 
              className="back-button"
              onClick={handlePrevStep}
            >
              Back
            </button>
            <button 
              type="button" 
              className="continue-button"
              onClick={handleNextStep}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: (Lo step 3 visuale è gestito tramite il riepilogo in modale, quindi qui non renderizziamo un card separato) */}
      {
  currentStep === 2 && (
    <div className="reservation-form-wrapper">
      <div className="form-section-green">
        <button
                    className="close-button"
                    onClick={() => navigate(-1)}
                    aria-label="Close reservation form"
                  >
                    ×
                  </button>
                  <div className="reservation-form-header">
                    <h2>RESERVATION CONFIRMATION</h2>
                  </div>
                  <div className="reservation-form-body">
                    {/* I dettagli della prenotazione verranno mostrati nella finestra di conferma (modale) */}
                    <p style={{ textAlign: 'center' }}>Please review your reservation details in the next window.</p>
                  </div>
      </div>
      <div className="form-section-white">
  <button 
    type="button" 
    className="back-button"
    onClick={handlePrevStep}
    disabled={isProcessingReservation}
    aria-disabled={isProcessingReservation}
  >
    Back
  </button>

  {isProcessingReservation ? (
    <button 
      className="continue-button processing" 
      disabled
      aria-disabled="true"
    >
      <span className="processing-spinner" aria-hidden="true"></span> Processing...
    </button>
  ) : (
    <button 
      type="button" 
      className="continue-button"
      onClick={handleShowConfirmation}
    >
      Continue
    </button>
  )}
</div>
    </div>
  )
}
    
    </>
  );
}

export default ReservationForm;