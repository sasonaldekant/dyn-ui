import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DynButton from './DynButton';

describe('DynButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<DynButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders placeholder text when provided', () => {
    render(<DynButton>DynButton placeholder</DynButton>);
    expect(screen.getByText('DynButton placeholder')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DynButton className="custom-button">Test Button</DynButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-button');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<DynButton onClick={handleClick}>Click Me</DynButton>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('can be disabled', () => {
    render(<DynButton disabled>Disabled Button</DynButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders different variants', () => {
    const { rerender } = render(<DynButton variant="primary">Primary</DynButton>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('dyn-button--primary');

    rerender(<DynButton variant="secondary">Secondary</DynButton>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('dyn-button--secondary');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<DynButton size="small">Small</DynButton>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('dyn-button--small');

    rerender(<DynButton size="large">Large</DynButton>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('dyn-button--large');
  });
});