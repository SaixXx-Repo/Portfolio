import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Skills } from './Skills';

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    to: jest.fn(),
    fromTo: jest.fn(),
    set: jest.fn(),
  },
  to: jest.fn(),
  fromTo: jest.fn(),
  set: jest.fn(),
}));

describe('Skills', () => {
  it('renders the skills section', () => {
    render(<Skills />);
    expect(document.getElementById('skills')).toBeInTheDocument();
  });

  it('displays the section title', () => {
    render(<Skills />);
    expect(screen.getByText(/skills & expertise/i)).toBeInTheDocument();
  });

  it('renders category filter buttons', () => {
    render(<Skills />);
    expect(screen.getByText(/all skills/i)).toBeInTheDocument();
    expect(screen.getByText(/frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile/i)).toBeInTheDocument();
    expect(screen.getByText(/languages/i)).toBeInTheDocument();
    expect(screen.getByText(/tools/i)).toBeInTheDocument();
  });

  it('filters skills by category', () => {
    render(<Skills />);
    
    // Click Frontend filter
    fireEvent.click(screen.getByText(/frontend/i));
    
    // Check that React skill is displayed
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders skill bars', () => {
    const { container } = render(<Skills />);
    const skillBars = container.querySelectorAll('.skill-bar');
    expect(skillBars.length).toBeGreaterThan(0);
  });

  it('displays skill names', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Kotlin')).toBeInTheDocument();
  });

  it('renders the tech orbit visualization', () => {
    const { container } = render(<Skills />);
    expect(container.querySelector('.tech-orbit')).toBeInTheDocument();
  });

  it('displays tech stack text in orbit center', () => {
    render(<Skills />);
    expect(screen.getByText(/tech stack/i)).toBeInTheDocument();
  });
});

