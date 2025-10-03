import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynButton } from './DynButton';
import { DynButtonProps } from './DynButton.types';

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# DynButton Component

Production-ready button component following the DYN UI specification.

## Features
- Three kinds: primary, secondary, tertiary
- Three sizes: small, medium, large
- Loading states with spinner animation
- Icon support (string names or React components)
- Danger state for destructive actions
- Full accessibility compliance (ARIA)
- Keyboard navigation support

## Usage

\`\`\`tsx
// Basic usage
<DynButton kind="primary" label="Save Changes" onClick={handleSave} />

// With icon
<DynButton kind="secondary" icon="download" label="Download" />

// Icon only
<DynButton kind="tertiary" icon="settings" ariaLabel="Settings" />

// Loading state
<DynButton kind="primary" label="Saving..." loading={true} />

// Danger state
<DynButton kind="primary" label="Delete" danger={true} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text label',
    },
    icon: {
      control: 'text',
      description: 'Icon name or React component',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    danger: {
      control: 'boolean',
      description: 'Danger/destructive state',
    },
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Button variant/style',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
    ariaExpanded: {
      control: 'boolean',
      description: 'ARIA expanded state',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    onClick: { action: 'clicked' },
    onBlur: { action: 'blurred' },
  },
};

export default meta;
type Story = StoryObj<DynButtonProps>;

// Default story
export const Default: Story = {
  args: {
    label: 'Button',
    kind: 'primary',
    size: 'medium',
  },
};

// All button kinds
export const ButtonKinds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton kind="primary" label="Primary" />
      <DynButton kind="secondary" label="Secondary" />
      <DynButton kind="tertiary" label="Tertiary" />
    </div>
  ),
};

// All button sizes
export const ButtonSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton kind="primary" label="Small" size="small" />
      <DynButton kind="primary" label="Medium" size="medium" />
      <DynButton kind="primary" label="Large" size="large" />
    </div>
  ),
};

// Danger states
export const DangerStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton kind="primary" label="Delete" danger />
      <DynButton kind="secondary" label="Remove" danger />
      <DynButton kind="tertiary" label="Cancel" danger />
    </div>
  ),
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton kind="primary" label="Saving..." loading />
      <DynButton kind="secondary" label="Loading..." loading />
      <DynButton kind="tertiary" loading ariaLabel="Loading" />
    </div>
  ),
};

// Disabled states
export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton kind="primary" label="Disabled" disabled />
      <DynButton kind="secondary" label="Disabled" disabled />
      <DynButton kind="tertiary" label="Disabled" disabled />
    </div>
  ),
};

// With icons (using placeholder for now)
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton kind="primary" icon="download" label="Download" />
      <DynButton kind="secondary" icon="settings" label="Settings" />
      <DynButton kind="tertiary" icon="help" />
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  args: {
    label: 'Click me',
    kind: 'primary',
    size: 'medium',
    onClick: () => alert('Button clicked!'),
  },
};

// Accessibility example
export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton
        kind="primary"
        icon="settings"
        ariaLabel="Open settings menu"
        ariaExpanded={false}
      />
      <DynButton
        kind="secondary"
        label="Toggle Panel"
        ariaExpanded={true}
      />
    </div>
  ),
};

// Comprehensive showcase
export const Showcase: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gap: '2rem',
      padding: '2rem',
      background: 'var(--color-background)'
    }}>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Button Kinds</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton kind="primary" label="Primary" />
          <DynButton kind="secondary" label="Secondary" />
          <DynButton kind="tertiary" label="Tertiary" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Danger States</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton kind="primary" label="Delete" danger />
          <DynButton kind="secondary" label="Remove" danger />
          <DynButton kind="tertiary" label="Cancel" danger />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton kind="primary" label="Small" size="small" />
          <DynButton kind="primary" label="Medium" size="medium" />
          <DynButton kind="primary" label="Large" size="large" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>States</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton kind="primary" label="Normal" />
          <DynButton kind="primary" label="Loading..." loading />
          <DynButton kind="primary" label="Disabled" disabled />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>With Icons</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton kind="primary" icon="download" label="Download" />
          <DynButton kind="secondary" icon="settings" label="Settings" />
          <DynButton kind="tertiary" icon="help" ariaLabel="Help" />
        </div>
      </div>

    </div>
  ),
};
