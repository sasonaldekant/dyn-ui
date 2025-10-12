import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { testAccessibility } from '../../test-utils';
import { DynAvatar } from './DynAvatar';
import styles from './DynAvatar.module.css';

const getImageElement = () =>
  screen.getByTestId('dyn-avatar-image') as HTMLImageElement;

describe('DynAvatar', () => {
  describe('Basic Functionality', () => {
    it('renders with initials when no image provided', () => {
      render(<DynAvatar alt="John Doe" />);

      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'John Doe');
    });

    it('renders with custom initials', () => {
      render(<DynAvatar alt="Test" initials="AB" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('renders image when src provided', async () => {
      const mockSrc = 'https://example.com/avatar.jpg';
      render(<DynAvatar src={mockSrc} alt="User Avatar" />);

      const img = getImageElement();
      expect(img).toHaveAttribute('src', mockSrc);
      expect(img).toHaveAttribute('alt', '');

      fireEvent.load(img);

      await waitFor(() => {
        expect(img).toHaveClass(styles['avatar__image--loaded']);
      });
    });

    it('falls back to initials on image error', async () => {
      render(<DynAvatar src="invalid-url.jpg" alt="John Doe" />);

      const img = getImageElement();
      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynAvatar alt="Accessible avatar" />);
      await testAccessibility(container);
    });

    it('has proper role when non-interactive', () => {
      render(<DynAvatar alt="Profile picture" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Profile picture');
    });

    it('has proper role when interactive', () => {
      render(<DynAvatar alt="Profile picture" onClick={() => {}} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Avatar for Profile picture');
    });

    it('supports custom aria-label', () => {
      render(<DynAvatar alt="Test" aria-label="Custom avatar label" />);
      expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Custom avatar label');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <DynAvatar alt="User" aria-describedby="avatar-description" />
          <div id="avatar-description">Online user avatar</div>
        </>
      );
      expect(screen.getByRole('img')).toHaveAttribute('aria-describedby', 'avatar-description');
    });

    it('announces loading state to screen readers', () => {
      render(<DynAvatar src="loading.jpg" alt="Loading avatar" />);
      expect(screen.getByText('Loading avatar')).toBeInTheDocument();
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      render(<DynAvatar alt="Clickable" onClick={handleClick} />);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn();
      render(<DynAvatar alt="Keyboard nav" onClick={handleClick} />);

      const avatar = screen.getByRole('button');
      avatar.focus();

      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('has proper focus indicators', () => {
      render(<DynAvatar alt="Focusable" onClick={() => {}} />);
      const avatar = screen.getByRole('button');
      avatar.focus();
      expect(avatar).toHaveFocus();
    });

    it('is not interactive without onClick', () => {
      render(<DynAvatar alt="Non-interactive" />);
      const avatar = screen.getByRole('img');

      expect(avatar).not.toHaveAttribute('tabIndex');
      expect(avatar).toHaveAttribute('role', 'img');
    });
  });

  describe('Sizes and Variants', () => {
    it('applies size classes correctly', () => {
      const { rerender } = render(<DynAvatar alt="Test" size="small" />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--small']!);

      rerender(<DynAvatar alt="Test" size="large" />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--large']!);
    });

    it('applies shape classes correctly', () => {
      const { rerender } = render(<DynAvatar alt="Test" shape="square" />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--square']!);

      rerender(<DynAvatar alt="Test" shape="rounded" />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--rounded']!);
    });

    it('applies status classes correctly', () => {
      const { rerender } = render(<DynAvatar alt="Test" status="online" />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--online']!);

      rerender(<DynAvatar alt="Test" status="busy" />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--busy']!);
    });
  });

  describe('Loading and Error States', () => {
    it('shows loading state', () => {
      render(<DynAvatar alt="Loading" loading />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--loading']!);
      expect(screen.getByText('Loading avatar')).toBeInTheDocument();
    });

    it('shows error state', () => {
      render(<DynAvatar alt="Error" error />);
      expect(screen.getByRole('img')).toHaveClass(styles['avatar--error']!);
    });
  });

  describe('Custom Fallback', () => {
    it('renders custom fallback content', () => {
      const customFallback = <span data-testid="custom-fallback">CF</span>;
      render(<DynAvatar alt="Custom" fallback={customFallback} />);
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });
  });

  describe('Image Loading', () => {
    it('sets loading strategy correctly', () => {
      render(<DynAvatar src="test.jpg" alt="Test" imageLoading="lazy" />);
      expect(getImageElement()).toHaveAttribute('loading', 'lazy');
    });

    it('passes through image props', () => {
      render(
        <DynAvatar
          src="test.jpg"
          alt="Test"
          imageProps={{ crossOrigin: 'anonymous' }}
        />
      );
      expect(getImageElement()).toHaveAttribute('crossorigin', 'anonymous');
    });
  });
});
