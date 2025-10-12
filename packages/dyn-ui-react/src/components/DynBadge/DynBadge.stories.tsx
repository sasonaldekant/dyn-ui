import type { Meta, StoryObj } from '@storybook/react';
import { DynIcon } from '../DynIcon';
import { DynBadge } from './DynBadge';

const meta: Meta<typeof DynBadge> = {
  title: 'Display/DynBadge',
  component: DynBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DynBadge displays counts, status indicators, and semantic labels using design tokens and accessibility best practices.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge content'
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'dot'],
      description: 'Visual variant of the badge'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Semantic color token'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Badge size variant'
    },
    count: {
      control: 'number',
      description: 'Numeric value to display when using counter badges'
    },
    countDescription: {
      control: 'text',
      description: 'Accessible description announced for count badges'
    },
    maxCount: {
      control: 'number',
      description: 'Maximum value before showing the + indicator'
    },
    showZero: {
      control: 'boolean',
      description: 'Whether to display the badge when the count is 0'
    },
    position: {
      control: 'select',
      options: ['topRight', 'topLeft', 'bottomRight', 'bottomLeft'],
      description: 'Position of the badge when used as an overlay'
    },
    animated: {
      control: 'boolean',
      description: 'Apply appear animation to the badge'
    },
    pulse: {
      control: 'boolean',
      description: 'Apply pulse animation for notifications'
    }
  },
  args: {
    children: 'New',
    variant: 'solid',
    color: 'primary',
    size: 'medium',
    maxCount: 99
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    count: 8,
    countDescription: 'Notifications'
  }
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <DynBadge variant="solid">Solid</DynBadge>
        <DynBadge variant="soft">Soft</DynBadge>
        <DynBadge variant="outline">Outline</DynBadge>
        <DynBadge variant="dot" />
      </div>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge size="small">Small</DynBadge>
      <DynBadge size="medium">Medium</DynBadge>
      <DynBadge size="large">Large</DynBadge>
    </div>
  )
};

export const CountBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynBadge count={3} />
      <DynBadge count={99} />
      <DynBadge count={150} maxCount={99} />
      <DynBadge count={0} showZero />
    </div>
  )
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge startIcon={<DynIcon icon="star" />}>Featured</DynBadge>
      <DynBadge endIcon={<DynIcon icon="arrow-right" />}>Next</DynBadge>
      <DynBadge startIcon={<DynIcon icon="check" />} color="success">
        Verified
      </DynBadge>
    </div>
  )
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: 64, height: 64, background: '#f0f0f0', borderRadius: 8 }}>
        <DynBadge variant="dot" color="success" position="topRight" />
        <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: '0.75rem' }}>Online</span>
      </div>
      <div style={{ position: 'relative', width: 64, height: 64, background: '#f0f0f0', borderRadius: 8 }}>
        <DynBadge count={3} color="danger" position="topRight" />
        <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: '0.75rem' }}>Alerts</span>
      </div>
    </div>
  )
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge onClick={() => alert('Badge clicked!')}>Clickable</DynBadge>
      <DynBadge
        count={5}
        onClick={() => alert('5 notifications')}
        countDescription="Notifications"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges with click handlers and keyboard navigation.'
      }
    }
  }
};

export const Animated: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge animated>Animated</DynBadge>
      <DynBadge pulse color="danger">
        Pulsing
      </DynBadge>
      <DynBadge animated pulse count={1} color="info" />
    </div>
  )
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <DynBadge color="primary">Primary</DynBadge>
        <DynBadge variant="soft" color="success">
          Soft Success
        </DynBadge>
        <DynBadge variant="outline" color="warning">
          Outline Warning
        </DynBadge>
        <DynBadge variant="dot" color="danger" />
        <DynBadge count={9} color="info" />
      </div>
    </div>
  )
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <DynBadge
        count={12}
        countDescription="Unread messages"
        ariaDescribedBy="message-description"
      />
      <p id="message-description" style={{ margin: 0 }}>
        You have 12 unread messages in your inbox.
      </p>
      <DynBadge ariaLabel="Status indicator">Active</DynBadge>
    </div>
  )
};
