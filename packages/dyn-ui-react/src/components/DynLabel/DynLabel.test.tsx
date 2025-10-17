import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynLabel } from './DynLabel';

describe('DynLabel', () => {
  it('renders children text', () => {
    render(<DynLabel>Test Label</DynLabel>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<DynLabel required>Required Label</DynLabel>);
    expect(screen.getByText('Required Label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows optional indicator', () => {
    render(<DynLabel optional>Optional Label</DynLabel>);
    expect(screen.getByText('Optional Label')).toBeInTheDocument();
    
    // Use custom text matcher to handle text broken up by multiple elements
    const element = screen.getByText((_content, element) => {
      return Boolean(element && element.textContent && element.textContent.includes('(optional)'));
    });
    expect(element).toBeInTheDocument();
    
    // Alternative: test by data-testid
    expect(screen.getByTestId('optional-indicator')).toBeInTheDocument();
  });

  it('applies htmlFor attribute', () => {
    render(<DynLabel htmlFor="test-input">Label for Input</DynLabel>);
    
    // Find the label element that contains the text and check its htmlFor
    const labelElement = screen.getByText('Label for Input').closest('label');
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(<DynLabel className="custom-label">Custom Label</DynLabel>);
    
    // The className is applied to the label/span element, not the text span
    const element = screen.getByText('Custom Label').closest('span, label');
    expect(element).toHaveClass('custom-label');
  });

  it('passes through additional props', () => {
    render(<DynLabel data-testid="custom-label" title="Tooltip">Label with Props</DynLabel>);
    const label = screen.getByTestId('custom-label');
    expect(label).toHaveAttribute('title', 'Tooltip');
  });

  it('renders as label element when htmlFor is provided', () => {
    render(<DynLabel htmlFor="input">Form Label</DynLabel>);
    const element = screen.getByText('Form Label').closest('label');
    expect(element).toBeTruthy();
    expect(element?.tagName).toBe('LABEL');
  });

  it('renders as span element when htmlFor is not provided', () => {
    render(<DynLabel>Span Label</DynLabel>);
    const element = screen.getByText('Span Label').closest('span');
    expect(element).toBeTruthy();
    expect(element?.tagName).toBe('SPAN');
  });

  it('combines required and optional correctly', () => {
    // Should prioritize required over optional
    render(<DynLabel required optional>Priority Label</DynLabel>);
    expect(screen.getByText('*')).toBeInTheDocument();
    
    // Check that optional indicator is NOT present when required is true
    expect(screen.queryByTestId('optional-indicator')).not.toBeInTheDocument();
  });
});