/**
 * DynInput Component Tests
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { DynInput } from './DynInput';
import type { ValidationRule } from '../../types/field.types';

// Mock DynIcon component
vi.mock('../DynIcon', () => ({
  DynIcon: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>
}));

describe('DynInput', () => {
  const user = userEvent.setup();

  it('renders correctly with basic props', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        placeholder="Test placeholder"
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('displays initial value', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        value="initial value"
      />
    );

    expect(screen.getByDisplayValue('initial value')).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const handleChange = vi.fn();
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'new value');

    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('shows required indicator when required', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows optional indicator when optional', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        optional
      />
    );

    expect(screen.getByText('(opcional)')).toBeInTheDocument();
  });

  it('displays help text', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        help="This is help text"
      />
    );

    expect(screen.getByText('This is help text')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        errorMessage="This is an error"
      />
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies disabled state correctly', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        disabled
      />
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies readonly state correctly', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        readonly
      />
    );

    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('renders with icon when provided', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        icon="search"
      />
    );

    expect(screen.getByTestId('icon')).toHaveTextContent('search');
  });

  it('shows clean button when showCleanButton is true and has value', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        value="some value"
        showCleanButton
      />
    );

    expect(screen.getByLabelText('Limpar campo')).toBeInTheDocument();
  });

  it('clears input when clean button is clicked', async () => {
    const handleChange = vi.fn();
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        value="some value"
        showCleanButton
        onChange={handleChange}
      />
    );

    const cleanButton = screen.getByLabelText('Limpar campo');
    await user.click(cleanButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('handles focus and blur events', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const input = screen.getByRole('textbox');
    
    await user.click(input);
    expect(handleFocus).toHaveBeenCalled();
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('validates required field', async () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        required
      />
    );

    const input = screen.getByRole('textbox');
    
    // Focus and blur without entering value
    await user.click(input);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const validation: ValidationRule[] = [
      {
        type: 'email',
        message: 'Invalid email format'
      }
    ];

    render(
      <DynInput
        name="test-input"
        label="Email"
        type="email"
        validation={validation}
      />
    );

    const input = screen.getByRole('textbox');
    
    await user.type(input, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });

  it('applies mask formatting', async () => {
    render(
      <DynInput
        name="test-input"
        label="Phone"
        mask="(##) ####-####"
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '11999887766');

    expect(input).toHaveValue('(11) 9998-8776');
  });

  it('handles imperative ref API', () => {
    const ref = React.createRef<any>();
    render(
      <DynInput
        ref={ref}
        name="test-input"
        label="Test Label"
      />
    );

    expect(ref.current).toHaveProperty('focus');
    expect(ref.current).toHaveProperty('validate');
    expect(ref.current).toHaveProperty('clear');
    expect(ref.current).toHaveProperty('getValue');
    expect(ref.current).toHaveProperty('setValue');
  });
});