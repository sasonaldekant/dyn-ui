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
    fullWidth: {
      control: 'boolean',
      description: 'Stretch button to full container width.',
    },
    icon: {
      control: 'text',
      description: 'Icon name or custom React node.',
    },
    label: {
      control: 'text',
      description: 'Button label text.',
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
