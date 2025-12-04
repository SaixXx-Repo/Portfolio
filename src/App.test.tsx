import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

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

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.querySelector('.app')).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<App />);
    expect(document.querySelector('.navbar')).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    render(<App />);
    expect(document.getElementById('hero')).toBeInTheDocument();
  });

  it('renders the about section', () => {
    render(<App />);
    expect(document.getElementById('about')).toBeInTheDocument();
  });

  it('renders the projects section', () => {
    render(<App />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });

  it('renders the skills section', () => {
    render(<App />);
    expect(document.getElementById('skills')).toBeInTheDocument();
  });

  it('renders the contact section', () => {
    render(<App />);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('applies theme data attribute to app container', () => {
    render(<App />);
    const app = document.querySelector('.app');
    expect(app).toHaveAttribute('data-theme');
  });
});

