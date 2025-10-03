/**
 * DynInput Component Tests
 * Part of DYN UI Form Components Group - SCOPE 6
 */

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

  it('validates minimum length', async () => {
    const validation: ValidationRule[] = [
      {
        type: 'minLength',
        value: 5,
        message: 'Minimum 5 characters required'
      }
    ];

    render(
      <DynInput
        name="test-input"
        label="Test Label"
        validation={validation}
      />
    );

    const input = screen.getByRole('textbox');
    
    await user.type(input, '123');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Minimum 5 characters required')).toBeInTheDocument();
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

  it('handles number type correctly', async () => {
    const handleChange = vi.fn();
    render(
      <DynInput
        name="test-input"
        label="Age"
        type="number"
        onChange={handleChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '25');

    expect(handleChange).toHaveBeenLastCalledWith(25);
  });

  it('respects maxLength attribute', async () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        maxLength={5}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '5');
  });

  it('handles different size variants', () => {
    const { rerender } = render(
      <DynInput
        name="test-input"
        label="Test Label"
        size="small"
      />
    );

    expect(screen.getByRole('textbox')).toHaveClass('dyn-input--small');

    rerender(
      <DynInput
        name="test-input"
        label="Test Label"
        size="large"
      />
    );

    expect(screen.getByRole('textbox')).toHaveClass('dyn-input--large');
  });

  it('hides component when visible is false', () => {
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        visible={false}
      />
    );

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('supports custom validation with async validator', async () => {
    const validation: ValidationRule[] = [
      {
        type: 'custom',
        message: 'Username already exists',
        validator: async (value: string) => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return value !== 'taken';
        }
      }
    ];

    render(
      <DynInput
        name="test-input"
        label="Username"
        validation={validation}
      />
    );

    const input = screen.getByRole('textbox');
    
    await user.type(input, 'taken');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Username already exists')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
