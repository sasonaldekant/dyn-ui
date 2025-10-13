/**
 * DynTabs Storybook Stories
 * Comprehensive examples following DynAvatar documentation pattern
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { within, userEvent, expect } from '@storybook/test';
import { DynTabs } from './DynTabs';
import { DynTabItem } from './DynTabs.types';

const meta: Meta<typeof DynTabs> = {
  title: 'Components/DynTabs',
  component: DynTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DynTabs

A flexible and accessible tab navigation component that supports multiple variants, positions, and advanced features.

## Features

- \u2728 **Full Accessibility** - WCAG 2.1 AA compliant with comprehensive keyboard navigation
- \ud83c\udfa8 **Design Token Integration** - Uses --dyn-* tokens with proper fallbacks
- \ud83d\udcf1 **Responsive Design** - Mobile-first approach with touch-friendly interactions
- \u26a1 **Performance Optimized** - Lazy loading, memoization, and efficient re-renders
- \ud83c\udfaf **Flexible API** - Controlled and uncontrolled modes with imperative methods
- \ud83d\ude80 **Interactive Features** - Closable tabs, scrollable overflow, dynamic tab addition

## Usage

\`\`\`tsx
const tabItems = [
  { id: 'home', label: 'Home', content: <HomePage /> },
  { id: 'about', label: 'About', content: <AboutPage /> },
  { id: 'contact', label: 'Contact', content: <ContactPage /> }
];

<DynTabs 
  items={tabItems}
  variant="underlined"
  onChange={(tabId) => console.log('Active:', tabId)}
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of tabs relative to content'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'underlined', 'pills', 'bordered'],
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of tab elements'
    },
    scrollable: {
      control: 'boolean',
      description: 'Enable horizontal scrolling for overflow tabs'
    },
    lazy: {
      control: 'boolean',
      description: 'Enable lazy loading of tab content'
    },
    closable: {
      control: 'boolean',
      description: 'Allow tabs to be closed'
    },
    addable: {
      control: 'boolean',
      description: 'Show add tab button'
    },
    animated: {
      control: 'boolean',
      description: 'Enable tab transition animations'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynTabs>;

// Sample data following DynAvatar pattern
const defaultItems: DynTabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <span>\ud83c\udfe0</span>,
    content: (
      <div>
        <h3>Welcome Home</h3>
        <p>This is the home tab content with comprehensive information and examples.</p>
        <p>The content demonstrates proper typography and spacing using design tokens.</p>
      </div>
    )
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <span>\ud83d\udc64</span>,
    badge: '3',
    content: (
      <div>
        <h3>User Profile</h3>
        <p>User profile information and settings.</p>
        <p>This tab includes a badge showing 3 notifications.</p>
      </div>
    )
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <span>\u2699\ufe0f</span>,
    content: (
      <div>
        <h3>Application Settings</h3>
        <p>Configure your application preferences and options.</p>
      </div>
    )
  },
  {
    id: 'disabled',
    label: 'Disabled Tab',
    content: <div>This content is not accessible</div>,
    disabled: true
  }
];

// Default story
export const Default: Story = {
  args: {
    items: defaultItems
  }
};

// Size variants following DynAvatar pattern
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div>
        <h4>Small Size</h4>
        <DynTabs items={defaultItems.slice(0, 3)} size="small" />
      </div>
      <div>
        <h4>Medium Size (Default)</h4>
        <DynTabs items={defaultItems.slice(0, 3)} size="medium" />
      </div>
      <div>
        <h4>Large Size</h4>
        <DynTabs items={defaultItems.slice(0, 3)} size="large" />
      </div>
    </div>
  )
};

// Interactive features following DynAvatar InteractiveAvatars pattern
export const InteractiveTabs: Story = {
  render: () => {
    const [items, setItems] = useState(
      defaultItems.slice(0, 3).map(item => ({ ...item, closable: true }))
    );
    const [activeTab, setActiveTab] = useState('home');
    const [tabCounter, setTabCounter] = useState(4);

    const handleTabClose = (tabId: string) => {
      setItems(prev => prev.filter(item => item.id !== tabId));
      if (activeTab === tabId) {
        const remainingTabs = items.filter(item => item.id !== tabId && !item.disabled);
        if (remainingTabs.length > 0) {
          setActiveTab(remainingTabs[0].id);
        }
      }
    };

    const handleTabAdd = () => {
      const newId = `dynamic-tab-${tabCounter}`;
      setItems(prev => [...prev, {
        id: newId,
        label: `Tab ${tabCounter}`,
        content: <div>This tab was added dynamically! Content for tab {tabCounter}.</div>,
        closable: true,
        icon: <span>\u2728</span>
      }]);
      setTabCounter(prev => prev + 1);
    };

    return (
      <DynTabs
        items={items}
        activeTab={activeTab}
        onChange={setActiveTab}
        onTabClose={handleTabClose}
        onTabAdd={handleTabAdd}
        closable
        addable
        animated
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive tabs with dynamic add/close functionality. Try adding new tabs and closing existing ones.'
      }
    }
  }
};

// Accessibility demonstration following DynAvatar pattern
export const AccessibilityShowcase: Story = {
  args: {
    items: defaultItems,
    'aria-label': 'Main navigation tabs'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test keyboard navigation
    const firstTab = canvas.getByRole('tab', { name: /home/i });
    
    await userEvent.click(firstTab);
    await expect(firstTab).toHaveFocus();
    
    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowRight}');
    
    const secondTab = canvas.getByRole('tab', { name: /profile/i });
    await expect(secondTab).toHaveFocus();
    
    // Activate with Enter key
    await userEvent.keyboard('{Enter}');
    await expect(secondTab).toHaveAttribute('aria-selected', 'true');
  },
  parameters: {
    docs: {
      description: {
        story: `
**Accessibility Features Demonstrated:**
- Full keyboard navigation (Arrow keys, Home, End, Enter, Space)
- Proper ARIA attributes (roles, states, properties)
- Screen reader announcements for state changes
- Roving tabindex pattern implementation
- Focus management and visual indicators
- Disabled state handling
        `
      }
    }
  }
};

// Dark theme showcase following DynAvatar pattern
export const DarkTheme: Story = {
  args: {
    items: defaultItems
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'DynTabs automatically adapts to dark theme using design tokens and CSS custom properties.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ 
        backgroundColor: 'var(--dyn-color-surface-dark, #111827)',
        color: 'var(--dyn-color-text-primary-dark, #f9fafb)',
        padding: '2rem',
        borderRadius: '0.5rem',
        minHeight: '400px'
      }}>
        <Story />
      </div>
    )
  ]
};

// Variant showcase
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div>
        <h4>Default Variant</h4>
        <DynTabs items={defaultItems.slice(0, 3)} variant="default" />
      </div>
      <div>
        <h4>Underlined Variant</h4>
        <DynTabs items={defaultItems.slice(0, 3)} variant="underlined" />
      </div>
      <div>
        <h4>Pills Variant</h4>
        <DynTabs items={defaultItems.slice(0, 3)} variant="pills" />
      </div>
      <div>
        <h4>Bordered Variant</h4>
        <DynTabs items={defaultItems.slice(0, 3)} variant="bordered" />
      </div>
    </div>
  )
};

// Error states
export const ErrorStates: Story = {
  render: () => {
    const [hasError, setHasError] = useState(false);
    
    const itemsWithError: DynTabItem[] = [
      {
        id: 'normal',
        label: 'Normal Tab',
        content: <div>Normal content works perfectly</div>
      },
      {
        id: 'error-tab',
        label: 'Error Demo',
        content: hasError ? (
          <div style={{ 
            color: 'var(--dyn-color-error, #ef4444)',
            padding: 'var(--dyn-spacing-lg, 1rem)',
            textAlign: 'center'
          }}>
            \u274c Error loading content
            <br />
            <button 
              onClick={() => setHasError(false)}
              style={{ 
                marginTop: 'var(--dyn-spacing-md, 0.75rem)',
                padding: 'var(--dyn-spacing-sm, 0.5rem) var(--dyn-spacing-md, 0.75rem)',
                backgroundColor: 'var(--dyn-color-primary, #3b82f6)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--dyn-border-radius-md, 0.375rem)',
                cursor: 'pointer'
              }}
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <div>
            <p>Click below to simulate a content loading error:</p>
            <button 
              onClick={() => setHasError(true)}
              style={{ 
                padding: 'var(--dyn-spacing-sm, 0.5rem) var(--dyn-spacing-md, 0.75rem)',
                backgroundColor: 'var(--dyn-color-error, #ef4444)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--dyn-border-radius-md, 0.375rem)',
                cursor: 'pointer'
              }}
            >
              Trigger Error State
            </button>
          </div>
        )
      }
    ];

    return <DynTabs items={itemsWithError} variant="bordered" />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of handling error states within tab content using design tokens for consistent styling.'
      }
    }
  }
};