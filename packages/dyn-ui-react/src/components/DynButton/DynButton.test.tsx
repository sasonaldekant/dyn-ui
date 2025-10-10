import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import DynButton from './DynButton';
import styles from './DynButton.module.css';

const classes = styles as Record<string, string>;

describe('DynButton', () => {
  it('renders the provided label and applies default styling', () => {
    render(<DynButton label="Save" />);

    const button = screen.getByTestId('dyn-button');
    expect(button).toHaveTextContent('Save');
    expect(button).toHaveClass(classes.root);
    expect(button).toHaveClass(classes.kindPrimary);
    expect(button).toHaveClass(classes.sizeMedium);
  });

  it('fires onClick handler when enabled', () => {
    const onClick = vi.fn();
    render(<DynButton label="Click" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled or loading', () => {
    const onClick = vi.fn();

    const { rerender } = render(
      <DynButton label="Disabled" disabled onClick={onClick} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));
    expect(onClick).not.toHaveBeenCalled();

    rerender(<DynButton label="Loading" loading onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Loading' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders icon buttons with accessible label', () => {
    render(<DynButton icon="download" ariaLabel="Download file" />);

    const button = screen.getByRole('button', { name: 'Download file' });
    expect(button).toHaveClass(classes.iconOnly);
    expect(button.querySelector(`.${classes.icon}`)).toBeInTheDocument();
  });

  it('shows loading spinner and accessibility state', () => {
    render(<DynButton label="Submitting" loading />);

    const button = screen.getByRole('button', { name: 'Submitting' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button.querySelector(`.${classes.spinner}`)).toBeInTheDocument();
  });

  it('applies danger styling for destructive actions', () => {
    render(<DynButton label="Delete" kind="secondary" danger />);

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass(classes.danger);
    expect(button).toHaveClass(classes.kindSecondary);
  });
});
