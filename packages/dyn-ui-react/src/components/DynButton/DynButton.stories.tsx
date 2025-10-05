import type { Meta, StoryObj } from '@storybook/react';
import { DynButton } from './DynButton';
import { DynButtonProps } from './DynButton.types';

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with icon support and multiple variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    danger: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<DynButtonProps>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    kind: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    kind: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    label: 'Tertiary Button',
    kind: 'tertiary',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Button with Icon',
    icon: 'add',
    kind: 'primary',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'add',
    kind: 'primary',
    ariaLabel: 'Add item',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    loading: true,
    kind: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
    kind: 'primary',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    danger: true,
    kind: 'primary',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynButton label="Small" size="small" />
      <DynButton label="Medium" size="medium" />
      <DynButton label="Large" size="large" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <DynButton label="Primary" kind="primary" />
        <DynButton label="Secondary" kind="secondary" />
        <DynButton label="Tertiary" kind="tertiary" />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <DynButton label="Danger Primary" kind="primary" danger />
        <DynButton label="Danger Secondary" kind="secondary" danger />
        <DynButton label="Danger Tertiary" kind="tertiary" danger />
      </div>
    </div>
  ),
};