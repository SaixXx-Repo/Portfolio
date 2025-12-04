import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useTheme', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('returns default light theme when no preference is stored', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('light');
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
  });

  it('toggles theme from dark to light', () => {
    localStorageMock.setItem('portfolio-theme', 'dark');
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('dark');
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
  });

  it('persists theme to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(localStorageMock.getItem('portfolio-theme')).toBe('dark');
  });

  it('reads theme from localStorage on mount', () => {
    localStorageMock.setItem('portfolio-theme', 'dark');
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('dark');
  });

  it('sets data-theme attribute on document', () => {
    const { result } = renderHook(() => useTheme());
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('provides a stable toggleTheme function', () => {
    const { result, rerender } = renderHook(() => useTheme());
    const firstToggle = result.current.toggleTheme;
    
    rerender();
    
    expect(result.current.toggleTheme).toBe(firstToggle);
  });
});

