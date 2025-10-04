/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynButton } from './DynButton';

describe('DynButton', () => {
  it('exports a React component', () => {
    expect(typeof DynButton).toBe('function');
  });

  it('renders with text', () => {
    render(<DynButton>Click me</DynButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<DynButton onClick={handleClick}>Click me</DynButton>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies size classes', () => {
    const { container } = render(<DynButton size="large">Test</DynButton>);
    expect(container.firstChild).toHaveClass('dyn-button--large');
  });

  it('applies kind classes', () => {
    const { container } = render(<DynButton kind="primary">Test</DynButton>);
    expect(container.firstChild).toHaveClass('dyn-button--primary');
  });

  it('shows loading state', () => {
    const { container } = render(<DynButton loading>Test</DynButton>);
    expect(container.firstChild).toHaveClass('dyn-button--loading');
  });

  it('is disabled when disabled prop is true', () => {
    render(<DynButton disabled>Test</DynButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});