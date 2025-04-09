import { describe, it, expect, vi } from 'vitest';

// Supponiamo che updateTimes funzioni così:
function updateTimes(date, dispatch) {
  dispatch({ type: 'UPDATE_TIMES', payload: date });
}

describe('updateTimes', () => {
  it('should dispatch the correct action with selected date', () => {
    const mockDispatch = vi.fn();
    const selectedDate = '2023-07-20';

    updateTimes(selectedDate, mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_TIMES',
      payload: selectedDate,
    });
  });
});