/**
 * DynBreadcrumb Unit Tests
 * Comprehensive test coverage for breadcrumb navigation component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynBreadcrumb } from './DynBreadcrumb';
import { BreadcrumbItem } from './DynBreadcrumb.types';

// Mock child components
jest.mock('../DynIcon', () => ({
  DynIcon: ({ icon, className }: { icon: string; className?: string }) => (
    <i data-testid={`icon-${icon}`} className={className} />
  )
}));

// Mock fetch for favorite service
global.fetch = jest.fn();

// Sample test data
const basicItems: BreadcrumbItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Products', link: '/products' },
  { label: 'Laptops' }
];

const longItems: BreadcrumbItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Category 1', link: '/cat1' },
  { label: 'Category 2', link: '/cat2' },
  { label: 'Category 3', link: '/cat3' },
  { label: 'Category 4', link: '/cat4' },
  { label: 'Category 5', link: '/cat5' },
  { label: 'Current' }
];

const actionItems: BreadcrumbItem[] = [
  { label: 'Dashboard', action: jest.fn() },
  { label: 'Users', action: jest.fn() },
  { label: 'Profile' }
];

const defaultProps = {
  items: basicItems
};

describe('DynBreadcrumb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders breadcrumb with items', () => {
    render(<DynBreadcrumb {...defaultProps} />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Laptops')).toBeInTheDocument();
  });

  it('renders links for non-last items with links', () => {
    render(<DynBreadcrumb {...defaultProps} />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const productsLink = screen.getByText('Products').closest('a');
    const laptopsSpan = screen.getByText('Laptops').closest('span');
    
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(laptopsSpan).toBeInTheDocument();
    expect(laptopsSpan).not.toHaveAttribute('href');
  });

  it('renders separators between items', () => {
    const { container } = render(<DynBreadcrumb {...defaultProps} />);
    
    const separators = container.querySelectorAll('.dyn-icon-arrow-right');
    expect(separators).toHaveLength(2); // 3 items = 2 separators
  });

  it('renders custom separator', () => {
    const { container } = render(<DynBreadcrumb items={basicItems} separator="dyn-icon-chevron-right" />);
    
    const separators = container.querySelectorAll('.dyn-icon-chevron-right');
    expect(separators).toHaveLength(2);
  });

  it('renders custom element separator', () => {
    const customSeparator = <span data-testid="custom-sep">/</span>;
    render(<DynBreadcrumb items={basicItems} separator={customSeparator} />);
    
    const separators = screen.getAllByTestId('custom-sep');
    expect(separators).toHaveLength(2);
  });

  it('handles item clicks with actions', async () => {
    const user = userEvent.setup();
    render(<DynBreadcrumb items={actionItems} />);
    
    const dashboardItem = screen.getByText('Dashboard');
    await user.click(dashboardItem);
    
    expect(actionItems[0].action).toHaveBeenCalled();
  });

  it('handles item clicks with onItemClick callback', async () => {
    const onItemClick = jest.fn();
    const user = userEvent.setup();
    render(<DynBreadcrumb items={basicItems} onItemClick={onItemClick} />);
    
    const homeLink = screen.getByText('Home');
    await user.click(homeLink);
    
    expect(onItemClick).toHaveBeenCalledWith(basicItems[0], 0);
  });

  it('truncates long breadcrumbs with ellipsis', () => {
    render(<DynBreadcrumb items={longItems} maxItems={4} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('Category 5')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    
    // Items in the middle should not be visible
    expect(screen.queryByText('Category 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Category 2')).not.toBeInTheDocument();
  });

  it('expands ellipsis when clicked', async () => {
    const user = userEvent.setup();
    render(<DynBreadcrumb items={longItems} maxItems={4} />);
    
    const ellipsis = screen.getByText('...');
    await user.click(ellipsis);
    
    // All items should now be visible
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Category 3')).toBeInTheDocument();
  });

  it('shows favorite button when favorite prop is provided', () => {
    render(<DynBreadcrumb items={basicItems} favorite={false} />);
    
    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    expect(favoriteButton).toBeInTheDocument();

    const icon = favoriteButton.querySelector('.dyn-icon-star');
    expect(icon).toBeInTheDocument();
  });

  it('shows filled star when favorited', () => {
    render(<DynBreadcrumb items={basicItems} favorite={true} />);
    
    const favoriteButton = screen.getByLabelText('Remover dos favoritos');
    expect(favoriteButton).toBeInTheDocument();

    const icon = favoriteButton.querySelector('.dyn-icon-star-filled');
    expect(icon).toBeInTheDocument();
  });

  it('toggles favorite status when clicked', async () => {
    const onFavorite = jest.fn();
    const user = userEvent.setup();
    render(<DynBreadcrumb items={basicItems} favorite={false} onFavorite={onFavorite} />);
    
    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    await user.click(favoriteButton);
    
    expect(onFavorite).toHaveBeenCalledWith(true);
  });

  it('calls favorite service API when provided', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockResolvedValueOnce({ ok: true });
    
    const onFavorite = jest.fn();
    const user = userEvent.setup();
    render(
      <DynBreadcrumb 
        items={basicItems} 
        favorite={false} 
        favoriteService="/api/favorites"
        onFavorite={onFavorite} 
      />
    );
    
    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    await user.click(favoriteButton);
    
    expect(mockFetch).toHaveBeenCalledWith('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favorited: true })
    });
    
    await waitFor(() => {
      expect(onFavorite).toHaveBeenCalledWith(true);
    });
  });

  it('handles favorite service API error gracefully', async () => {
    const mockFetch = global.fetch as jest.Mock;
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const user = userEvent.setup();
    render(
      <DynBreadcrumb 
        items={basicItems} 
        favorite={false} 
        favoriteService="/api/favorites"
      />
    );
    
    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    await user.click(favoriteButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Failed to update favorite status:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('returns null when no items provided', () => {
    const { container } = render(<DynBreadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    const customClass = 'custom-breadcrumb-class';
    const { container } = render(<DynBreadcrumb items={basicItems} className={customClass} />);
    
    const breadcrumbElement = screen.getByRole('navigation');
    expect(breadcrumbElement).toHaveClass(customClass);
  });

  it('handles keyboard navigation for ellipsis', async () => {
    render(<DynBreadcrumb items={longItems} maxItems={4} />);
    
    const ellipsis = screen.getByText('...');
    expect(ellipsis).toHaveAttribute('tabIndex', '0');
    expect(ellipsis).toHaveAttribute('role', 'button');
    
    // Test Enter key
    fireEvent.keyDown(ellipsis, { key: 'Enter' });
    expect(screen.getByText('Category 1')).toBeInTheDocument();
  });

  it('handles keyboard navigation for action items', async () => {
    render(<DynBreadcrumb items={actionItems} />);
    
    const dashboardItem = screen.getByText('Dashboard');
    fireEvent.keyDown(dashboardItem, { key: 'Enter' });
    
    expect(actionItems[0].action).toHaveBeenCalled();
  });

  it('handles space key for keyboard navigation', async () => {
    render(<DynBreadcrumb items={actionItems} />);
    
    const dashboardItem = screen.getByText('Dashboard');
    fireEvent.keyDown(dashboardItem, { key: ' ' });
    
    expect(actionItems[0].action).toHaveBeenCalled();
  });

  it('shows correct ARIA labels', () => {
    render(<DynBreadcrumb items={basicItems} favorite={false} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('does not show favorite button when not configured', () => {
    render(<DynBreadcrumb items={basicItems} />);
    
    expect(screen.queryByLabelText('Adicionar aos favoritos')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Remover dos favoritos')).not.toBeInTheDocument();
  });

  it('shows all items when maxItems is greater than item count', () => {
    render(<DynBreadcrumb items={basicItems} maxItems={10} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Laptops')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('prevents default on link click when action is provided', async () => {
    const preventDefault = jest.fn();
    const user = userEvent.setup();
    
    const itemsWithAction = [
      { label: 'Home', link: '/', action: jest.fn() },
      { label: 'Current' }
    ];
    
    render(<DynBreadcrumb items={itemsWithAction} />);
    
    const homeLink = screen.getByText('Home');
    
    // Mock preventDefault
    const originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = preventDefault;
    
    await user.click(homeLink);
    
    expect(preventDefault).toHaveBeenCalled();
    expect(itemsWithAction[0].action).toHaveBeenCalled();
    
    // Restore
    Event.prototype.preventDefault = originalPreventDefault;
  });
});