import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a button by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders as an anchor when href is provided', () => {
    render(<Button href="https://example.com">Link</Button>);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('applies primary variant class by default', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.querySelector('.button--primary')).toBeInTheDocument();
  });

  it('applies secondary variant class when specified', () => {
    const { container } = render(<Button variant="secondary">Click me</Button>);
    expect(container.querySelector('.button--secondary')).toBeInTheDocument();
  });

  it('applies ghost variant class when specified', () => {
    const { container } = render(<Button variant="ghost">Click me</Button>);
    expect(container.querySelector('.button--ghost')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container: smContainer } = render(<Button size="sm">Small</Button>);
    expect(smContainer.querySelector('.button--sm')).toBeInTheDocument();

    const { container: lgContainer } = render(<Button size="lg">Large</Button>);
    expect(lgContainer.querySelector('.button--lg')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders icon when provided', () => {
    const Icon = () => <svg data-testid="test-icon" />;
    render(<Button icon={<Icon />}>With Icon</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders icon on the left by default', () => {
    const { container } = render(
      <Button icon={<span>Icon</span>}>Text</Button>
    );
    const button = container.querySelector('.button');
    const children = button?.children;
    expect(children?.[0]).toHaveClass('button__icon');
  });

  it('renders icon on the right when iconPosition is right', () => {
    const { container } = render(
      <Button icon={<span>Icon</span>} iconPosition="right">
        Text
      </Button>
    );
    const button = container.querySelector('.button');
    const children = button?.children;
    expect(children?.[1]).toHaveClass('button__icon');
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Click me</Button>);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('sets target and rel for external links', () => {
    render(<Button href="https://external.com">External</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not set target for internal links', () => {
    render(<Button href="/internal">Internal</Button>);
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('target');
  });
});

