import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { ReactNode } from 'react';
import { DynBadge } from './DynBadge';
import styles from './DynBadge.module.css';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

type WrapperProps = {
  children: ReactNode;
};

const TestWrapper = ({ children }: WrapperProps) => (
  <IconDictionaryProvider>
    {children}
  </IconDictionaryProvider>
);

describe('DynBadge', () => {
  it('renders with base class and medium size by default', () => {
    const { container } = render(<DynBadge />, { wrapper: TestWrapper });

    const badge = container.querySelector('span');
    expect(badge).toHaveClass(styles.root!);
    expect(badge).toHaveClass(styles.sizeMedium!);
  });

  it('renders children when provided', () => {
    render(<DynBadge>New</DynBadge>, { wrapper: TestWrapper });
    expect(screen.getByRole('status')).toHaveTextContent('New');
  });

  it('displays numeric value when explicitly provided', () => {
    render(<DynBadge value={5} />, { wrapper: TestWrapper });
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('formats values over 99 as "99+"', () => {
    render(<DynBadge value={150} />, { wrapper: TestWrapper });
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender, getByRole } = render(<DynBadge size="small" />, {
      wrapper: TestWrapper,
    });

    expect(getByRole('status')).toHaveClass(styles.sizeSmall!);

    rerender(<DynBadge size="large" />);
    expect(getByRole('status')).toHaveClass(styles.sizeLarge!);
  });

  it('applies status classes correctly', () => {
    const { rerender, getByRole } = render(<DynBadge status="positive" />, {
      wrapper: TestWrapper,
    });

    expect(getByRole('status')).toHaveClass(styles.statusPositive!);

    rerender(<DynBadge status="negative" />);
    expect(getByRole('status')).toHaveClass(styles.statusNegative!);
  });

  it('applies theme color classes', () => {
    const { getByRole } = render(<DynBadge color="color-01" />, {
      wrapper: TestWrapper,
    });

    expect(getByRole('status')).toHaveClass(styles.color01!);
  });

  it('applies custom colors via inline styles', () => {
    const { getByRole } = render(<DynBadge color="#ff0000" />, {
      wrapper: TestWrapper,
    });

    expect(getByRole('status')).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('shows border when showBorder is true', () => {
    const { getByRole } = render(<DynBadge showBorder />, { wrapper: TestWrapper });
    expect(getByRole('status')).toHaveClass(styles.withBorder!);
  });

  it('renders icon-only badge when no value is provided', () => {
    const { getByRole } = render(<DynBadge icon="ok" />, { wrapper: TestWrapper });
    expect(getByRole('status')).toHaveClass(styles.iconOnly!);
  });

  it('renders auto status icons', () => {
    render(<DynBadge status="positive" icon />, { wrapper: TestWrapper });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders both icon and value when provided', () => {
    render(<DynBadge icon="user" value={5} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('5');
    expect(badge).toHaveClass(styles.withValue!);
  });

  it('provides proper accessibility attributes', () => {
    render(
      <DynBadge value={5} ariaLabel="Custom badge label" />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Custom badge label');
  });

  it('generates default aria-label when value is provided', () => {
    render(<DynBadge value={10} />, { wrapper: TestWrapper });
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Badge with value 10');
  });

  it('accepts custom className', () => {
    const { getByRole } = render(<DynBadge className="custom-badge" />, {
      wrapper: TestWrapper,
    });

    expect(getByRole('status')).toHaveClass(styles.root!, 'custom-badge');
  });

  it('handles zero value correctly', () => {
    render(<DynBadge value={0} />, { wrapper: TestWrapper });
    expect(screen.getByRole('status')).toHaveTextContent('0');
  });

  it('handles React component icon', () => {
    const CustomIcon = () => <span data-testid="custom-icon">★</span>;
    render(<DynBadge icon={<CustomIcon />} />, { wrapper: TestWrapper });

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
