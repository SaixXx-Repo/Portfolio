import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { Section } from './common/Section';

expect.extend(toHaveNoViolations);

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

describe('Accessibility Tests', () => {
  describe('ThemeToggle', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <ThemeToggle theme="light" toggleTheme={() => {}} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Button', () => {
    it('should have no accessibility violations for button variant', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations for link variant', async () => {
      const { container } = render(
        <Button href="https://example.com">Visit site</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Card', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Card>
          <h3>Card Title</h3>
          <p>Card content goes here</p>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when clickable', async () => {
      const { container } = render(
        <Card onClick={() => {}}>
          <h3>Clickable Card</h3>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Section', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(
        <Section id="test" title="Test Section" subtitle="A test section">
          <p>Section content</p>
        </Section>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Note: Full App accessibility test can be slow and may have some violations
  // from third-party animation libraries. Run this separately if needed.
  describe('App', () => {
    it('should have no critical accessibility violations', async () => {
      const { container } = render(<App />);
      const results = await axe(container, {
        rules: {
          // Disable some rules that may be triggered by animation elements
          'color-contrast': { enabled: true },
          'region': { enabled: false }, // Animation elements may not be in regions
        },
      });
      
      // Filter out minor violations
      const criticalViolations = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      );
      
      expect(criticalViolations).toHaveLength(0);
    });
  });
});

describe('Keyboard Navigation', () => {
  it('ThemeToggle is focusable', () => {
    const { container } = render(
      <ThemeToggle theme="light" toggleTheme={() => {}} />
    );
    const button = container.querySelector('button');
    button?.focus();
    expect(document.activeElement).toBe(button);
  });

  it('Button is focusable', () => {
    render(<Button>Focus me</Button>);
    const button = document.querySelector('button');
    button?.focus();
    expect(document.activeElement).toBe(button);
  });

  it('Interactive Card has correct role', () => {
    const { container } = render(
      <Card onClick={() => {}}>
        <p>Click me</p>
      </Card>
    );
    const card = container.querySelector('[role="button"]');
    expect(card).toBeInTheDocument();
  });
});

describe('Screen Reader Support', () => {
  it('ThemeToggle has descriptive aria-label', () => {
    const { rerender, container } = render(
      <ThemeToggle theme="light" toggleTheme={() => {}} />
    );
    expect(container.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark theme'
    );

    rerender(<ThemeToggle theme="dark" toggleTheme={() => {}} />);
    expect(container.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Switch to light theme'
    );
  });

  it('Disabled Button is marked as disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(document.querySelector('button')).toBeDisabled();
  });
});

