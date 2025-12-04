import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders the projects section', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });

  it('displays the section title', () => {
    render(<Projects />);
    expect(screen.getByText(/featured projects/i)).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(<Projects />);
    expect(screen.getByText(/all projects/i)).toBeInTheDocument();
    expect(screen.getByText(/android apps/i)).toBeInTheDocument();
    expect(screen.getByText(/react projects/i)).toBeInTheDocument();
  });

  it('filters projects by category', () => {
    render(<Projects />);
    
    // Click Android filter
    fireEvent.click(screen.getByText(/android apps/i));
    
    // Should show Android projects
    const projectCards = document.querySelectorAll('.project-card');
    expect(projectCards.length).toBeGreaterThan(0);
  });

  it('shows all projects when "All Projects" filter is selected', () => {
    render(<Projects />);
    
    // First filter to Android
    fireEvent.click(screen.getByText(/android apps/i));
    
    // Then back to All
    fireEvent.click(screen.getByText(/all projects/i));
    
    const projectCards = document.querySelectorAll('.project-card');
    expect(projectCards.length).toBeGreaterThanOrEqual(6);
  });

  it('renders project cards with titles', () => {
    render(<Projects />);
    expect(screen.getByText(/fittrack pro/i)).toBeInTheDocument();
    expect(screen.getByText(/taskflow/i)).toBeInTheDocument();
  });

  it('renders project technology tags', () => {
    render(<Projects />);
    expect(screen.getAllByText(/kotlin/i).length).toBeGreaterThan(0);
  });

  it('renders GitHub link button', () => {
    render(<Projects />);
    expect(screen.getByText(/view all on github/i)).toBeInTheDocument();
  });
});

