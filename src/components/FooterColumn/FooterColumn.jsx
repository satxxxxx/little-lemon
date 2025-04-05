
// src/components/FooterColumn/FooterColumn.jsx
import React from 'react';
import './FooterColumn.css';
import "../../styles/layout.css";

function FooterColumn({ title, children }) {
  // NOTA: Usiamo un frammento quando non abbiamo bisogno di un div aggiuntivo
  return (
    <div className="footer-column">
      {title && <h3 className="footer-column-title">{title}</h3>}
      <div className="footer-column-content">
        {children}
      </div>
    </div>
  );
}

export default FooterColumn;