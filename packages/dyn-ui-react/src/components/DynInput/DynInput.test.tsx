/**
 * DynInput Component Tests
 * Standardized to follow DynAvatar pattern with Vitest and vitest-axe
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynInput } from './DynInput';
import styles from './DynInput.module.css';

expect.extend(toHaveNoViolations);

// Mock DynIcon component
vi.mock('../DynIcon', () => ({
  DynIcon: ({ icon }: { icon: string }) => <span data-testid="icon">{icon}</span>
}));

const classes = styles as Record<string, string>;

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

  it('has no accessibility violations', async () => {
    const { container } = render(<DynInput name="a" label="A" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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

  it('applies disabled and readonly state classes', async () => {
    const { rerender } = render(
      <DynInput name="i" label="L" disabled />
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input.className).toContain(classes['input--disabled']);

    rerender(<DynInput name="i" label="L" readonly />);
    const ro = screen.getByRole('textbox');
    expect(ro).toHaveAttribute('readonly');
    expect(ro.className).toContain(classes['input--readonly']);
  });

  it('renders with icon and clear button states', () => {
    const { rerender } = render(
      <DynInput name="t" label="L" icon="search" />
    );

    const input = screen.getByRole('textbox');
    expect(input.className).toContain(classes['input--with-icon']);

    rerender(
      <DynInput name="t" label="L" value="x" showClearButton />
    );

    const input2 = screen.getByRole('textbox');
    expect(input2.className).toContain(classes['input--clearable']);
  });

  it('shows clear button and clears on click', async () => {
    const handleChange = vi.fn();
    render(
      <DynInput
        name="test-input"
        label="Test Label"
        value="some value"
        showClearButton
        onChange={handleChange}
      />
    );

    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('handles focus and blur events and toggles focused class', async () => {
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
    expect(input.className).toContain(classes['input--focused']);

    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('displays error message and aria-invalid', async () => {
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
});
