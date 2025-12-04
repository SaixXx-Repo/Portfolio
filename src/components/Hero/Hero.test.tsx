import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from './Hero';

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

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);
    expect(document.getElementById('hero')).toBeInTheDocument();
  });

  it('displays the availability badge', () => {
    render(<Hero />);
    expect(screen.getByText(/available for opportunities/i)).toBeInTheDocument();
  });

  it('displays the greeting text', () => {
    render(<Hero />);
    expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero />);
    expect(screen.getByText(/view my work/i)).toBeInTheDocument();
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  it('renders scroll indicator', () => {
    render(<Hero />);
    expect(screen.getByText(/scroll to explore/i)).toBeInTheDocument();
  });

  it('scrolls to about section when scroll indicator is clicked', () => {
    render(<Hero />);
    
    // Create a mock about section
    const aboutSection = document.createElement('div');
    aboutSection.id = 'about';
    document.body.appendChild(aboutSection);
    
    const scrollIndicator = screen.getByText(/scroll to explore/i).closest('.hero__scroll-indicator');
    if (scrollIndicator) {
      fireEvent.click(scrollIndicator);
      expect(aboutSection.scrollIntoView).toHaveBeenCalled();
    }
    
    document.body.removeChild(aboutSection);
  });

  it('renders decorative elements', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('.hero__decorations')).toBeInTheDocument();
  });

  it('renders particle background', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('.hero__particles')).toBeInTheDocument();
    expect(container.querySelectorAll('.particle').length).toBeGreaterThan(0);
  });
});

