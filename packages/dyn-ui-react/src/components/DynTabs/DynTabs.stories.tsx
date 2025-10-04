/**
 * DynTabs Storybook Stories
 * Interactive examples and documentation for tab navigation component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DynTabs from './DynTabs';
import { TabItem } from './DynTabs.types';
import React from 'react';

const meta: Meta<typeof DynTabs> = {
  title: 'Navigation/DynTabs',
  component: DynTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The DynTabs component provides a flexible tab navigation system with:

- **Multiple Positions** - Top, bottom, left, and right orientations
- **Multiple Variants** - Default, pills, underline, and cards styles
- **Advanced Features** - Lazy loading, scrollable tabs, closable tabs
- **Accessibility** - Full keyboard navigation and ARIA support
- **Responsive Design** - Mobile-friendly with overflow handling
- **Customization** - Complete CSS custom properties support

## Usage

\`\`\`tsx
import { DynTabs } from '@dyn-ui/react';

const tabs = [
  { id: 'tab1', label: 'Dashboard', content: <div>Dashboard Content</div> },
  { id: 'tab2', label: 'Users', content: <div>Users Content</div> }
];

<DynTabs tabs={tabs} defaultActiveTab="tab1" />
\`\`\`
        `
      }
    }
  },
  argTypes: {
    position: {
      description: 'Position of the tab navigation',
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right']
    },
    variant: {
      description: 'Visual style variant of the tabs',
      control: { type: 'select' },
      options: ['default', 'pills', 'underline', 'cards']
    },
    size: {
      description: 'Size of the tabs',
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    scrollable: {
      description: 'Enable horizontal scrolling for overflow tabs',
      control: { type: 'boolean' }
    },
    lazyLoad: {
      description: 'Load tab content only when tab becomes active',
      control: { type: 'boolean' }
    },
    closable: {
      description: 'Show close buttons on tabs',
      control: { type: 'boolean' }
    },
    addable: {
      description: 'Show add button for creating new tabs',
      control: { type: 'boolean' }
    },
    onTabChange: {
      description: 'Callback fired when active tab changes',
      action: 'tabChanged'
    },
    onTabClose: {
      description: 'Callback fired when tab is closed',
      action: 'tabClosed'
    },
    onTabAdd: {
      description: 'Callback fired when add button is clicked',
      action: 'tabAdded'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynTabs>;

// Sample tab data
const sampleTabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Dashboard',
    icon: '📊',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>📊 Dashboard</h3>
        <p>Welcome to your dashboard! Here you can see an overview of your data and key metrics.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          <div style={{ padding: '16px', background: '#f0f8ff', borderRadius: '8px' }}>
            <strong>Total Users:</strong> 1,234
          </div>
          <div style={{ padding: '16px', background: '#f0fff0', borderRadius: '8px' }}>
            <strong>Active Sessions:</strong> 567
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'tab2',
    label: 'Users',
    icon: '👥',
    badge: 12,
    content: (
      <div style={{ padding: '20px' }}>
        <h3>👥 User Management</h3>
        <p>Manage your application users and their permissions.</p>
        <div style={{ marginTop: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Role</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>John Doe</td>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Admin</td>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>🟢 Active</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Jane Smith</td>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>User</td>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>🟢 Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 'tab3',
    label: 'Settings',
    icon: '⚙️',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>⚙️ Application Settings</h3>
        <p>Configure your application settings and preferences.</p>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            Enable notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            Dark mode
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            Auto-save
          </label>
        </div>
      </div>
    )
  },
  {
    id: 'tab4',
    label: 'Reports',
    icon: '📈',
    disabled: true,
    content: (
      <div style={{ padding: '20px' }}>
        <h3>📈 Reports & Analytics</h3>
        <p>View detailed reports and analytics data.</p>
      </div>
    )
  }
];

const manyTabs: TabItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `tab${i + 1}`,
  label: `Tab ${i + 1}`,
  icon: i % 2 === 0 ? '📄' : '📁',
  badge: i > 5 ? i - 5 : undefined,
  content: (
    <div style={{ padding: '20px' }}>
      <h3>Content for Tab {i + 1}</h3>
      <p>This is the content area for tab number {i + 1}.</p>
      <div style={{ marginTop: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
        Tab ID: <code>tab{i + 1}</code>
      </div>
    </div>
  )
}));

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    defaultActiveTab: 'tab1'
  }
};

export const Pills: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'pills',
    defaultActiveTab: 'tab1'
  }
};

export const Underline: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'underline',
    defaultActiveTab: 'tab1'
  }
};

export const Cards: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'cards',
    defaultActiveTab: 'tab1'
  }
};

export const VerticalLeft: Story = {
  args: {
    tabs: sampleTabs,
    position: 'left',
    defaultActiveTab: 'tab1'
  }
};

export const VerticalRight: Story = {
  args: {
    tabs: sampleTabs,
    position: 'right',
    defaultActiveTab: 'tab1'
  }
};

export const Bottom: Story = {
  args: {
    tabs: sampleTabs,
    position: 'bottom',
    defaultActiveTab: 'tab1'
  }
};

export const Small: Story = {
  args: {
    tabs: sampleTabs,
    size: 'small',
    defaultActiveTab: 'tab1'
  }
};

export const Large: Story = {
  args: {
    tabs: sampleTabs,
    size: 'large',
    defaultActiveTab: 'tab1'
  }
};

export const Scrollable: Story = {
  args: {
    tabs: manyTabs,
    scrollable: true,
    defaultActiveTab: 'tab1'
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are many tabs, enable scrollable to show scroll buttons for navigation.'
      }
    }
  }
};

export const Closable: Story = {
  args: {
    tabs: sampleTabs.map(tab => ({ ...tab, closable: true })),
    closable: true,
    defaultActiveTab: 'tab1',
    onTabClose: (tabId: string) => {
      console.log('Closing tab:', tabId);
    }
  }
};

export const WithAddButton: Story = {
  args: {
    tabs: sampleTabs,
    addable: true,
    defaultActiveTab: 'tab1',
    onTabAdd: () => {
      console.log('Adding new tab');
    }
  }
};

export const LazyLoading: Story = {
  args: {
    tabs: sampleTabs.map(tab => ({
      ...tab,
      content: (
        <div style={{ padding: '20px' }}>
          <h3>Lazy loaded content for {tab.label}</h3>
          <p>This content was loaded when the tab was first activated.</p>
          <div style={{ marginTop: '16px', padding: '12px', background: '#fff3cd', borderRadius: '4px' }}>
            ⚡ <strong>Lazy Loading:</strong> Content is only rendered when needed, improving performance!
          </div>
        </div>
      )
    })),
    lazyLoad: true,
    defaultActiveTab: 'tab1'
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    
    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('tab1')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: activeTab === 'tab1' ? '#2563eb' : '#f8f9fa',
              color: activeTab === 'tab1' ? 'white' : '#333',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
          >
            Go to Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('tab2')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: activeTab === 'tab2' ? '#2563eb' : '#f8f9fa',
              color: activeTab === 'tab2' ? 'white' : '#333',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
          >
            Go to Users
          </button>
          <button 
            onClick={() => setActiveTab('tab3')}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: activeTab === 'tab3' ? '#2563eb' : '#f8f9fa',
              color: activeTab === 'tab3' ? 'white' : '#333',
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}
          >
            Go to Settings
          </button>
        </div>
        <DynTabs
          {...args}
          tabs={sampleTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    );
  }
};

export const CustomContent: Story = {
  args: {
    tabs: [
      { 
        id: 'form', 
        label: 'Form', 
        icon: '📝' 
      },
      { 
        id: 'table', 
        label: 'Table', 
        icon: '📋' 
      },
      { 
        id: 'chart', 
        label: 'Chart', 
        icon: '📊' 
      }
    ],
    defaultActiveTab: 'form',
    renderTabContent: (tab) => {
      switch (tab.id) {
        case 'form':
          return (
            <div style={{ padding: '24px' }}>
              <h3>📝 Custom Form</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Name:</label>
                  <input type="text" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Email:</label>
                  <input type="email" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Message:</label>
                  <textarea style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px' }} />
                </div>
                <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Submit Form
                </button>
              </form>
            </div>
          );
        case 'table':
          return (
            <div style={{ padding: '24px' }}>
              <h3>📋 Custom Data Table</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Product</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Stock</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #dee2e6' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Laptop</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>$999</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>15</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>🟢 In Stock</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Mouse</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>$29</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>0</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>🔴 Out of Stock</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>Keyboard</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>$79</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>8</td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>🟡 Low Stock</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        case 'chart':
          return (
            <div style={{ padding: '24px' }}>
              <h3>📊 Custom Chart Visualization</h3>
              <div style={{ 
                width: '100%', 
                height: '300px', 
                background: 'linear-gradient(45deg, #e3f2fd, #bbdefb)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '8px',
                marginTop: '16px',
                border: '1px dashed #2196f3'
              }}>
                <div style={{ textAlign: 'center', color: '#1976d2' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                  <div style={{ fontSize: '18px', fontWeight: '500' }}>Chart Visualization</div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '8px' }}>Interactive charts would be rendered here</div>
                </div>
              </div>
            </div>
          );
        default:
          return <div>No content available</div>;
      }
    }
  }
};

export const VariantShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>Default Variant</h4>
        <DynTabs tabs={sampleTabs.slice(0, 3)} variant="default" defaultActiveTab="tab1" />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>Pills Variant</h4>
        <DynTabs tabs={sampleTabs.slice(0, 3)} variant="pills" defaultActiveTab="tab1" />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>Underline Variant</h4>
        <DynTabs tabs={sampleTabs.slice(0, 3)} variant="underline" defaultActiveTab="tab1" />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', color: '#333' }}>Cards Variant</h4>
        <DynTabs tabs={sampleTabs.slice(0, 3)} variant="cards" defaultActiveTab="tab1" />
      </div>
    </div>
  )
};

export const AccessibilityDemo: Story = {
  args: {
    tabs: [
      {
        id: 'accessible',
        label: 'Accessible Tab',
        icon: '♿',
        tooltip: 'This tab demonstrates accessibility features',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>♿ Accessibility Features</h3>
            <div style={{ marginTop: '16px' }}>
              <h4>Keyboard Navigation:</h4>
              <ul>
                <li><kbd>Tab</kbd> - Focus next tab</li>
                <li><kbd>Shift + Tab</kbd> - Focus previous tab</li>
                <li><kbd>Arrow Keys</kbd> - Navigate between tabs</li>
                <li><kbd>Home</kbd> - Go to first tab</li>
                <li><kbd>End</kbd> - Go to last tab</li>
                <li><kbd>Enter/Space</kbd> - Activate focused tab</li>
              </ul>
              
              <h4 style={{ marginTop: '16px' }}>ARIA Support:</h4>
              <ul>
                <li>Proper ARIA roles (tablist, tab, tabpanel)</li>
                <li>ARIA labels and descriptions</li>
                <li>Screen reader announcements</li>
                <li>Focus management</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'keyboard',
        label: 'Keyboard Nav',
        icon: '⌨️',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>⌨️ Try Keyboard Navigation!</h3>
            <p>Use your keyboard to navigate these tabs:</p>
            <div style={{ marginTop: '16px', padding: '16px', background: '#f0f8ff', borderRadius: '8px' }}>
              <strong>💡 Tip:</strong> Press Tab to focus the tab list, then use Arrow keys to navigate!
            </div>
          </div>
        )
      },
      {
        id: 'screen-reader',
        label: 'Screen Reader',
        icon: '🔊',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>🔊 Screen Reader Optimized</h3>
            <p>This tab system is optimized for screen readers with proper ARIA attributes.</p>
            <div style={{ marginTop: '16px', padding: '16px', background: '#f0fff0', borderRadius: '8px' }}>
              Screen readers will announce: "Tab list with 3 tabs. Tab 3 of 3, Screen Reader, selected."
            </div>
          </div>
        )
      }
    ],
    defaultActiveTab: 'accessible'
  },
  parameters: {
    docs: {
      description: {
        story: 'This example demonstrates the accessibility features of the DynTabs component. Try using keyboard navigation with Tab, Arrow keys, Home, End, Enter, and Space.'
      }
    }
  }
};