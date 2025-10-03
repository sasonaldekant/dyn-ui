import type { Meta, StoryObj } from '@storybook/react';
import { DynBadge } from './index';
import { DYN_COLOR_PALETTE } from '../../types/badge.types';

const meta: Meta<typeof DynBadge> = {
  title: 'Display Components/DynBadge',
  component: DynBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'DynBadge displays small status indicators with customizable colors, icons, and values. Supports DYN color palette and auto-icons based on status.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 150 },
      description: 'Numeric value to display (shows 99+ for values > 99)'
    },
    color: {
      control: { type: 'select' },
      options: [...DYN_COLOR_PALETTE, 'custom'],
      description: 'Theme color or custom hex color'
    },
    status: {
      control: { type: 'select' },
      options: ['disabled', 'negative', 'positive', 'warning'],
      description: 'Status type for semantic coloring and auto-icons'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Badge size variant'
    },
    icon: {
      control: { type: 'select' },
      options: [false, true, 'ok', 'close', 'warning', 'user'],
      description: 'Icon display: false=none, true=auto status icon, string=custom icon'
    },
    showBorder: {
      control: 'boolean',
      description: 'Show white border around badge'
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic badge with value
export const Default: Story = {
  args: {
    value: 5,
    color: 'color-07',
    size: 'medium'
  },
};

// Status badges with auto-icons
export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynBadge status="positive" icon={true} value={3} />
      <DynBadge status="negative" icon={true} value={12} />
      <DynBadge status="warning" icon={true} value={99} />
      <DynBadge status="disabled" icon={true} value={0} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status badges with automatic icons: positive (✓), negative (✗), warning (⚠), disabled (-)'
      }
    }
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynBadge size="small" value={5} color="color-01" />
      <DynBadge size="medium" value={25} color="color-02" />
      <DynBadge size="large" value={125} color="color-03" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge size variants: small, medium, large. Values over 99 display as "99+"'
      }
    }
  }
};

// Color palette showcase
export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '400px' }}>
      {DYN_COLOR_PALETTE.map((color, index) => (
        <DynBadge key={color} color={color} value={index + 1} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete DYN color palette (color-01 through color-12)'
      }
    }
  }
};

// Icon-only badges
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynBadge icon="ok" color="color-02" />
      <DynBadge icon="close" color="color-03" />
      <DynBadge icon="warning" color="color-04" />
      <DynBadge icon="user" color="color-05" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only badges without value display'
      }
    }
  }
};

// With border variant
export const WithBorder: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '2rem', backgroundColor: '#f0f0f0' }}>
      <DynBadge value={5} color="color-01" showBorder={true} />
      <DynBadge icon="ok" color="color-02" showBorder={true} />
      <DynBadge status="positive" icon={true} value={10} showBorder={true} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with white border - useful on colored backgrounds'
      }
    }
  }
};

// Custom color
export const CustomColor: Story = {
  args: {
    value: 42,
    color: '#9c27b0',
    size: 'large'
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with custom hex color instead of theme color'
      }
    }
  }
};

// High values (99+ display)
export const HighValues: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynBadge value={99} color="color-07" />
      <DynBadge value={100} color="color-08" />
      <DynBadge value={999} color="color-09" />
      <DynBadge value={1543} color="color-10" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Values over 99 are displayed as "99+" to maintain badge size'
      }
    }
  }
};
