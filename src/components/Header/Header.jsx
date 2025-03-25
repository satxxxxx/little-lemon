import React from "react";
import Navigation from "../Navigation/Navigation.jsx";
import Logo from "../Logo/Logo";
import "./Header.css";
import "../../styles/App.css";
import "../../styles/layout.css";

function Header() {
  return (
    <header className="header">
      <div className="page-container">
        <div className="inner-container header-content">
          <Logo />
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default Header;