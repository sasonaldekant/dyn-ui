import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from './DynAvatar';
import type { DynAvatarProps } from './DynAvatar.types';

const meta: Meta<typeof DynAvatar> = {
  title: 'Components/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for displaying user profile pictures, initials, or icons with status indicators and interactive capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar using design token scale',
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of the avatar',
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'busy', 'away'],
      description: 'Status indicator',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state',
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text for accessibility',
    },
    initials: {
      control: { type: 'text' },
      description: 'Initials to display when no image',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler - makes avatar interactive',
    },
  },
};

export default meta;
type Story = StoryObj<DynAvatarProps>;

// Default story
export const Default: Story = {
  args: {
    alt: 'User avatar',
    initials: 'JD',
    size: 'md',
    shape: 'circle',
  },
};

// With image
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    size: 'md',
    shape: 'circle',
  },
};

// All sizes demonstration
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <DynAvatar {...args} size="xs" alt="Extra Small" initials="XS" />
      <DynAvatar {...args} size="sm" alt="Small" initials="SM" />
      <DynAvatar {...args} size="md" alt="Medium" initials="MD" />
      <DynAvatar {...args} size="lg" alt="Large" initials="LG" />
      <DynAvatar {...args} size="xl" alt="Extra Large" initials="XL" />
    </div>
  ),
  args: {
    shape: 'circle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar component in all available sizes using design token scale.',
      },
    },
  },
};

// Different shapes
export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar {...args} shape="circle" alt="Circle avatar" initials="CI" />
      <DynAvatar {...args} shape="square" alt="Square avatar" initials="SQ" />
      <DynAvatar {...args} shape="rounded" alt="Rounded avatar" initials="RO" />
    </div>
  ),
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar component with different shapes: circle, square, and rounded.',
      },
    },
  },
};

// Status indicators
export const WithStatus: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <DynAvatar {...args} status="online" alt="Online user" initials="ON" />
      <DynAvatar {...args} status="away" alt="Away user" initials="AW" />
      <DynAvatar {...args} status="busy" alt="Busy user" initials="BU" />
      <DynAvatar {...args} status="offline" alt="Offline user" initials="OF" />
    </div>
  ),
  args: {
    size: 'lg',
    shape: 'circle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar component with all available status indicators.',
      },
    },
  },
};

// Interactive avatar
export const Interactive: Story = {
  args: {
    alt: 'Clickable avatar',
    initials: 'CU',
    size: 'lg',
    shape: 'circle',
    onClick: () => alert('Avatar clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive avatar that responds to clicks and keyboard navigation.',
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    alt: 'Loading avatar',
    loading: true,
    size: 'md',
    shape: 'circle',
  },
};

// Error state
export const Error: Story = {
  args: {
    src: 'https://invalid-image-url.jpg',
    alt: 'Error fallback',
    initials: 'ER',
    error: true,
    size: 'md',
    shape: 'circle',
  },
  parameters: {
    docs: {
      description: {
        story: 'When image fails to load, avatar gracefully falls back to initials.',
      },
    },
  },
};

// Complex example - image with status and interaction
export const ComplexExample: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    alt: 'Profile picture',
    initials: 'JS',
    status: 'online',
    size: 'xl',
    shape: 'circle',
    onClick: () => console.log('Profile clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex avatar example with image, status indicator, and interactive behavior.',
      },
    },
  },
};