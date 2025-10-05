import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynButton } from './DynButton';

describe('DynButton', () => {
  it('renders button with label', () => {
    render(<DynButton label="Test Button" />);
    expect(screen.getByRole('button')).toHaveTextContent('Test Button');
  });

  it('renders button with correct type', () => {
    render(<DynButton label="Submit" type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<DynButton label="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click when disabled', () => {
    const handleClick = vi.fn();
    render(<DynButton label="Disabled" disabled onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents click when loading', () => {
    const handleClick = vi.fn();
    render(<DynButton label="Loading" loading onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows spinner when loading', () => {
    render(<DynButton label="Loading" loading />);
    expect(screen.getByTestId('dyn-button-spinner')).toBeInTheDocument();
  });

  it('applies correct aria attributes', () => {
    render(
      <DynButton 
        label="Expandable" 
        ariaLabel="Custom label" 
        ariaExpanded={true}
        loading={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('renders icon-only button with default aria-label', () => {
    render(<DynButton icon="add" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Button');
  });

  it('applies custom className', () => {
    render(<DynButton label="Custom" className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('applies correct size class', () => {
    render(<DynButton label="Large" size="large" />);
    expect(screen.getByRole('button')).toHaveClass('button--large');
  });

  it('applies correct kind class', () => {
    render(<DynButton label="Secondary" kind="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');
  });

  it('applies danger class when danger prop is true', () => {
    render(<DynButton label="Danger" danger />);
    expect(screen.getByRole('button')).toHaveClass('button--danger');
  });

  it('handles blur events', () => {
    const handleBlur = vi.fn();
    render(<DynButton label="Blur test" onBlur={handleBlur} />);
    
    fireEvent.blur(screen.getByRole('button'));
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<DynButton ref={ref} label="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('passes through additional props', () => {
    render(<DynButton label="Props test" data-custom="test-value" />);
    expect(screen.getByRole('button')).toHaveAttribute('data-custom', 'test-value');
  });
});