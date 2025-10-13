/**
 * DynTabs Component Test Suite
 * Comprehensive testing following DynAvatar gold standard pattern
 */

import { describe, it, test, expect, beforeEach, vi } from 'vitest';
import React, { createRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'vitest-axe';
import { DynTabs } from './DynTabs';
import { DynTabsRef, DynTabItem } from './DynTabs.types';
import styles from './DynTabs.module.css';

// Extend Vitest matchers
expect.extend(toHaveNoViolations);

// Helper function for safe CSS class access (following DynAvatar pattern)
const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

// Mock data following DynAvatar test structure
const mockItems: DynTabItem[] = [
  {
    id: 'tab-1',
    label: 'First Tab',
    content: <div>First tab content</div>
  },
  {
    id: 'tab-2', 
    label: 'Second Tab',
    content: <div>Second tab content</div>,
    icon: <span data-testid="tab-icon">📄</span>
  },
  {
    id: 'tab-3',
    label: 'Disabled Tab',
    content: <div>Disabled content</div>,
    disabled: true
  },
  {
    id: 'tab-4',
    label: 'Closable Tab',
    content: <div>Closable content</div>,
    closable: true,
    badge: '5'
  }
];

const defaultProps = {
  items: mockItems,
  'data-testid': 'test-tabs'
};

describe('DynTabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    test('renders tabs with proper structure', () => {
      render(<DynTabs {...defaultProps} />);
      
      const tablist = screen.getByRole('tablist');
      const tabs = screen.getAllByRole('tab');
      const tabpanel = screen.getByRole('tabpanel');
      
      expect(tablist).toBeInTheDocument();
      expect(tabs).toHaveLength(4);
      expect(tabpanel).toBeInTheDocument();
    });

    test('shows first enabled tab as active by default', () => {
      render(<DynTabs {...defaultProps} />);
      
      const firstTab = screen.getByRole('tab', { name: /first tab/i });
      expect(firstTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('First tab content')).toBeInTheDocument();
    });

    test('respects defaultActiveTab prop', () => {
      render(<DynTabs {...defaultProps} defaultActiveTab="tab-2" />);
      
      const secondTab = screen.getByRole('tab', { name: /second tab/i });
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Second tab content')).toBeInTheDocument();
    });

    test('switches tabs on click', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} onChange={onChange} />);
      
      const secondTab = screen.getByRole('tab', { name: /second tab/i });
      await user.click(secondTab);
      
      expect(onChange).toHaveBeenCalledWith('tab-2');
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    test('ignores clicks on disabled tabs', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} onChange={onChange} />);
      
      const disabledTab = screen.getByRole('tab', { name: /disabled tab/i });
      await user.click(disabledTab);
      
      expect(onChange).not.toHaveBeenCalledWith('tab-3');
      expect(disabledTab).toHaveAttribute('aria-selected', 'false');
    });

    test('handles controlled activeTab prop changes', () => {
      const { rerender } = render(<DynTabs {...defaultProps} activeTab="tab-1" />);
      
      expect(screen.getByText('First tab content')).toBeInTheDocument();
      
      rerender(<DynTabs {...defaultProps} activeTab="tab-2" />);
      
      expect(screen.getByText('Second tab content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(<DynTabs {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has proper role when non-interactive', () => {
      render(<DynTabs {...defaultProps} />);
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('role', 'tablist');
    });

    test('supports custom aria-label', () => {
      render(<DynTabs {...defaultProps} aria-label="Custom navigation" />);
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Custom navigation');
    });

    test('supports aria-describedby', () => {
      render(
        <div>
          <p id="description">Tab navigation description</p>
          <DynTabs {...defaultProps} aria-describedby="description" />
        </div>
      );
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-describedby', 'description');
    });

    test('supports aria-labelledby', () => {
      render(
        <div>
          <h2 id="heading">Tab Navigation</h2>
          <DynTabs {...defaultProps} aria-labelledby="heading" />
        </div>
      );
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-labelledby', 'heading');
    });

    test('announces loading state to screen readers', async () => {
      const user = userEvent.setup();
      render(<DynTabs {...defaultProps} lazy defaultActiveTab="tab-1" />);
      
      await user.click(screen.getByRole('tab', { name: /second tab/i }));
      
      const loadingAnnouncement = screen.getByText('Loading tab content');
      expect(loadingAnnouncement).toBeInTheDocument();
    });

    test('sets data-status attribute', () => {
      render(<DynTabs {...defaultProps} />);
      
      const activeTab = screen.getByRole('tab', { selected: true });
      expect(activeTab).toHaveAttribute('data-status', 'active');
      
      const disabledTab = screen.getByRole('tab', { name: /disabled tab/i });
      expect(disabledTab).toHaveAttribute('data-status', 'disabled');
      
      const inactiveTab = screen.getByRole('tab', { name: /second tab/i });
      expect(inactiveTab).toHaveAttribute('data-status', 'inactive');
    });
  });

  describe('Interactive Behavior', () => {
    test('handles click events', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} onChange={onChange} />);
      
      const secondTab = screen.getByRole('tab', { name: /second tab/i });
      await user.click(secondTab);
      
      expect(onChange).toHaveBeenCalledWith('tab-2');
    });

    test('handles keyboard navigation', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} onChange={onChange} />);
      
      const firstTab = screen.getByRole('tab', { name: /first tab/i });
      firstTab.focus();
      
      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('tab-2');
    });

    test('has proper focus indicators', () => {
      render(<DynTabs {...defaultProps} />);
      
      const firstTab = screen.getByRole('tab', { name: /first tab/i });
      firstTab.focus();
      expect(firstTab).toHaveFocus();
    });

    test('has proper tabIndex for active tabs', () => {
      render(<DynTabs {...defaultProps} />);
      
      const activeTab = screen.getByRole('tab', { selected: true });
      expect(activeTab).toHaveAttribute('tabIndex', '0');
      
      const inactiveTabs = screen.getAllByRole('tab', { selected: false });
      inactiveTabs.forEach(tab => {
        expect(tab).toHaveAttribute('tabIndex', '-1');
      });
    });

    test('handles tab closing', async () => {
      const user = userEvent.setup();
      const onTabClose = vi.fn();
      
      render(<DynTabs {...defaultProps} closable onTabClose={onTabClose} />);
      
      const closeButton = screen.getByTestId('test-tabs-close-tab-4');
      await user.click(closeButton);
      
      expect(onTabClose).toHaveBeenCalledWith('tab-4');
    });

    test('does not trigger tab activation when closing', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const onTabClose = vi.fn();
      
      render(
        <DynTabs 
          {...defaultProps}
          closable 
          onChange={onChange}
          onTabClose={onTabClose}
        />
      );
      
      const closeButton = screen.getByTestId('test-tabs-close-tab-4');
      await user.click(closeButton);
      
      expect(onTabClose).toHaveBeenCalledWith('tab-4');
      expect(onChange).not.toHaveBeenCalledWith('tab-4');
    });
  });

  describe('Sizes and Variants', () => {
    test('applies size classes correctly', () => {
      const { rerender } = render(<DynTabs {...defaultProps} size="small" />);
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveClass(getStyleClass('tab--small'));
      });
      
      rerender(<DynTabs {...defaultProps} size="large" />);
      
      const largeTabs = screen.getAllByRole('tab');
      largeTabs.forEach(tab => {
        expect(tab).toHaveClass(getStyleClass('tab--large'));
      });
    });

    test('applies default medium size when not specified', () => {
      render(<DynTabs {...defaultProps} />);
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveClass(getStyleClass('tab--medium'));
      });
    });

    test('applies variant classes correctly', () => {
      const { rerender } = render(<DynTabs {...defaultProps} variant="underlined" />);
      
      expect(screen.getByRole('tab', { name: /first tab/i })).toHaveClass(getStyleClass('tab--underlined'));
      
      rerender(<DynTabs {...defaultProps} variant="pills" />);
      
      expect(screen.getByRole('tab', { name: /first tab/i })).toHaveClass(getStyleClass('tab--pills'));
    });

    test('applies position classes correctly', () => {
      const { container, rerender } = render(<DynTabs {...defaultProps} position="left" />);
      
      expect(container.firstChild).toHaveClass(getStyleClass('tabs--left'));
      
      rerender(<DynTabs {...defaultProps} position="bottom" />);
      expect(container.firstChild).toHaveClass(getStyleClass('tabs--bottom'));
    });

    test('applies active state classes correctly', () => {
      render(<DynTabs {...defaultProps} />);
      
      const activeTab = screen.getByRole('tab', { selected: true });
      expect(activeTab).toHaveClass(getStyleClass('tab--active'));
    });
  });

  describe('Loading and Lazy States', () => {
    test('shows loading state', async () => {
      const user = userEvent.setup();
      render(<DynTabs {...defaultProps} lazy defaultActiveTab="tab-1" />);
      
      await user.click(screen.getByRole('tab', { name: /second tab/i }));
      
      expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
      expect(screen.getByText('Loading tab content')).toBeInTheDocument();
    });

    test('loads content progressively when switching tabs', async () => {
      const user = userEvent.setup();
      
      render(<DynTabs {...defaultProps} lazy />);
      
      // Switch to second tab
      await user.click(screen.getByRole('tab', { name: /second tab/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Second tab content')).toBeInTheDocument();
      });
    });

    test('shows custom loading component', async () => {
      const user = userEvent.setup();
      const customLoading = <div data-testid="custom-loading">Custom Loading...</div>;
      
      render(
        <DynTabs 
          {...defaultProps}
          lazy
          defaultActiveTab="tab-1"
          loadingComponent={customLoading}
        />
      );
      
      await user.click(screen.getByRole('tab', { name: /second tab/i }));
      
      expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
    });
  });

  describe('Props and Customization', () => {
    test('applies custom className', () => {
      const { container } = render(
        <DynTabs {...defaultProps} className="custom-tabs" />
      );
      
      expect(container.firstChild).toHaveClass('custom-tabs');
    });

    test('sets custom id', () => {
      render(<DynTabs {...defaultProps} id="custom-tabs-id" />);
      
      const tabsContainer = screen.getByTestId('test-tabs');
      expect(tabsContainer).toHaveAttribute('id', 'custom-tabs-id');
    });

    test('sets custom test id', () => {
      render(<DynTabs {...defaultProps} data-testid="custom-test-id" />);
      
      expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
      expect(screen.getByTestId('custom-test-id-tablist')).toBeInTheDocument();
    });

    test('forwards additional props', () => {
      render(
        <DynTabs 
          {...defaultProps}
          data-custom="test-value"
        />
      );
      
      const tabsContainer = screen.getByTestId('test-tabs');
      expect(tabsContainer).toHaveAttribute('data-custom', 'test-value');
    });

    test('handles empty items array gracefully', () => {
      render(<DynTabs items={[]} />);
      
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    });
  });
});