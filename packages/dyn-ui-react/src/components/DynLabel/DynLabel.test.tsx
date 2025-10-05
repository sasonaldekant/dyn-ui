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
    expect(screen.getByText('(opcional)')).toBeInTheDocument();
  });

  it('applies htmlFor attribute', () => {
    render(<DynLabel htmlFor="test-input">Label for Input</DynLabel>);
    const label = screen.getByText('Label for Input');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(<DynLabel className="custom-label">Custom Label</DynLabel>);
    expect(screen.getByText('Custom Label')).toHaveClass('custom-label');
  });

  it('passes through additional props', () => {
    render(<DynLabel data-testid="custom-label" title="Tooltip">Label with Props</DynLabel>);
    const label = screen.getByTestId('custom-label');
    expect(label).toHaveAttribute('title', 'Tooltip');
  });

  it('renders as label element when htmlFor is provided', () => {
    render(<DynLabel htmlFor="input">Form Label</DynLabel>);
    const element = screen.getByText('Form Label');
    expect(element.tagName).toBe('LABEL');
  });

  it('renders as span element when htmlFor is not provided', () => {
    render(<DynLabel>Span Label</DynLabel>);
    const element = screen.getByText('Span Label');
    expect(element.tagName).toBe('SPAN');
  });

  it('combines required and optional correctly', () => {
    // Should prioritize required over optional
    render(<DynLabel required optional>Priority Label</DynLabel>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.queryByText('(opcional)')).not.toBeInTheDocument();
  });
});