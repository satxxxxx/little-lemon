// src/components/Header/Header.jsx
import React from "react";
import Navigation from "../Navigation/Navigation.jsx";
import Logo from "../Logo/Logo";
import "./Header.css";
import "../../styles/App.css";
import "../../styles/layout.css";

function Header({ openLogin, user, onLogout }) {
  // NOTA: Usiamo l'elemento semantico header con il ruolo di "banner" per indicare
  // che questo è l'header principale della pagina
  return (
    <header className="header" role="banner">
      <div className="page-container">
        <div className="inner-container header-content">
          <Logo />
          <Navigation openLogin={openLogin} user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}

export default Header;