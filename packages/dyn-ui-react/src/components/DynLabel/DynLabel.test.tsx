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
    
    // Use data-testid to avoid multiple element matching issues
    expect(screen.getByTestId('optional-indicator')).toBeInTheDocument();
    
    // Verify the text content is correct
    const optionalElement = screen.getByTestId('optional-indicator');
    expect(optionalElement).toHaveTextContent('(optional)');
  });

  it('applies htmlFor attribute', () => {
    render(<DynLabel htmlFor="test-input">Label for Input</DynLabel>);
    const labelElement = screen.getByText('Label for Input').closest('label');
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(<DynLabel className="custom-label" data-testid="test-label">Custom Label</DynLabel>);
    const labelElement = screen.getByTestId('test-label');
    expect(labelElement).toHaveClass('custom-label');
  });

  it('passes through additional props', () => {
    render(<DynLabel data-testid="custom-label" title="Tooltip">Label with Props</DynLabel>);
    const label = screen.getByTestId('custom-label');
    expect(label).toHaveAttribute('title', 'Tooltip');
  });

  it('renders as label element when htmlFor is provided', () => {
    render(<DynLabel htmlFor="input" data-testid="form-label">Form Label</DynLabel>);
    const element = screen.getByTestId('form-label');
    expect(element.tagName).toBe('LABEL');
  });

  it('renders as span element when htmlFor is not provided', () => {
    render(<DynLabel data-testid="span-label">Span Label</DynLabel>);
    const element = screen.getByTestId('span-label');
    expect(element.tagName).toBe('SPAN');
  });

  it('combines required and optional correctly', () => {
    // Should prioritize required over optional
    render(<DynLabel required optional>Priority Label</DynLabel>);
    expect(screen.getByText('*')).toBeInTheDocument();
    
    // Check that optional indicator is NOT present when required is true
    expect(screen.queryByTestId('optional-indicator')).not.toBeInTheDocument();
  });
});
