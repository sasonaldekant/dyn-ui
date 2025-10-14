import type { Meta, StoryObj } from '@storybook/react';
import { DynIcon } from '../DynIcon';
import { DynBadge } from './DynBadge';

const meta: Meta<typeof DynBadge> = {
  title: 'Components/DynBadge',
  component: DynBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DynBadge displays counts, status indicators, and semantic labels using design tokens and accessibility best practices. Follows enterprise-grade standards for consistency and maintainability.'
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
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive badges'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers'
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

export const Default: Story = {
  args: {}
};

export const Variants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <DynBadge variant="solid">Solid</DynBadge>
        <DynBadge variant="soft">Soft</DynBadge>
        <DynBadge variant="outline">Outline</DynBadge>
        <DynBadge variant="dot" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants: solid, soft, outline, and dot.'
      }
    }
  }
};

export const Sizes: Story = {
  name: 'Size Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge size="small">Small</DynBadge>
      <DynBadge size="medium">Medium</DynBadge>
      <DynBadge size="large">Large</DynBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available size variants following design token scale.'
      }
    }
  }
};

export const Colors: Story = {
  name: 'Color Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge color="primary">Primary</DynBadge>
      <DynBadge color="secondary">Secondary</DynBadge>
      <DynBadge color="success">Success</DynBadge>
      <DynBadge color="warning">Warning</DynBadge>
      <DynBadge color="danger">Danger</DynBadge>
      <DynBadge color="info">Info</DynBadge>
      <DynBadge color="neutral">Neutral</DynBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Semantic color variants using design tokens.'
      }
    }
  }
};

export const CountBadges: Story = {
  name: 'Count Display',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynBadge count={3} />
      <DynBadge count={99} />
      <DynBadge count={150} maxCount={99} />
      <DynBadge count={0} showZero />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Count badges with maxCount limits and zero display options.'
      }
    }
  }
};

export const WithIcons: Story = {
  name: 'Icon Integration',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge startIcon={<DynIcon icon="star" />}>Featured</DynBadge>
      <DynBadge endIcon={<DynIcon icon="arrow-right" />}>Next</DynBadge>
      <DynBadge startIcon={<DynIcon icon="check" />} color="success">
        Verified
      </DynBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with start and end icons for enhanced visual communication.'
      }
    }
  }
};

export const StatusIndicators: Story = {
  name: 'Status Overlays',
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: 64, height: 64, background: '#f0f0f0', borderRadius: 8 }}>
        <DynBadge variant="dot" color="success" position="topRight" />
        <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: '0.75rem' }}>Online</span>
      </div>
      <div style={{ position: 'relative', width: 64, height: 64, background: '#f0f0f0', borderRadius: 8 }}>
        <DynBadge count={3} color="danger" position="topRight" countDescription="Alerts" />
        <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: '0.75rem' }}>Alerts</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Positioned badges for status indicators and notification overlays.'
      }
    }
  }
};

export const Interactive: Story = {
  name: 'Interactive Behavior',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge onClick={() => alert('Badge clicked!')} aria-label="Clickable badge">Clickable</DynBadge>
      <DynBadge
        count={5}
        onClick={() => alert('5 notifications')}
        countDescription="Notifications"
        aria-label="View notifications"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges with click handlers and proper keyboard navigation support.'
      }
    }
  }
};

export const Animated: Story = {
  name: 'Animation Effects',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge animated>Animated</DynBadge>
      <DynBadge pulse color="danger">
        Pulsing
      </DynBadge>
      <DynBadge animated pulse count={1} color="info" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animation effects for attention-grabbing notifications.'
      }
    }
  }
};

export const DarkTheme: Story = {
  name: 'Dark Theme Support',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Badge appearance in dark theme using CSS custom properties and media queries.'
      }
    }
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
  name: 'Accessibility Features',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <DynBadge
        count={12}
        countDescription="Unread messages"
        aria-describedby="message-description"
        aria-label="12 unread messages"
      />
      <p id="message-description" style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
        You have 12 unread messages in your inbox.
      </p>
      <DynBadge aria-label="Active status indicator">Active</DynBadge>
      <DynBadge 
        onClick={() => alert('Accessible click!')}
        aria-label="Interactive badge with keyboard support"
        onKeyDown={(e) => console.log('Key pressed:', e.key)}
      >
        Keyboard Accessible
      </DynBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features including ARIA attributes, screen reader announcements, and keyboard navigation.'
      }
    }
  }
};

export const Playground: Story = {
  name: 'Interactive Playground',
  args: {
    count: 8,
    countDescription: 'Notifications',
    animated: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with different badge configurations.'
      }
    }
  }
};