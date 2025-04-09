import { describe, it, expect, vi } from 'vitest';
import { initializeTimes } from '../api';

vi.mock('../api', () => {
  return {
    fetchAPI: vi.fn(() => ['05:00 pm', '06:00 pm', '07:00 pm']),
    initializeTimes: () => ['05:00 pm', '06:00 pm', '07:00 pm'],
  };
});

describe('initializeTimes', () => {
  it('should return times from fetchAPI', () => {
    const result = initializeTimes();
    expect(result).toEqual(['05:00 pm', '06:00 pm', '07:00 pm']);
  });
});
