import type { Meta, StoryObj } from '@storybook/react';
import { DynButton } from './DynButton';

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DynButton is a versatile button component that provides consistent styling and behavior across the application. It supports multiple variants (primary, secondary, tertiary), sizes, states (loading, disabled, danger), and comprehensive accessibility features. The component follows WCAG 2.1 AA guidelines and includes proper keyboard navigation, screen reader support, and focus management.\n\n## Features\n\n- **Multiple Variants**: Primary, secondary, and tertiary button styles\n- **Flexible Sizing**: Small, medium, and large size options\n- **State Management**: Loading, disabled, and danger states\n- **Icon Support**: String icon names or custom React nodes\n- **Accessibility**: WCAG 2.1 AA compliant with ARIA support\n- **Responsive Design**: Mobile-specific behaviors and touch targets\n- **Theme Support**: Light, dark, and high contrast themes\n- **Keyboard Navigation**: Space and Enter key activation',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content of the button',
    },
    icon: {
      control: 'text',
      description: 'Icon name (string) or custom React node to display',
    },
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Visual variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the button',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    danger: {
      control: 'boolean',
      description: 'Apply destructive/danger styling for dangerous actions',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner and disable interactions',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Custom text announced to screen readers during loading',
      table: {
        defaultValue: { summary: 'Loading…' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interactions',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand button to full container width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hideOnMobile: {
      control: 'boolean',
      description: 'Hide button on mobile viewports (<768px)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconOnlyOnMobile: {
      control: 'boolean',
      description: 'Show only icon on mobile while preserving accessibility',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers (auto-generated for icon-only buttons)',
    },
    'aria-expanded': {
      control: 'boolean',
      description: 'ARIA expanded state for disclosure buttons',
    },
    'aria-controls': {
      control: 'text',
      description: 'ID of element controlled by this button',
    },
    'aria-pressed': {
      control: 'boolean',
      description: 'ARIA pressed state for toggle buttons',
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
    },
  },
  args: {
    label: 'Button',
    kind: 'primary',
    size: 'medium',
    type: 'button',
    danger: false,
    loading: false,
    disabled: false,
    fullWidth: false,
    hideOnMobile: false,
    iconOnlyOnMobile: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default button configuration with primary styling and medium size.
 */
export const Default: Story = {
  args: {
    label: 'Default Button',
  },
};

/**
 * All button variants showing different visual styles.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <DynButton label="Primary" kind="primary" />
      <DynButton label="Secondary" kind="secondary" />
      <DynButton label="Tertiary" kind="tertiary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button variants provide different visual emphasis levels. Primary for main actions, secondary for supporting actions, and tertiary for subtle actions.',
      },
    },
  },
};

/**
 * Interactive examples showing various button states and behaviors.
 */
export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton label="Small" size="small" />
          <DynButton label="Medium" size="medium" />
          <DynButton label="Large" size="large" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>With Icons</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <DynButton label="Download" icon="download" />
          <DynButton label="Settings" icon="settings" kind="secondary" />
          <DynButton icon="help" aria-label="Help" kind="tertiary" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>States</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <DynButton label="Loading" loading />
          <DynButton label="Disabled" disabled />
          <DynButton label="Danger" danger />
          <DynButton label="Full Width" fullWidth />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Danger Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton label="Delete" danger kind="primary" />
          <DynButton label="Remove" danger kind="secondary" />
          <DynButton label="Cancel" danger kind="tertiary" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive examples showcasing different sizes, icon combinations, states, and danger variants. Notice how the button maintains proper accessibility and focus management across all variants.',
      },
    },
  },
};

/**
 * Accessibility features and ARIA attributes demonstration.
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>ARIA Attributes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynButton
            label="Toggle Menu"
            aria-expanded={false}
            aria-controls="navigation-menu"
            icon="menu"
          />
          <DynButton
            label="Favorite"
            aria-pressed={false}
            icon="heart"
            kind="secondary"
          />
          <DynButton
            label="Save Draft"
            aria-describedby="save-help"
            icon="save"
            kind="tertiary"
          />
        </div>
        <p id="save-help" style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Saves your work without publishing it
        </p>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Loading Announcements</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <DynButton label="Default loading" loading />
          <DynButton
            label="Custom announcement"
            loading
            loadingText="Saving your changes..."
            kind="secondary"
          />
        </div>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Loading buttons announce their state to screen readers
        </p>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Icon-Only Buttons</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <DynButton icon="edit" aria-label="Edit item" />
          <DynButton icon="delete" aria-label="Delete item" danger kind="secondary" />
          <DynButton icon="share" aria-label="Share content" kind="tertiary" />
        </div>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Icon-only buttons automatically receive accessible labels
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including ARIA attributes for disclosure patterns, toggle states, loading announcements, and proper labeling for icon-only buttons. All examples are fully keyboard navigable and screen reader compatible.',
      },
    },
  },
};

/**
 * Dark theme variants and theming capabilities.
 */
export const DarkTheme: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '2rem',
        background: '#1a1a1a',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      <div>
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Button Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <DynButton label="Primary" kind="primary" />
          <DynButton label="Secondary" kind="secondary" />
          <DynButton label="Tertiary" kind="tertiary" />
        </div>
      </div>

      <div>
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>Danger States</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <DynButton label="Delete" kind="primary" danger />
          <DynButton label="Remove" kind="secondary" danger />
          <DynButton label="Cancel" kind="tertiary" danger />
        </div>
      </div>

      <div>
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>With Icons & States</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <DynButton label="Download" icon="download" />
          <DynButton label="Loading" loading kind="secondary" />
          <DynButton label="Disabled" disabled kind="tertiary" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    ackgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Dark theme implementation showing how buttons adapt their colors and contrast ratios for optimal visibility and accessibility in dark environments. All accessibility standards are maintained across themes.',
      },
    },
  },
};

/**
 * Responsive behavior demonstration for mobile and desktop.
 */
export const ResponsiveBehavior: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile Utilities</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
          Resize your browser window or use device preview to see responsive behavior
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynButton label="Hidden on mobile" hideOnMobile icon="desktop" />
          <DynButton label="Settings" icon="settings" iconOnlyOnMobile />
          <DynButton
            label="Download Report"
            icon="download"
            iconOnlyOnMobile
            kind="secondary"
          />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Touch Targets</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
          Buttons automatically meet minimum touch target requirements (44px) on mobile
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <DynButton icon="edit" aria-label="Edit" size="small" />
          <DynButton icon="share" aria-label="Share" size="medium" />
          <DynButton icon="bookmark" aria-label="Bookmark" size="large" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Responsive design features including mobile-specific utilities like `hideOnMobile` and `iconOnlyOnMobile`, plus automatic touch target sizing for better mobile accessibility.',
      },
    },
  },
};
