import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynAvatar } from './DynAvatar';

describe('DynAvatar', () => {
  it('renders with default props', () => {
    render(<DynAvatar alt="Test Avatar" />);
    expect(screen.getByTestId('dyn-avatar')).toBeInTheDocument();
    expect(screen.getByText('TA')).toBeInTheDocument(); // Generated initials
  });

  it('renders with provided initials', () => {
    render(<DynAvatar initials="JD" alt="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<DynAvatar src="test-image.jpg" alt="Test Image" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Image');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<DynAvatar size="sm" alt="Small Avatar" />);
    const avatar = screen.getByTestId('dyn-avatar');
    expect(avatar.className).toMatch(/_avatar--sm_/);
    
    rerender(<DynAvatar size="lg" alt="Large Avatar" />);
    expect(avatar.className).toMatch(/_avatar--lg_/);
  });

  it('handles click events when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<DynAvatar alt="Clickable Avatar" onClick={handleClick} />);
    
    const avatar = screen.getByTestId('dyn-avatar');
    expect(avatar).toHaveAttribute('role', 'button');
    expect(avatar).toHaveAttribute('tabIndex', '0');
    
    fireEvent.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<DynAvatar alt="Keyboard Avatar" onClick={handleClick} />);
    
    const avatar = screen.getByTestId('dyn-avatar');
    
    fireEvent.keyDown(avatar, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(avatar, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
    
    fireEvent.keyDown(avatar, { key: 'Escape' });
    expect(handleClick).toHaveBeenCalledTimes(2); // Should not trigger
  });

  it('does not have interactive attributes when onClick is not provided', () => {
    render(<DynAvatar alt="Static Avatar" />);
    
    const avatar = screen.getByTestId('dyn-avatar');
    expect(avatar).not.toHaveAttribute('role');
    expect(avatar).not.toHaveAttribute('tabIndex');
  });

  it('handles image load error', () => {
    render(<DynAvatar src="invalid-image.jpg" alt="Error Avatar" initials="EA" />);
    
    const image = screen.getByAltText('Error Avatar');
    fireEvent.error(image);
    
    // Should show initials as fallback
    expect(screen.getByText('EA')).toBeInTheDocument();
  });

  it('generates initials from alt text', () => {
    render(<DynAvatar alt="John Doe Smith" />);
    expect(screen.getByText('JD')).toBeInTheDocument(); // First two initials
  });

  it('applies custom className', () => {
    render(<DynAvatar alt="Custom" className="custom-avatar" />);
    expect(screen.getByTestId('dyn-avatar')).toHaveClass('custom-avatar');
  });

  it('passes through additional props', () => {
    render(<DynAvatar alt="Data Avatar" data-custom="test-value" />);
    expect(screen.getByTestId('dyn-avatar')).toHaveAttribute('data-custom', 'test-value');
  });

  it('sets correct aria-label for clickable avatar', () => {
    render(<DynAvatar alt="User Avatar" onClick={() => {}} />);
    expect(screen.getByTestId('dyn-avatar')).toHaveAttribute('aria-label', 'Avatar - User Avatar');
  });

  it('sets correct aria-label for non-clickable avatar', () => {
    render(<DynAvatar alt="User Avatar" />);
    expect(screen.getByTestId('dyn-avatar')).toHaveAttribute('aria-label', 'User Avatar');
  });

  it('applies loading class when image is loading', () => {
    render(<DynAvatar src="loading-image.jpg" alt="Loading Avatar" />);
    const avatar = screen.getByTestId('dyn-avatar');
    expect(avatar.className).toMatch(/_avatar--loading_/);
  });

  it('applies clickable class when onClick is provided', () => {
    render(<DynAvatar alt="Clickable" onClick={() => {}} />);
    const avatar = screen.getByTestId('dyn-avatar');
    expect(avatar.className).toMatch(/_avatar--clickable_/);
  });

  it('shows placeholder icon when no initials and no meaningful alt', () => {
    render(<DynAvatar alt="Avatar" />); // Generic alt text
    expect(screen.getByText('👤')).toBeInTheDocument();
  });
});