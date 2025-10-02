import type { Meta, StoryObj } from '@storybook/react'
import { DynButton } from './DynButton'

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# DynButton Component

DynButton je osnovna komponenta za dugmad u Dyn UI sistemu.

## Features
- ✅ Tri kind varijante: primary, secondary, tertiary
- ✅ Tri veličine: small, medium, large  
- ✅ Loading i disabled stanja
- ✅ Danger varijanta
- ✅ Centralizovani CSS iz dyn-ui.css
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Stil dugmeta',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Veličina dugmeta',
    },
    label: {
      control: 'text',
      description: 'Tekst dugmeta',
    },
    danger: {
      control: 'boolean',
      description: 'Da li je dugme u opasnom stanju',
    },
    disabled: {
      control: 'boolean',
      description: 'Da li je dugme onemogućeno',
    },
    loading: {
      control: 'boolean',
      description: 'Loading stanje',
    },
    onClick: {
      action: 'clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    kind: 'primary',
    label: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    kind: 'secondary',
    label: 'Secondary Button',
  },
}

export const Tertiary: Story = {
  args: {
    kind: 'tertiary',
    label: 'Tertiary Button',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', maxWidth: '600px' }}>
      <div>
        <h3>Button Kinds</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <DynButton kind="primary" label="Primary" />
          <DynButton kind="secondary" label="Secondary" />
          <DynButton kind="tertiary" label="Tertiary" />
        </div>
      </div>
      
      <div>
        <h3>Button Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <DynButton kind="primary" label="Small" size="small" />
          <DynButton kind="primary" label="Medium" size="medium" />
          <DynButton kind="primary" label="Large" size="large" />
        </div>
      </div>
      
      <div>
        <h3>States</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <DynButton kind="primary" label="Normal" />
          <DynButton kind="primary" label="Danger" danger />
          <DynButton kind="primary" label="Disabled" disabled />
          <DynButton kind="primary" label="Loading..." loading />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}