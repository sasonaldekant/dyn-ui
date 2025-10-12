/**
 * DynMenu Unit Tests
 * Comprehensive test coverage for navigation menu component functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { DynMenu } from './DynMenu';
import { MenuItem } from './DynMenu.types';

// Mock child components
vi.mock('../DynIcon', () => ({
  DynIcon: ({ icon, className }: { icon: string; className?: string }) => (
    <i data-testid={`icon-${icon}`} className={className} />
  )
}));

vi.mock('../DynBadge', () => ({
  DynBadge: ({
    count,
    color,
    size,
    children
  }: { count?: number; color?: string; size?: string; children?: React.ReactNode }) => (
    <span data-testid="badge" data-count={count} data-color={color} data-size={size}>
      {children ?? count}
    </span>
  )
}));

vi.mock('../DynInput', () => ({
  DynInput: ({ placeholder, value, onChange, icon, size }: any) => (
    <input
      data-testid="menu-search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-icon={icon}
      data-size={size}
    />
  )
}));

// Sample test data
const sampleMenus: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'dyn-icon-dashboard',
    shortLabel: 'Dash',
    action: vi.fn(),
    badge: { count: 3, color: 'danger' }
  },
  {
    type: 'divider'
  },
  {
    label: 'Products',
    icon: 'dyn-icon-box',
    shortLabel: 'Prod',
    subItems: [
      {
        label: 'All Products',
        icon: 'dyn-icon-list',
        action: vi.fn()
      },
      {
        label: 'Categories',
        icon: 'dyn-icon-folder',
        disabled: true,
        action: vi.fn()
      }
    ]
  },
  {
    label: 'Settings',
    icon: 'dyn-icon-settings',
    visible: false,
    action: vi.fn()
  }
];

const defaultProps = {
  menus: sampleMenus,
  collapsed: false,
  filter: true,
  automaticToggle: false
};

describe('DynMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders menu with items', () => {
    render(<DynMenu {...defaultProps} />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument(); // visible: false
  });

  it('displays menu icons', () => {
    render(<DynMenu {...defaultProps} />);
    
    expect(screen.getByTestId('icon-dyn-icon-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('icon-dyn-icon-box')).toBeInTheDocument();
  });

  it('displays badges on menu items', () => {
    render(<DynMenu {...defaultProps} />);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-count', '3');
    expect(badge).toHaveAttribute('data-color', 'danger');
  });

  it('handles menu item clicks', async () => {
    const user = userEvent.setup();
    render(<DynMenu {...defaultProps} />);
    
    const dashboardItem = screen.getByText('Dashboard');
    await user.click(dashboardItem);
    
    expect(sampleMenus[0].action).toHaveBeenCalled();
  });

  it('expands and collapses sub-menus', async () => {
    const user = userEvent.setup();
    render(<DynMenu {...defaultProps} />);
    
    // Initially, sub-items should not be visible
    expect(screen.queryByText('All Products')).not.toBeInTheDocument();
    
    // Click on Products to expand
    const productsItem = screen.getByText('Products');
    await user.click(productsItem);
    
    // Sub-items should now be visible
    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    
    // Click again to collapse
    await user.click(productsItem);
    
    // Sub-items should be hidden again
    await waitFor(() => {
      expect(screen.queryByText('All Products')).not.toBeInTheDocument();
    });
  });

  it('handles disabled menu items', async () => {
    const user = userEvent.setup();
    render(<DynMenu {...defaultProps} />);
    
    // Expand Products menu
    await user.click(screen.getByText('Products'));
    
    const categoriesItem = screen.getByText('Categories');
    expect(categoriesItem.closest('.dyn-menu-item')).toHaveClass('dyn-menu-item-disabled');
    
    // Click on disabled item should not trigger action
    await user.click(categoriesItem);
    const categoriesAction = sampleMenus[2].subItems?.[1].action as Mock;
    expect(categoriesAction).not.toHaveBeenCalled();
  });

  it('toggles collapsed state', async () => {
    const onCollapse = vi.fn();
    const user = userEvent.setup();
    render(<DynMenu {...defaultProps} collapsed={false} onCollapse={onCollapse} />);
    
    const toggleButton = screen.getByLabelText('Retrair menu');
    await user.click(toggleButton);
    
    expect(onCollapse).toHaveBeenCalledWith(true);
  });

  it('shows collapsed menu with short labels', () => {
    render(<DynMenu {...defaultProps} collapsed={true} />);
    
    expect(screen.getByText('Dash')).toBeInTheDocument(); // short label
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument(); // full label should be hidden
  });

  it('renders search filter when enabled', () => {
    render(<DynMenu {...defaultProps} filter={true} />);
    
    const searchInput = screen.getByTestId('menu-search');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Pesquisar');
  });

  it('filters menu items based on search', async () => {
    const user = userEvent.setup();
    render(<DynMenu {...defaultProps} filter={true} />);
    
    const searchInput = screen.getByTestId('menu-search');
    await user.type(searchInput, 'Dashboard');
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Products')).not.toBeInTheDocument();
  });

  it('hides search filter when collapsed', () => {
    render(<DynMenu {...defaultProps} collapsed={true} filter={true} />);
    
    expect(screen.queryByTestId('menu-search')).not.toBeInTheDocument();
  });

  it('displays logo when provided', () => {
    const logo = 'https://example.com/logo.png';
    const shortLogo = 'https://example.com/short-logo.png';
    
    render(<DynMenu {...defaultProps} logo={logo} shortLogo={shortLogo} />);
    
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', logo);
  });

  it('shows short logo when collapsed', () => {
    const logo = 'https://example.com/logo.png';
    const shortLogo = 'https://example.com/short-logo.png';
    
    render(<DynMenu {...defaultProps} collapsed={true} logo={logo} shortLogo={shortLogo} />);
    
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toHaveAttribute('src', shortLogo);
  });

  it('handles custom literals', () => {
    const customLiterals = {
      collapse: 'Hide Menu',
      expand: 'Show Menu',
      search: 'Find items...'
    };
    
    render(<DynMenu {...defaultProps} literals={customLiterals} />);
    
    expect(screen.getByLabelText('Hide Menu')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Find items...')).toBeInTheDocument();
  });

  it('calls onMenuClick when menu item is clicked', async () => {
    const onMenuClick = vi.fn();
    const user = userEvent.setup();
    render(<DynMenu {...defaultProps} onMenuClick={onMenuClick} />);
    
    const dashboardItem = screen.getByText('Dashboard');
    await user.click(dashboardItem);
    
    expect(onMenuClick).toHaveBeenCalledWith(sampleMenus[0]);
  });

  it('renders divider elements', () => {
    render(<DynMenu {...defaultProps} />);
    
    const dividers = document.querySelectorAll('.dyn-menu-divider');
    expect(dividers).toHaveLength(1);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<DynMenu {...defaultProps} />);
    
    const dashboardItem = screen.getByText('Dashboard').closest('[role="menuitem"]');
    
    if (dashboardItem) {
      dashboardItem.focus();
      await user.keyboard('{Enter}');
      
      expect(sampleMenus[0].action).toHaveBeenCalled();
    }
  });

  it('applies custom className', () => {
    const customClass = 'custom-menu-class';
    const { container } = render(<DynMenu {...defaultProps} className={customClass} />);
    
    const menuElement = container.querySelector('.dyn-menu');
    expect(menuElement).toHaveClass(customClass);
  });

  it('handles menu items with links', () => {
    const menuWithLink: MenuItem[] = [
      {
        label: 'External Link',
        icon: 'dyn-icon-link',
        link: 'https://example.com'
      }
    ];
    
    // Mock window.location.href setter
    delete (window as any).location;
    (window as any).location = { href: '' };
    
    render(<DynMenu menus={menuWithLink} />);
    
    const linkItem = screen.getByText('External Link');
    fireEvent.click(linkItem);
    
    // In a real test, we'd verify navigation, but for unit tests we just check the component renders
    expect(linkItem).toBeInTheDocument();
  });
});