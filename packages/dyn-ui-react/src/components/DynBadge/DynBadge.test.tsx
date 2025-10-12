import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynBadge } from './DynBadge';
import styles from './DynBadge.module.css';

const classes = styles as Record<string, string>;

describe('DynBadge', () => {
  describe('Basic Functionality', () => {
    it('renders badge with text content', () => {
      render(<DynBadge>New</DynBadge>);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByTestId('dyn-badge')).toBeInTheDocument();
    });

    it('renders count badges correctly', () => {
      render(<DynBadge count={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows maxCount+ when count exceeds maximum', () => {
      render(<DynBadge count={150} maxCount={99} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('hides badge when count is 0 and showZero is false', () => {
      const { container } = render(<DynBadge count={0} />);
      expect(container.firstChild).toBeNull();
    });

    it('shows badge when count is 0 and showZero is true', () => {
      render(<DynBadge count={0} showZero />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders with count prop', () => {
      render(<DynBadge count={7} />);
      expect(screen.getByText('7')).toBeInTheDocument();
      expect(screen.getByTestId('dyn-badge')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('announces count to screen readers', () => {
      render(<DynBadge count={3} countDescription="Notifications" />);
      expect(screen.getByText('Notifications: 3')).toBeInTheDocument();
    });

    it('has aria-live for dynamic counts', () => {
      render(<DynBadge count={5} />);
      expect(screen.getByTestId('dyn-badge')).toHaveAttribute('aria-live', 'polite');
    });

    it('supports custom aria-label', () => {
      render(<DynBadge ariaLabel="Status indicator">Active</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveAttribute('aria-label', 'Status indicator');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <DynBadge ariaDescribedBy="badge-description">Status</DynBadge>
          <div id="badge-description">Current user status</div>
        </>
      );
      expect(screen.getByTestId('dyn-badge')).toHaveAttribute('aria-describedby', 'badge-description');
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events when clickable', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<DynBadge onClick={handleClick}>Clickable</DynBadge>);

      const badge = screen.getByRole('button');
      expect(badge).toHaveAttribute('tabIndex', '0');

      await user.click(badge);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<DynBadge onClick={handleClick}>Keyboard</DynBadge>);

      const badge = screen.getByRole('button');
      badge.focus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('is not interactive without onClick', () => {
      render(<DynBadge>Non-interactive</DynBadge>);
      const badge = screen.getByTestId('dyn-badge');

      expect(badge).not.toHaveAttribute('role', 'button');
      expect(badge).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Variants and Colors', () => {
    it('applies variant classes correctly', () => {
      const { rerender } = render(<DynBadge variant="solid">Solid</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--solid']!);

      rerender(<DynBadge variant="soft">Soft</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--soft']!);

      rerender(<DynBadge variant="outline">Outline</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--outline']!);
    });

    it('applies color classes correctly', () => {
      const { rerender } = render(<DynBadge color="primary">Primary</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--primary']!);

      rerender(<DynBadge color="danger">Danger</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--danger']!);

      rerender(<DynBadge color="success">Success</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--success']!);
    });

    it('applies size classes correctly', () => {
      const { rerender } = render(<DynBadge size="small">Small</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--small']!);

      rerender(<DynBadge size="large">Large</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--large']!);
    });

    it('renders dot variant correctly', () => {
      render(<DynBadge variant="dot" color="danger" />);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--dot']!);
    });
  });

  describe('Icons', () => {
    it('renders start icon', () => {
      render(
        <DynBadge startIcon={<span data-testid="start-icon">🔥</span>}>
          Hot
        </DynBadge>
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders end icon', () => {
      render(
        <DynBadge endIcon={<span data-testid="end-icon">→</span>}>
          Next
        </DynBadge>
      );
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    it('applies position classes correctly', () => {
      render(<DynBadge position="topRight">Positioned</DynBadge>);
      const badge = screen.getByTestId('dyn-badge');
      expect(badge).toHaveClass(classes['badge--positioned']!);
      expect(badge).toHaveClass(classes['badge--topRight']!);
    });
  });

  describe('Animation', () => {
    it('applies animated class when animated prop is true', () => {
      render(<DynBadge animated>Animated</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--animated']!);
    });

    it('applies pulse class when pulse prop is true', () => {
      render(<DynBadge pulse>Pulsing</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass(classes['badge--pulse']!);
    });
  });
});
