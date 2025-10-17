import { render, screen, within } from '@testing-library/react';
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
    const root = screen.getByText('Optional Label').closest('label, span')!;

    // Narrow the query to the component root to avoid multiple matches in the entire document
    expect(within(root).getByText('(optional)')).toBeInTheDocument();
    // Or by test id
    expect(within(root).getByTestId('optional-indicator')).toBeInTheDocument();
  });

  it('applies htmlFor attribute', () => {
    render(<DynLabel htmlFor="test-input">Label for Input</DynLabel>);
    const labelElement = screen.getByText('Label for Input').closest('label');
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(<DynLabel className="custom-label">Custom Label</DynLabel>);
    const root = screen.getByText('Custom Label').closest('label, span');
    expect(root).toHaveClass('custom-label');
  });

  it('passes through additional props', () => {
    render(<DynLabel data-testid="custom-label" title="Tooltip">Label with Props</DynLabel>);
    const root = screen.getByTestId('custom-label');
    expect(root).toHaveAttribute('title', 'Tooltip');
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
    render(<DynLabel required optional>Priority Label</DynLabel>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.queryByTestId('optional-indicator')).not.toBeInTheDocument();
  });
});