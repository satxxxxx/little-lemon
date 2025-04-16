/* export function fetchAPI(date) {
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
*/ 
  
export function fetchAPI(date) {
  console.log("✅ Chiamata fetchAPI per:", date);

  const result = [];
  const random = Math.floor(Math.random() * 3) + 1;

  for (let i = 17; i <= 22; i++) {
    if (i % random === 0) {
      const rawTime = `${i.toString().padStart(2, '0')}:00`;

      const [hour, minute] = rawTime.split(":");
      const tempDate = new Date();
      tempDate.setHours(+hour);
      tempDate.setMinutes(+minute);
      const label = tempDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      result.push({ value: rawTime, label });
    }
  }

  console.log("🕒 Slot disponibili restituiti:", result);
  return result;
}

export function submitAPI(formData) {
  console.log("✅ Dati prenotazione inviati con successo:", formData);
  return true;
}
