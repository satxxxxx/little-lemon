import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from '../components/BookingPage/BookingForm';
import '@testing-library/jest-dom';
const renderForm = () => {
  render(
    <BookingForm
      availableTimes={['05:00 pm', '06:00 pm', '07:00 pm']}
      updateTimes={() => {}}
      onSubmit={() => {}}
    />
  );
};
// PARTE 1: Test per gli attributi di validazione HTML5
describe('BookingForm - Validazione HTML5', () => {
  it('il campo firstName ha gli attributi di validazione corretti', () => {
    renderForm();
    const firstNameInput = screen.getByLabelText(/first name/i);
    expect(firstNameInput).toHaveAttribute('required');
    expect(firstNameInput).toHaveAttribute('minLength', '3');
    expect(firstNameInput).toHaveAttribute('type', 'text');
  });
  it('il campo lastName ha gli attributi di validazione corretti', () => {
    renderForm();
    const lastNameInput = screen.getByLabelText(/last name/i);
    expect(lastNameInput).toHaveAttribute('aria-required', 'true');
    expect(lastNameInput).toHaveAttribute('type', 'text');
  });
  it('il campo email ha gli attributi di validazione corretti', () => {
    renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
  });
  it('il campo telefono ha gli attributi di validazione corretti', () => {
    renderForm();
    const phoneInput = screen.getByLabelText(/phone/i);
    expect(phoneInput).toHaveAttribute('required');
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });
});
// PARTE 2: Test per i pulsanti di navigazione
describe('BookingForm - Navigazione', () => {
  it('il form ha un pulsante Continue', () => {
    renderForm();
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
  });
  it('il pulsante Continue fa avanzare al secondo step', () => {
    renderForm();
    
    // Compila i campi obbligatori
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    
    // Clicca su Continue
    fireEvent.click(screen.getByText('Continue'));
    
    // Verifica che appaia un elemento presente solo nel secondo step
    const guestsInput = screen.getByLabelText(/guests/i);
    expect(guestsInput).toBeInTheDocument();
  });
  it('il secondo step ha un pulsante Back', () => {
    renderForm();
    
    // Compila i campi obbligatori del primo step
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    
    // Vai al secondo step
    fireEvent.click(screen.getByText('Continue'));
    
    // Verifica che ci sia il pulsante Back
    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
  });
});
// PARTE 3: Test per la validazione JavaScript
describe('BookingForm - Validazione JavaScript', () => {
  it('impedisce l\'avanzamento se i campi obbligatori sono vuoti', () => {
    renderForm();
    
    // Clicca su Continue senza compilare nessun campo
    fireEvent.click(screen.getByText('Continue'));
    
    // Verifica che siamo ancora nel primo step (non siamo avanzati)
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByLabelText(/guests/i)).not.toBeInTheDocument();
  });
  
  it('impedisce l\'avanzamento se l\'email non è valida', () => {
    renderForm();
    
    // Compila tutti i campi tranne l'email
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    
    // Clicca su Continue
    fireEvent.click(screen.getByText('Continue'));
    
    // Verifica che siamo ancora nel primo step
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByLabelText(/guests/i)).not.toBeInTheDocument();
  });
  
  it('consente l\'avanzamento se tutti i campi sono validi', () => {
    renderForm();
    
    // Compila tutti i campi correttamente
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    
    // Clicca su Continue
    fireEvent.click(screen.getByText('Continue'));
    
    // Invece di cercare "Reservation Details" che appare in più posti, cerchiamo "Available Time Slots"
    expect(screen.getByText('Available Time Slots')).toBeInTheDocument();
  });
});

