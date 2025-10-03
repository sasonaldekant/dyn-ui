import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DynAvatar from './DynAvatar';
import { AVATAR_SIZES } from '../../types/avatar.types';

describe('DynAvatar', () => {
  it('renders with default props', () => {
    render(<DynAvatar />);
    const avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('dyn-avatar');
    expect(avatar).toHaveClass('dyn-avatar-md');
  });

  it('displays image when src is provided', () => {
    const src = 'https://example.com/avatar.jpg';
    render(<DynAvatar src={src} alt="Test User" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveAttribute('alt', 'Test User');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<DynAvatar size="xs" />);
    let avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toHaveClass('dyn-avatar-xs');

    rerender(<DynAvatar size="xl" />);
    avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toHaveClass('dyn-avatar-xl');
  });

  it('applies correct pixel dimensions for sizes', () => {
    Object.entries(AVATAR_SIZES).forEach(([size, pixelSize]) => {
      const { unmount } = render(<DynAvatar size={size as keyof typeof AVATAR_SIZES} />);
      const placeholder = screen.getByText('👤');
      const parentDiv = placeholder.closest('.dyn-avatar-placeholder');
      expect(parentDiv).toHaveStyle({ width: `${pixelSize}px`, height: `${pixelSize}px` });
      unmount();
    });
  });

  it('generates initials from alt text', () => {
    render(<DynAvatar alt="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('generates single initial from single word', () => {
    render(<DynAvatar alt="Madonna" />);
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('uses custom initials when provided', () => {
    render(<DynAvatar alt="John Doe" initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
    expect(screen.queryByText('JD')).not.toBeInTheDocument();
  });

  it('shows placeholder icon when no alt or initials', () => {
    render(<DynAvatar />);
    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  it('handles image load error by showing initials', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<DynAvatar src="invalid-url.jpg" alt="John Doe" />);
    
    const img = screen.getByRole('img');
    fireEvent.error(img);
    
    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
    
    consoleSpy.mockRestore();
  });

  it('shows loading state initially', () => {
    render(<DynAvatar src="https://example.com/avatar.jpg" alt="John Doe" />);
    
    const avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toHaveClass('dyn-avatar-loading');
  });

  it('removes loading state when image loads', async () => {
    render(<DynAvatar src="https://example.com/avatar.jpg" alt="John Doe" />);
    
    const img = screen.getByRole('img');
    fireEvent.load(img);
    
    await waitFor(() => {
      const avatar = screen.getByRole('img', { hidden: true });
      expect(avatar).not.toHaveClass('dyn-avatar-loading');
    });
  });

  it('applies clickable class when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<DynAvatar onClick={handleClick} />);
    
    const avatar = screen.getByRole('button');
    expect(avatar).toHaveClass('dyn-avatar-clickable');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<DynAvatar onClick={handleClick} />);
    
    const avatar = screen.getByRole('button');
    fireEvent.click(avatar);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes for clickable avatar', () => {
    const handleClick = vi.fn();
    render(<DynAvatar onClick={handleClick} alt="John Doe" />);
    
    const avatar = screen.getByRole('button');
    expect(avatar).toHaveAttribute('aria-label', 'Avatar - John Doe');
    expect(avatar).toHaveAttribute('tabIndex', '0');
  });

  it('has proper accessibility attributes for non-clickable avatar', () => {
    render(<DynAvatar alt="John Doe" />);
    
    const avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toHaveAttribute('aria-label', 'John Doe');
    expect(avatar).not.toHaveAttribute('tabIndex');
  });

  it('applies custom className', () => {
    render(<DynAvatar className="custom-avatar" />);
    
    const avatar = screen.getByRole('img', { hidden: true });
    expect(avatar).toHaveClass('custom-avatar');
    expect(avatar).toHaveClass('dyn-avatar');
  });

  it('handles lazy loading attribute', () => {
    render(<DynAvatar src="https://example.com/avatar.jpg" loading="lazy" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('shows error state styling when image fails', async () => {
    render(<DynAvatar src="invalid-url.jpg" alt="John Doe" />);
    
    const img = screen.getByRole('img');
    fireEvent.error(img);
    
    await waitFor(() => {
      const avatar = screen.getByRole('img', { hidden: true });
      expect(avatar).toHaveClass('dyn-avatar-error');
    });
  });
});