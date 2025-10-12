/**
 * DynTabs Unit Tests
 * Comprehensive test coverage for tab navigation component functionality
 */

import { vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynTabs from './DynTabs';
import { TabItem, DynTabsHandle } from './DynTabs.types';

// Mock child components with proper vitest imports
const mockDynIcon = vi.fn(({ icon, className }: { icon: string; className?: string }) => (
  <i data-testid={`icon-${icon}`} className={className} />
));

const mockDynBadge = vi.fn(({ count, size, children }: { count?: number; size?: string; children?: React.ReactNode }) => (
  <span data-testid="badge" data-count={count} data-size={size}>
    {children ?? count}
  </span>
));

vi.mock('../DynIcon', () => ({
  DynIcon: mockDynIcon
}));

vi.mock('../DynBadge', () => ({
  DynBadge: mockDynBadge
}));

// Sample test data
const mockTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div>Content 1</div>
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div>Content 2</div>
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    disabled: true,
    content: <div>Content 3</div>
  }
];

const tabsWithExtras: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    icon: 'test-icon',
    badge: { count: 5 },
    content: <div>Content 1</div>
  }
];

const defaultProps = {
  tabs: mockTabs
};

describe('DynTabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders tabs correctly', () => {
    render(<DynTabs {...defaultProps} />);
    
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows first tab as active by default', () => {
    render(<DynTabs {...defaultProps} />);
    
    const firstTab = screen.getByRole('tab', { name: /tab 1/i });
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(<DynTabs {...defaultProps} />);
    
    const secondTab = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(secondTab);
    
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('respects defaultActiveTab prop', () => {
    render(<DynTabs tabs={mockTabs} defaultActiveTab="tab2" />);
    
    const secondTab = screen.getByRole('tab', { name: /tab 2/i });
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('calls onTabChange when tab is clicked', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<DynTabs tabs={mockTabs} onTabChange={onTabChange} />);
    
    const secondTab = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(secondTab);
    
    expect(onTabChange).toHaveBeenCalledWith('tab2');
  });

  it('does not switch to disabled tab', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<DynTabs tabs={mockTabs} onTabChange={onTabChange} />);
    
    const disabledTab = screen.getByRole('tab', { name: /tab 3/i });
    expect(disabledTab).toBeDisabled();
    
    await user.click(disabledTab);
    expect(onTabChange).not.toHaveBeenCalledWith('tab3');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<DynTabs tabs={mockTabs} onTabChange={onTabChange} />);
    
    const firstTab = screen.getByRole('tab', { name: /tab 1/i });
    firstTab.focus();
    
    await user.keyboard('{ArrowRight}');
    expect(onTabChange).toHaveBeenCalledWith('tab2');
    
    vi.clearAllMocks();
    
    await user.keyboard('{ArrowLeft}');
    expect(onTabChange).toHaveBeenCalledWith('tab1');
  });

  it('supports Home and End keys', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(<DynTabs tabs={mockTabs} onTabChange={onTabChange} />);
    
    const firstTab = screen.getByRole('tab', { name: /tab 1/i });
    firstTab.focus();
    
    await user.keyboard('{End}');
    expect(onTabChange).toHaveBeenCalledWith('tab2'); // Last non-disabled tab
    
    vi.clearAllMocks();
    
    await user.keyboard('{Home}');
    expect(onTabChange).toHaveBeenCalledWith('tab1');
  });

  it('renders with icons and badges', () => {
    render(<DynTabs tabs={tabsWithExtras} />);
    
    expect(mockDynIcon).toHaveBeenCalledWith(
      expect.objectContaining({ icon: 'test-icon' }),
      expect.anything()
    );
    expect(mockDynBadge).toHaveBeenCalledWith(
      expect.objectContaining({ count: 5, size: 'small' }),
      expect.anything()
    );
  });

  it('applies custom className', () => {
    const { container } = render(
      <DynTabs tabs={mockTabs} className="custom-tabs" />
    );
    
    expect(container.firstChild).toHaveClass('custom-tabs');
  });

  it('applies different variants correctly', () => {
    const { container, rerender } = render(
      <DynTabs tabs={mockTabs} variant="pills" />
    );
    
    expect(container.firstChild).toHaveClass('variant-pills');
    
    rerender(<DynTabs tabs={mockTabs} variant="underline" />);
    expect(container.firstChild).toHaveClass('variant-underline');
    
    rerender(<DynTabs tabs={mockTabs} variant="cards" />);
    expect(container.firstChild).toHaveClass('variant-cards');
  });

  it('applies different positions correctly', () => {
    const { container, rerender } = render(
      <DynTabs tabs={mockTabs} position="left" />
    );
    
    expect(container.firstChild).toHaveClass('position-left');
    
    rerender(<DynTabs tabs={mockTabs} position="bottom" />);
    expect(container.firstChild).toHaveClass('position-bottom');
    
    rerender(<DynTabs tabs={mockTabs} position="right" />);
    expect(container.firstChild).toHaveClass('position-right');
  });

  it('applies different sizes correctly', () => {
    const { container, rerender } = render(
      <DynTabs tabs={mockTabs} size="small" />
    );
    
    expect(container.firstChild).toHaveClass('size-small');
    
    rerender(<DynTabs tabs={mockTabs} size="large" />);
    expect(container.firstChild).toHaveClass('size-large');
  });

  it('supports lazy loading', () => {
    render(<DynTabs tabs={mockTabs} lazyLoad={true} />);
    
    // First tab should be loaded
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Other tabs should not be loaded initially
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('handles scrollable tabs', () => {
    const manyTabs = Array.from({ length: 10 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `Tab ${i + 1}`,
      content: <div>Content {i + 1}</div>
    }));
    
    const { container } = render(
      <DynTabs tabs={manyTabs} scrollable={true} />
    );
    
    expect(container.firstChild).toHaveClass('scrollable');
  });

  it('handles closable tabs', async () => {
    const user = userEvent.setup();
    const onTabClose = vi.fn();
    const closableTabs = mockTabs.map(tab => ({ ...tab, closable: true }));
    
    render(
      <DynTabs 
        tabs={closableTabs} 
        closable={true} 
        onTabClose={onTabClose}
      />
    );
    
    const closeButtons = screen.getAllByLabelText(/close.*tab/i);
    expect(closeButtons.length).toBeGreaterThan(0);
    
    await user.click(closeButtons[0]);
    expect(onTabClose).toHaveBeenCalledWith('tab1');
  });

  it('handles add button', async () => {
    const user = userEvent.setup();
    const onTabAdd = vi.fn();
    
    render(
      <DynTabs 
        tabs={mockTabs} 
        addable={true} 
        onTabAdd={onTabAdd}
      />
    );
    
    const addButton = screen.getByLabelText('Add new tab');
    expect(addButton).toBeInTheDocument();
    
    await user.click(addButton);
    expect(onTabAdd).toHaveBeenCalled();
  });

  it('handles empty tabs array', () => {
    render(<DynTabs tabs={[]} />);
    
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  });

  it('shows tooltip on tabs with tooltip property', () => {
    const tabsWithTooltip: TabItem[] = [
      {
        id: 'tooltip-tab',
        label: 'Tab with Tooltip',
        tooltip: 'This is a tooltip',
        content: <div>Content</div>
      }
    ];
    
    render(<DynTabs tabs={tabsWithTooltip} />);
    
    const tab = screen.getByRole('tab', { name: /tab with tooltip/i });
    expect(tab).toHaveAttribute('title', 'This is a tooltip');
  });

  describe('Imperative API', () => {
    it('provides setActiveTab method', () => {
      const tabsRef = React.createRef<DynTabsHandle>();
      const onTabChange = vi.fn();
      
      render(
        <DynTabs 
          ref={tabsRef}
          tabs={mockTabs}
          onTabChange={onTabChange}
        />
      );
      
      tabsRef.current?.setActiveTab('tab2');
      expect(onTabChange).toHaveBeenCalledWith('tab2');
    });

    it('provides getActiveTab method', () => {
      const tabsRef = React.createRef<DynTabsHandle>();
      
      render(
        <DynTabs 
          ref={tabsRef}
          tabs={mockTabs}
          defaultActiveTab="tab2"
        />
      );
      
      expect(tabsRef.current?.getActiveTab()).toBe('tab2');
    });

    it('provides closeTab method', () => {
      const tabsRef = React.createRef<DynTabsHandle>();
      const onTabClose = vi.fn();
      
      render(
        <DynTabs 
          ref={tabsRef}
          tabs={mockTabs}
          onTabClose={onTabClose}
        />
      );
      
      tabsRef.current?.closeTab('tab1');
      expect(onTabClose).toHaveBeenCalledWith('tab1');
    });
  });

  it('applies tabClassName to individual tabs', () => {
    const customTabClass = 'custom-tab-class';
    render(
      <DynTabs tabs={mockTabs} tabClassName={customTabClass} />
    );
    
    const tabs = screen.getAllByRole('tab');
    tabs.forEach(tab => {
      expect(tab).toHaveClass(customTabClass);
    });
  });

  it('applies panelClassName to content panel', () => {
    const customPanelClass = 'custom-panel-class';
    render(
      <DynTabs tabs={mockTabs} panelClassName={customPanelClass} />
    );
    
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveClass(customPanelClass);
  });

  it('handles custom renderTabContent', () => {
    const customRender = vi.fn((tab) => <div>Custom {tab.label}</div>);
    
    render(
      <DynTabs 
        tabs={mockTabs} 
        renderTabContent={customRender}
      />
    );
    
    expect(customRender).toHaveBeenCalledWith(mockTabs[0], 0);
    expect(screen.getByText('Custom Tab 1')).toBeInTheDocument();
  });
});