import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Help.css';

function Help() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleHelpShortcut = (e) => {
      if (e.altKey && (e.key === '?' || e.key === '/')) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleHelpShortcut);
    return () => window.removeEventListener('keydown', handleHelpShortcut);
  }, []);

  return (
    <>
      <div className="floating-help" onClick={() => setIsOpen(true)}>
        Need Help?
      </div>

      {isOpen && (
        <div className="help-panel">
          <div className="help-panel-header">
            <h3>How can we help you?</h3>
            <button onClick={() => setIsOpen(false)} className="close-help">×</button>
          </div>
          <div className="help-panel-body">
            <p>• To book, fill in all the required fields..</p>
            <p>• For delivery orders, check the address before payment.</p>
            <p>• Having issues? Write to us at: <strong>Littlelemon@littlelemon.es</strong></p>
            <p>Or, call us at: <strong>+34123456789</strong> </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Help;