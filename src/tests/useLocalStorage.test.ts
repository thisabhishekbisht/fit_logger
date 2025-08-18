import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const clearStorage = () => {
  window.localStorage.clear();
};

describe('useLocalStorage hook', () => {
  beforeEach(() => clearStorage());

  it('initializes with no activities', () => {
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.activities).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('adds an activity and persists to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.addActivity({ type: 'Run', duration: 20, date: '2025-01-01', notes: 'Test' });
    });

    expect(result.current.activities.length).toBe(1);

    const stored = JSON.parse(window.localStorage.getItem('activities') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].type).toBe('Run');
  });

  it('deletes an activity', () => {
    const { result } = renderHook(() => useLocalStorage());

    act(() => {
      result.current.addActivity({ type: 'Swim', duration: 30, date: '2025-01-02', notes: '' });
    });

    const id = result.current.activities[0].id;

    act(() => {
      result.current.deleteActivity(id);
    });

    expect(result.current.activities).toEqual([]);
  });
});
