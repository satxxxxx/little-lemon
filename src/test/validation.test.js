
import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone, validateGuests } from '../components/BookingPage/validation';

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('john@example.com')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validateEmail('johnexample.com')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('should return true for valid phone number', () => {
    expect(validatePhone('123456789')).toBe(true);
  });

  it('should return false for invalid phone number', () => {
    expect(validatePhone('abc')).toBe(false);
  });
});

describe('validateGuests', () => {
  it('should return true for guests between 1 and 10', () => {
    expect(validateGuests(5)).toBe(true);
  });

  it('should return false for guests less than 1', () => {
    expect(validateGuests(0)).toBe(false);
  });

  it('should return false for guests more than 10', () => {
    expect(validateGuests(11)).toBe(false);
  });
});
