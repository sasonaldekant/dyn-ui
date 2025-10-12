import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynDatePicker } from './DynDatePicker';

describe('DynDatePicker', () => {
  it('renders with label', () => {
    render(<DynDatePicker name="test" label="Test Date Picker" />);
    expect(screen.getByLabelText('Test Date Picker')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<DynDatePicker name="test" label="Test" placeholder="Enter date" />);
    expect(screen.getByPlaceholderText('Enter date')).toBeInTheDocument();
  });

  it('handles input changes', () => {
    const handleChange = vi.fn();
    render(<DynDatePicker name="test" label="Test" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '25/12/2023' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('opens calendar dropdown when calendar button is clicked', () => {
    render(<DynDatePicker name="test" label="Test" />);

    const calendarButton = screen.getByLabelText('Abrir calendário');
    fireEvent.click(calendarButton);

    expect(screen.getByText('Hoje')).toBeInTheDocument();
    expect(screen.getByText('Limpar')).toBeInTheDocument();
  });

  it('handles today shortcut', () => {
    const handleChange = vi.fn();
    render(<DynDatePicker name="test" label="Test" onChange={handleChange} />);

    // Open dropdown
    const calendarButton = screen.getByLabelText('Abrir calendário');
    fireEvent.click(calendarButton);

    // Click today
    const todayButton = screen.getByText('Hoje');
    fireEvent.click(todayButton);

    expect(handleChange).toHaveBeenCalled();
  });

  it('handles clear action', () => {
    const handleChange = vi.fn();
    render(
      <DynDatePicker
        name="test"
        label="Test"
        value={new Date()}
        onChange={handleChange}
      />
    );

    // Clear button should be visible
    const clearButton = screen.getByLabelText('Limpar data');
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('handles keyboard navigation', () => {
    render(<DynDatePicker name="test" label="Test" />);

    const input = screen.getByRole('textbox');

    // Enter key should open dropdown
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Hoje')).toBeInTheDocument();

    // Escape should close dropdown
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByText('Hoje')).not.toBeInTheDocument();
  });

  it('prevents interaction when disabled', () => {
    const handleChange = vi.fn();
    render(<DynDatePicker name="test" label="Test" disabled onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    const calendarButton = screen.getByLabelText('Abrir calendário');
    expect(calendarButton).toBeDisabled();
  });

  it('prevents changes when readonly', () => {
    render(<DynDatePicker name="test" label="Test" readonly value={new Date()} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readOnly');

    // Clear button should not be visible in readonly mode
    expect(screen.queryByLabelText('Limpar data')).not.toBeInTheDocument();
  });

  it('displays help text', () => {
    render(<DynDatePicker name="test" label="Test" help="Help text" />);
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<DynDatePicker name="test" label="Test" errorMessage="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    render(<DynDatePicker name="test" label="Test" size="large" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('data-size', 'large');
  });

  it('applies custom className', () => {
    const { container } = render(
      <DynDatePicker name="test" label="Test" className="custom-date" />
    );
    expect(container.querySelector('.custom-date')).toBeInTheDocument();
  });

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(
      <DynDatePicker
        name="test"
        label="Test"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('hides when not visible', () => {
    render(<DynDatePicker name="test" label="Test" visible={false} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
