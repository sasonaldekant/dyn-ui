import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynCheckbox } from './DynCheckbox';

describe('DynCheckbox', () => {
  it('renders with label', () => {
    render(<DynCheckbox name="test" label="Test Checkbox" />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    const { rerender } = render(<DynCheckbox name="test" label="Test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    rerender(<DynCheckbox name="test" label="Test" checked />);
    expect(checkbox).toBeChecked();
  });

  it('handles indeterminate state', () => {
    render(<DynCheckbox name="test" label="Test" indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<DynCheckbox name="test" label="Test" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('handles keyboard navigation', () => {
    const handleChange = vi.fn();
    render(<DynCheckbox name="test" label="Test" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.keyDown(checkbox, { key: ' ' });
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('prevents interaction when disabled', () => {
    const handleChange = vi.fn();
    render(<DynCheckbox name="test" label="Test" disabled onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
    expect(checkbox).toBeDisabled();
  });

  it('prevents interaction when readonly', () => {
    const handleChange = vi.fn();
    render(<DynCheckbox name="test" label="Test" readonly onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('displays help text', () => {
    render(<DynCheckbox name="test" label="Test" help="Help text" />);
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<DynCheckbox name="test" label="Test" errorMessage="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<DynCheckbox name="test" label="Test" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<DynCheckbox name="test" label="Test" size="large" />);
    expect(container.querySelector('[data-size="large"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DynCheckbox name="test" label="Test" className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<DynCheckbox name="test" label="Test" onFocus={handleFocus} onBlur={handleBlur} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.focus(checkbox);
    expect(handleFocus).toHaveBeenCalled();
    
    fireEvent.blur(checkbox);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('sets aria attributes correctly', () => {
    render(<DynCheckbox name="test" label="Test" errorMessage="Error" />);
    const checkbox = screen.getByRole('checkbox');
    
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby', 'test-error');
  });

  it('hides when not visible', () => {
    render(<DynCheckbox name="test" label="Test" visible={false} />);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('handles validation with required prop', async () => {
    render(<DynCheckbox name="test" label="Test" required />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.blur(checkbox);
    // Should show validation error for unchecked required checkbox
    await waitFor(() => expect(checkbox).toHaveAttribute('aria-invalid', 'true'));
  });
});