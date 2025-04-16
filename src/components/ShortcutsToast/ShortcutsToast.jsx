import React, { useEffect, useState } from "react";
import "./ShortcutsToast.css";

function ShortcutsToast() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log("ShortcutsToast montato!");
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="shortcuts-toast">
      ✨ Usa le scorciatoie: <strong>Alt + H</strong> → Home | <strong>Alt + M</strong> → Menu | <strong>Alt + R</strong> → Prenotazione | <strong>Alt + C</strong> → Checkout | <strong>Alt + /</strong> → Aiuto
    </div>
  );
}

export default ShortcutsToast;