/**
 * DynBreadcrumb Unit Tests
 * Comprehensive test coverage for breadcrumb navigation component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { DynBreadcrumb } from './DynBreadcrumb';
import { BreadcrumbItem } from './DynBreadcrumb.types';

// Mock child components
vi.mock('../DynIcon', () => ({
  DynIcon: ({ icon, className }: { icon: string; className?: string }) => {
    const mergedClassName = [icon, className].filter(Boolean).join(' ');

    return <i data-testid={`icon-${icon}`} className={mergedClassName || undefined} />;
  },
}));

// Mock fetch for favorite service
const fetchMock = vi.fn<typeof fetch>();
global.fetch = fetchMock as unknown as typeof fetch;

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

const defaultProps = {
  items: basicItems
};

const createActionItems = () => {
  const dashboardAction = vi.fn();
  const usersAction = vi.fn();

  return {
    items: [
      { label: 'Dashboard', action: dashboardAction },
      { label: 'Users', action: usersAction },
      { label: 'Profile' }
    ] satisfies BreadcrumbItem[],
    dashboardAction,
  };
};

describe('DynBreadcrumb', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockClear();
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
    
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const productsLink = screen.getByRole('link', { name: 'Products' });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(screen.queryByRole('link', { name: 'Laptops' })).not.toBeInTheDocument();
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
    const { items, dashboardAction } = createActionItems();

    render(<DynBreadcrumb items={items} />);

    const dashboardItem = screen.getByText('Dashboard');
    await user.click(dashboardItem);

    expect(dashboardAction).toHaveBeenCalled();
  });

  it('handles item clicks with onItemClick callback', async () => {
    const onItemClick = vi.fn<[BreadcrumbItem, number], void>();
    const user = userEvent.setup();
    render(<DynBreadcrumb items={basicItems} onItemClick={onItemClick} />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
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
    expect(icon).not.toBeNull();
  });

  it('shows filled star when favorited', () => {
    render(<DynBreadcrumb items={basicItems} favorite={true} />);
    
    const favoriteButton = screen.getByLabelText('Remover dos favoritos');
    expect(favoriteButton).toBeInTheDocument();

    const icon = favoriteButton.querySelector('.dyn-icon-star-filled');
    expect(icon).not.toBeNull();
  });

  it('toggles favorite status when clicked', async () => {
    const onFavorite = vi.fn<[boolean], void>();
    const user = userEvent.setup();
    render(<DynBreadcrumb items={basicItems} favorite={false} onFavorite={onFavorite} />);
    
    const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
    await user.click(favoriteButton);
    
    expect(onFavorite).toHaveBeenCalledWith(true);
  });

  it('calls favorite service API when provided', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true } as Response);

    const onFavorite = vi.fn<[boolean], void>();
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
    
    expect(fetchMock).toHaveBeenCalledWith('/api/favorites', {
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
    fetchMock.mockRejectedValueOnce(new Error('Network error'));
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
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
    render(<DynBreadcrumb items={basicItems} className={customClass} />);

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
    const { items, dashboardAction } = createActionItems();

    render(<DynBreadcrumb items={items} />);

    const dashboardItem = screen.getByText('Dashboard');
    fireEvent.keyDown(dashboardItem, { key: 'Enter' });

    expect(dashboardAction).toHaveBeenCalled();
  });

  it('handles space key for keyboard navigation', async () => {
    const { items, dashboardAction } = createActionItems();

    render(<DynBreadcrumb items={items} />);

    const dashboardItem = screen.getByText('Dashboard');
    fireEvent.keyDown(dashboardItem, { key: ' ' });

    expect(dashboardAction).toHaveBeenCalled();
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
    const preventDefault = vi.fn<Event['preventDefault']>();
    const user = userEvent.setup();
    const actionSpy = vi.fn();

    const itemsWithAction: BreadcrumbItem[] = [
      { label: 'Home', link: '/', action: actionSpy },
      { label: 'Current' }
    ];
    
    render(<DynBreadcrumb items={itemsWithAction} />);
    
    const homeLink = screen.getByRole('link', { name: 'Home' });
    
    // Mock preventDefault
    const originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = preventDefault;
    
    await user.click(homeLink);
    
    expect(preventDefault).toHaveBeenCalled();
    expect(actionSpy).toHaveBeenCalled();
    
    // Restore
    Event.prototype.preventDefault = originalPreventDefault;
  });
});
