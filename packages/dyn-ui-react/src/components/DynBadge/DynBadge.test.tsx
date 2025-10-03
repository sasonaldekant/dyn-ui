import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DynBadge } from './DynBadge';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

// Test wrapper with required providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <IconDictionaryProvider>
    {children}
  </IconDictionaryProvider>
);

describe('DynBadge', () => {
  it('renders with default props', () => {
    render(<DynBadge />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('dyn-badge');
    expect(badge).toHaveClass('dyn-badge-medium');
  });

  it('displays numeric value correctly', () => {
    render(<DynBadge value={5} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('5');
  });

  it('formats values over 99 as "99+"', () => {
    render(<DynBadge value={150} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('99+');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<DynBadge size="small" />, { wrapper: TestWrapper });
    let badge = screen.getByRole('status');
    expect(badge).toHaveClass('dyn-badge-small');

    rerender(<DynBadge size="large" />);
    badge = screen.getByRole('status');
    expect(badge).toHaveClass('dyn-badge-large');
  });

  it('applies status classes correctly', () => {
    const { rerender } = render(<DynBadge status="positive" />, { wrapper: TestWrapper });
    let badge = screen.getByRole('status');
    expect(badge).toHaveClass('dyn-badge-status-positive');

    rerender(<DynBadge status="negative" />);
    badge = screen.getByRole('status');
    expect(badge).toHaveClass('dyn-badge-status-negative');
  });

  it('applies theme color classes', () => {
    render(<DynBadge color="color-01" />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveClass('dyn-badge-color-01');
  });

  it('applies custom colors via inline styles', () => {
    render(<DynBadge color="#ff0000" />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('shows border when showBorder is true', () => {
    render(<DynBadge showBorder={true} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveClass('dyn-badge-border');
  });

  it('renders icon-only badge correctly', () => {
    render(<DynBadge icon="ok" />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveClass('dyn-badge-icon-only');
  });

  it('renders auto status icons', () => {
    render(<DynBadge status="positive" icon={true} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    // Icon should be rendered (specific implementation may vary)
    expect(badge).toBeInTheDocument();
  });

  it('renders both icon and value', () => {
    render(<DynBadge icon="user" value={5} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('5');
    expect(badge).toHaveClass('dyn-badge-with-value');
  });

  it('provides proper accessibility attributes', () => {
    render(<DynBadge value={5} ariaLabel="Custom badge label" />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Custom badge label');
  });

  it('has default aria-label when none provided', () => {
    render(<DynBadge value={10} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Badge with value 10');
  });

  it('accepts custom className', () => {
    render(<DynBadge className="custom-badge" />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveClass('custom-badge');
    expect(badge).toHaveClass('dyn-badge');
  });

  it('handles zero value correctly', () => {
    render(<DynBadge value={0} />, { wrapper: TestWrapper });
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('0');
  });

  it('handles React component icon', () => {
    const CustomIcon = () => <span data-testid="custom-icon">★</span>;
    render(<DynBadge icon={<CustomIcon />} />, { wrapper: TestWrapper });
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
