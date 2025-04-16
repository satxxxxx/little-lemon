// src/components/Login/Login.jsx
import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import './Login.css';

function Login({ isOpen, onClose, onLogin }) {
  // NOTA: Stati per i campi del form e la validazione
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  // NOTA: Flag per i requisiti della password
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false
  });
  
  // NOTA: Controlla i requisiti della password ogni volta che cambia
  useEffect(() => {
    const password = formData.password;
    setPasswordChecks({
      length: password.length >= 7,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  }, [formData.password]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Rimuove l'errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validazione email
    if (!formData.email.trim()) {
      newErrors.email = "Email obbligatoria";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Inserisci un'email valida";
    }
    
    // Validazione password
    if (!formData.password.trim()) {
      newErrors.password = "Password obbligatoria";
    } else {
      // Controlla tutti i requisiti della password
      if (!passwordChecks.length) {
        newErrors.password = "La password deve contenere almeno 7 caratteri";
      } else if (!passwordChecks.uppercase) {
        newErrors.password = "La password deve contenere almeno una lettera maiuscola";
      } else if (!passwordChecks.number) {
        newErrors.password = "La password deve contenere almeno un numero";
      } else if (!passwordChecks.symbol) {
        newErrors.password = "La password deve contenere almeno un carattere speciale";
      }
    }
    
    // Validazione reCAPTCHA
    if (!captchaVerified) {
      newErrors.captcha = "Verifica di non essere un robot";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Se la validazione passa, chiama la funzione onLogin passata dal componente genitore
      onLogin(formData.email, formData.password);
    }
  };
  
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
    // Rimuove l'errore del captcha se esiste
    if (errors.captcha) {
      setErrors({
        ...errors,
        captcha: null
      });
    }
  };
  
  // Se il modale non è aperto, non renderizzare nulla
  if (!isOpen) return null;
  
  return (
    // NOTA: Aggiunto role="dialog" e altri attributi ARIA per il modale
    <div 
      className="login-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="login-title"
    >
      <div className="login-modal">
        <button 
          className="close-login-button" 
          onClick={onClose}
          aria-label="Close login form"
        >
          ×
        </button>
        
        <h2 id="login-title" className="login-title">Login</h2>
        
        <form aria-label="Modulo di login" noValidate onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="tuaemail@esempio.com"
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoFocus
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>
          
          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(formData.password.length > 0)}
              className={errors.password ? 'error' : ''}
              placeholder="La tua password"
              aria-required="true"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error password-requirements" : "password-requirements"}
            />
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
            
            {/* NOTA: Checklist dei requisiti della password con attributi ARIA */}
            {passwordFocused && (
              <div id="password-requirements" className="password-requirements" aria-live="polite">
                <p className="requirements-title">La password deve avere:</p>
                <ul className="requirements-list">
                  <li className={passwordChecks.length ? 'met' : 'unmet'}>
                    Almeno 7 caratteri
                  </li>
                  <li className={passwordChecks.uppercase ? 'met' : 'unmet'}>
                    Almeno 1 lettera maiuscola
                  </li>
                  <li className={passwordChecks.number ? 'met' : 'unmet'}>
                    Almeno 1 numero
                  </li>
                  <li className={passwordChecks.symbol ? 'met' : 'unmet'}>
                    Almeno 1 carattere speciale (es. !@#$%)
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* NOTA: Componente reCAPTCHA con attributi ARIA */}
          <div className="recaptcha-container" aria-live="polite">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
              onChange={handleCaptchaChange}
              aria-required="true"
            />
            {errors.captcha && (
              <span id="captcha-error" className="error-message" role="alert">
                {errors.captcha}
              </span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            aria-label="Login to your account"
          >
            Accedi
          </button>
        </form>
        
        <div className="login-footer">
          <p>Non hai un account? <a href="#register">Registrati</a></p>
          <p><a href="#forgot-password">Password dimenticata?</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;