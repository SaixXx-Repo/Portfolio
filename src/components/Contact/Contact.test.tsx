import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact', () => {
  it('renders the contact section', () => {
    render(<Contact />);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('displays the section title', () => {
    render(<Contact />);
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
  });

  it('renders contact form', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Contact />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Contact />);
    expect(screen.getByText(/github/i)).toBeInTheDocument();
    expect(screen.getByText(/linkedin/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });

  it('allows user to fill out the form', () => {
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/your email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });
    
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message.');
  });

  it('clears form after submission', async () => {
    // Mock window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/your name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/your email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello!' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    }, { timeout: 2000 });
    
    alertMock.mockRestore();
  });

  it('displays copyright in footer', () => {
    render(<Contact />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('renders contact details', () => {
    render(<Contact />);
    expect(screen.getByText(/location/i)).toBeInTheDocument();
  });
});

