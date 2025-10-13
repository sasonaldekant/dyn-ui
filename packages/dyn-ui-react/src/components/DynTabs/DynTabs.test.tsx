/**
 * DynTabs Component Test Suite
 * Comprehensive testing following DynAvatar gold standard pattern
 */

import { vi, describe, it, test, expect, beforeEach } from 'vitest';
import React, { createRef } from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DynTabs } from './DynTabs';
import type { DynTabsRef, DynTabItem } from './DynTabs.types';
import styles from './DynTabs.module.css';

// Extend expect matchers
expect.extend(toHaveNoViolations);

// Helper function for safe CSS class access (following DynAvatar pattern)
const getStyleClass = (className: string): string => {
  return (styles as Record<string, string>)[className] || '';
};

// Mock data following DynAvatar test pattern
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

    test('implements proper ARIA tablist pattern', () => {
      render(<DynTabs {...defaultProps} />);
      
      const tablist = screen.getByRole('tablist');
      const tabs = screen.getAllByRole('tab');
      const tabpanel = screen.getByRole('tabpanel');
      
      expect(tablist).toHaveAttribute('role', 'tablist');
      
      tabs.forEach((tab, index) => {
        const item = mockItems[index];
        expect(tab).toHaveAttribute('role', 'tab');
        expect(tab).toHaveAttribute('aria-controls', expect.stringContaining(`panel-${item.id}`));
        expect(tab).toHaveAttribute('id', expect.stringContaining(`tab-${item.id}`));
      });
      
      expect(tabpanel).toHaveAttribute('role', 'tabpanel');
      expect(tabpanel).toHaveAttribute('aria-labelledby', expect.stringContaining('tab-tab-1'));
    });

    test('manages tabIndex correctly for roving tabindex pattern', () => {
      render(<DynTabs {...defaultProps} />);
      
      const tabs = screen.getAllByRole('tab');
      
      // First tab should be focusable, others should not
      expect(tabs[0]).toHaveAttribute('tabIndex', '0');
      expect(tabs[1]).toHaveAttribute('tabIndex', '-1');
      expect(tabs[2]).toHaveAttribute('tabIndex', '-1'); // disabled
      expect(tabs[3]).toHaveAttribute('tabIndex', '-1');
    });

    test('supports custom aria-label on tablist', () => {
      render(<DynTabs {...defaultProps} aria-label="Navigation tabs" />);
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Navigation tabs');
    });

    test('supports aria-labelledby and aria-describedby', () => {
      render(
        <div>
          <h2 id="tabs-heading">Section Tabs</h2>
          <p id="tabs-description">Navigate between sections</p>
          <DynTabs 
            {...defaultProps}
            aria-labelledby="tabs-heading"
            aria-describedby="tabs-description"
          />
        </div>
      );
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-labelledby', 'tabs-heading');
      expect(tablist).toHaveAttribute('aria-describedby', 'tabs-description');
    });

    test('announces tab changes to screen readers', async () => {
      const user = userEvent.setup();
      render(<DynTabs {...defaultProps} />);
      
      const announcements = screen.getByLabelText(/tab .* of .* selected/i);
      expect(announcements).toBeInTheDocument();
      
      await user.click(screen.getByRole('tab', { name: /second tab/i }));
      
      await waitFor(() => {
        expect(announcements).toHaveTextContent(/tab 2 of 4 selected/i);
      });
    });

    test('sets aria-disabled correctly for disabled tabs', () => {
      render(<DynTabs {...defaultProps} />);
      
      const disabledTab = screen.getByRole('tab', { name: /disabled tab/i });
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
      expect(disabledTab).toHaveAttribute('disabled');
    });
  });

  describe('Interactive Behavior', () => {
    test('handles tab closing functionality', async () => {
      const user = userEvent.setup();
      const onTabClose = vi.fn();
      
      render(<DynTabs {...defaultProps} closable onTabClose={onTabClose} />);
      
      const closeButton = screen.getByLabelText(/close closable tab/i);
      expect(closeButton).toBeInTheDocument();
      
      await user.click(closeButton);
      expect(onTabClose).toHaveBeenCalledWith('tab-4');
    });

    test('handles add tab functionality', async () => {
      const user = userEvent.setup();
      const onTabAdd = vi.fn();
      
      render(<DynTabs {...defaultProps} addable onTabAdd={onTabAdd} />);
      
      const addButton = screen.getByLabelText('Add new tab');
      await user.click(addButton);
      
      expect(onTabAdd).toHaveBeenCalled();
    });

    test('prevents close button clicks from activating tabs', async () => {
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
      
      const closeButton = screen.getByLabelText(/close closable tab/i);
      await user.click(closeButton);
      
      expect(onTabClose).toHaveBeenCalledWith('tab-4');
      expect(onChange).not.toHaveBeenCalledWith('tab-4');
    });

    test('handles keyboard navigation with arrow keys', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} onChange={onChange} />);
      
      const firstTab = screen.getByRole('tab', { name: /first tab/i });
      firstTab.focus();
      
      // Navigate right
      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('tab-2');
      
      // Navigate left  
      await user.keyboard('{ArrowLeft}');
      expect(onChange).toHaveBeenCalledWith('tab-1');
    });

    test('handles Home and End key navigation', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} defaultActiveTab="tab-2" onChange={onChange} />);
      
      const secondTab = screen.getByRole('tab', { name: /second tab/i });
      secondTab.focus();
      
      // Go to first tab
      await user.keyboard('{Home}');
      expect(onChange).toHaveBeenCalledWith('tab-1');
      
      // Go to last enabled tab
      await user.keyboard('{End}');
      expect(onChange).toHaveBeenCalledWith('tab-4');
    });

    test('skips disabled tabs during keyboard navigation', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} defaultActiveTab="tab-2" onChange={onChange} />);
      
      const secondTab = screen.getByRole('tab', { name: /second tab/i });
      secondTab.focus();
      
      // Navigate right should skip disabled tab-3 and go to tab-4
      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('tab-4');
    });

    test('activates tab with Enter and Space keys', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      
      render(<DynTabs {...defaultProps} onChange={onChange} />);
      
      const secondTab = screen.getByRole('tab', { name: /second tab/i });
      secondTab.focus();
      
      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledWith('tab-2');
      
      onChange.mockClear();
      
      await user.keyboard('{Space}');
      expect(onChange).toHaveBeenCalledWith('tab-2');
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

    test('applies variant classes correctly', () => {
      const { rerender } = render(<DynTabs {...defaultProps} variant="underlined" />);
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveClass(getStyleClass('tab--underlined'));
      });
      
      rerender(<DynTabs {...defaultProps} variant="pills" />);
      
      const pillTabs = screen.getAllByRole('tab');
      pillTabs.forEach(tab => {
        expect(tab).toHaveClass(getStyleClass('tab--pills'));
      });
    });

    test('applies position classes correctly', () => {
      const { container, rerender } = render(<DynTabs {...defaultProps} position="left" />);
      
      expect(container.firstChild).toHaveClass(getStyleClass('tabs--left'));
      
      rerender(<DynTabs {...defaultProps} position="bottom" />);
      expect(container.firstChild).toHaveClass(getStyleClass('tabs--bottom'));
    });

    test('applies default medium size when not specified', () => {
      render(<DynTabs {...defaultProps} />);
      
      const tabs = screen.getAllByRole('tab');
      tabs.forEach(tab => {
        expect(tab).toHaveClass(getStyleClass('tab--medium'));
      });
    });

    test('applies active state classes correctly', () => {
      render(<DynTabs {...defaultProps} />);
      
      const activeTab = screen.getByRole('tab', { selected: true });
      expect(activeTab).toHaveClass(getStyleClass('tab--active'));
    });
  });

  describe('Lazy Loading', () => {
    test('loads content only for active tab when lazy=true', () => {
      render(<DynTabs {...defaultProps} lazy defaultActiveTab="tab-1" />);
      
      expect(screen.getByText('First tab content')).toBeInTheDocument();
      expect(screen.queryByText('Second tab content')).not.toBeInTheDocument();
    });

    test('shows loading state for unloaded lazy tabs', async () => {
      const user = userEvent.setup();
      
      render(<DynTabs {...defaultProps} lazy defaultActiveTab="tab-1" />);
      
      const secondTab = screen.getByRole('tab', { name: /second tab/i });
      await user.click(secondTab);
      
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
      
      // Switch back to first tab - should still be loaded
      await user.click(screen.getByRole('tab', { name: /first tab/i }));
      expect(screen.getByText('First tab content')).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    test('renders icons correctly', () => {
      render(<DynTabs {...defaultProps} />);
      
      expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    });

    test('renders badges correctly', () => {
      render(<DynTabs {...defaultProps} />);
      
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByLabelText('5 notifications')).toBeInTheDocument();
    });

    test('applies scrollable behavior', () => {
      const { container } = render(<DynTabs {...defaultProps} scrollable />);
      
      expect(container.firstChild).toHaveClass(getStyleClass('tabs--scrollable'));
    });
  });

  describe('Props and Customization', () => {
    test('applies custom className', () => {
      const { container } = render(
        <DynTabs {...defaultProps} className="custom-tabs" />
      );
      
      expect(container.firstChild).toHaveClass('custom-tabs');
    });

    test('applies custom tabListClassName', () => {
      render(<DynTabs {...defaultProps} tabListClassName="custom-tablist" />);
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('custom-tablist');
    });

    test('applies custom contentClassName', () => {
      render(<DynTabs {...defaultProps} contentClassName="custom-content" />);
      
      const tabpanel = screen.getByRole('tabpanel');
      expect(tabpanel).toHaveClass('custom-content');
    });

    test('sets custom id', () => {
      render(<DynTabs {...defaultProps} id="custom-tabs-id" />);
      
      expect(screen.getByTestId('test-tabs')).toHaveAttribute('id', 'custom-tabs-id');
    });

    test('sets custom test id', () => {
      render(<DynTabs items={mockItems} data-testid="custom-test-id" />);
      
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

    test('shows custom loading component for lazy tabs', async () => {
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
});