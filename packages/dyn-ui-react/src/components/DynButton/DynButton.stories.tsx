import type { Meta, StoryObj } from '@storybook/react';
import { DynButton } from './DynButton';

const meta: Meta<typeof DynButton> = {
  title: 'Inputs/DynButton',
  component: DynButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DynButton provides primary, secondary, and tertiary button variants with size, danger, loading, and icon support.',
      },
    },
  },
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Button variant.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size.',
    },
    danger: {
      control: 'boolean',
      description: 'Apply destructive styling.',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner.',
    },
    loadingText: {
      control: 'text',
      description: 'Accessible text announced while loading.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch button to full container width.',
    },
    hideOnMobile: {
      control: 'boolean',
      description: 'Hide the button on mobile viewports.',
    },
    iconOnlyOnMobile: {
      control: 'boolean',
      description: 'Collapse to icon-only presentation on mobile.',
    },
    icon: {
      control: 'text',
      description: 'Icon name or custom React node.',
    },
    label: {
      control: 'text',
      description: 'Button label text.',
    },
    ariaExpanded: {
      control: 'boolean',
      description: 'ARIA expanded state.',
    },
    ariaControls: {
      control: 'text',
      description: 'ID reference to the controlled element.',
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'ID reference describing the button.',
    },
    ariaPressed: {
      control: 'boolean',
      description: 'ARIA pressed/toggle state.',
    },
  },
  args: {
    label: 'Primary action',
    kind: 'primary',
    size: 'medium',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton label="Primary" kind="primary" />
      <DynButton label="Secondary" kind="secondary" />
      <DynButton label="Tertiary" kind="tertiary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <DynButton label="Small" size="small" />
      <DynButton label="Medium" size="medium" />
      <DynButton label="Large" size="large" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <DynButton label="Download" icon="download" />
      <DynButton label="Settings" icon="settings" kind="secondary" />
      <DynButton icon="help" ariaLabel="Help" kind="tertiary" />
    </div>
  ),
};

export const DangerStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton label="Delete" danger kind="primary" />
      <DynButton label="Remove" danger kind="secondary" />
      <DynButton label="Cancel" danger kind="tertiary" />
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton label="Loading" loading kind="primary" />
      <DynButton label="Processing" loading kind="secondary" />
      <DynButton label="Saving" loading kind="tertiary" />
    </div>
  ),
};

export const ResponsiveDesign: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p>Resize window to test responsive behavior:</p>
      <DynButton label="Hidden on mobile" hideOnMobile />
      <DynButton label="Settings" icon="settings" iconOnlyOnMobile />
      <DynButton
        label="Full text on desktop, icon on mobile"
        icon="download"
        iconOnlyOnMobile
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <DynButton label="Primary Dark" kind="primary" />
        <DynButton label="Secondary Dark" kind="secondary" />
        <DynButton label="Tertiary Dark" kind="tertiary" />
        <DynButton label="Danger Dark" kind="primary" danger />
      </div>
    </div>
  ),
};

export const EnhancedAccessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynButton
        label="Toggle Menu"
        ariaExpanded={false}
        ariaControls="main-menu"
      />
      <DynButton
        label="Save Draft"
        ariaDescribedBy="save-help"
      />
      <p id="save-help">Saves your work without publishing</p>
      <DynButton
        label="Favorite"
        ariaPressed={false}
        icon="heart"
      />
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynButton label="Default loading" loading />
      <DynButton
        label="Custom loading text"
        loading
        loadingText="Saving your changes..."
      />
      <DynButton
        label="Form submission"
        loading
        loadingText="Submitting form data..."
        kind="primary"
      />
    </div>
  ),
};
