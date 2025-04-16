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

// ✅ Accetta solo lettere, spazi, apostrofi e trattini
export function validateName(name) {
  const regex = /^[A-Za-zÀ-ÿ\s'-]+$/;
  return regex.test(name.trim());
}

// Funzione di validazione per la City (non solo numeri)
export function validateCity(city) {
  const onlyNumbers = /^\d+$/;
  return city.trim() !== "" && !onlyNumbers.test(city);
}

// Funzione di validazione per indirizzo (non solo numeri)
export function validateAddress(address) {
  const containsLetters = /[A-Za-zÀ-ÿ]/;
  return address.trim() !== "" && containsLetters.test(address);
}

