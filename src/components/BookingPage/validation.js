
// Funzione di validazione per l'email
export function validateEmail(email) {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
}

// Funzione di validazione per il numero di telefono
export function validatePhone(phone) {
  return /^\d{9,15}$/.test(phone.replace(/\s+/g, ''));
}

// Funzione di validazione per il numero di ospiti
export function validateGuests(guests) {
  return guests >= 1 && guests <= 10;
}
