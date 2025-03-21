import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa ReactDOM
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import ContentArea from '../components/ContentArea/ContentArea';
import Footer from '../components/Footer/Footer';
import '../styles/index.css'; // o qualsiasi CSS globale

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)