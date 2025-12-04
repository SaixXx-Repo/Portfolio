import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  it('renders the toggle button', () => {
    render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has correct aria-label for light theme', () => {
    render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark theme'
    );
  });

  it('has correct aria-label for dark theme', () => {
    render(<ThemeToggle theme="dark" toggleTheme={mockToggleTheme} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light theme'
    );
  });

  it('calls toggleTheme when clicked', () => {
    render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('renders sun icon elements for light theme', () => {
    const { container } = render(
      <ThemeToggle theme="light" toggleTheme={mockToggleTheme} />
    );
    expect(container.querySelector('.sun-icon')).toBeInTheDocument();
  });

  it('renders moon icon elements for dark theme', () => {
    const { container } = render(
      <ThemeToggle theme="dark" toggleTheme={mockToggleTheme} />
    );
    expect(container.querySelector('.moon-icon')).toBeInTheDocument();
  });
});

