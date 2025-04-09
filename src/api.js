export function fetchAPI(date) {
    console.log("✅ Chiamata fetchAPI per:", date);
  
    // Logica fittizia per simulare slot disponibili
    const result = [];
    const random = Math.floor(Math.random() * 3) + 1;
  
    for (let i = 17; i <= 22; i++) {
      if (i % random === 0) {
        result.push(`${i.toString().padStart(2, '0')}:00`);
      }
    }
  
    console.log("🕒 Slot disponibili restituiti:", result);
    return result;
  }
  
  export function submitAPI(formData) {
    console.log("✅ Dati prenotazione inviati con successo:", formData);
    return true;
  }