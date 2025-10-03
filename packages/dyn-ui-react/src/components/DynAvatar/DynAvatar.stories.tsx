import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from './index';
import { AVATAR_SIZES } from '../../types/avatar.types';

const meta: Meta<typeof DynAvatar> = {
  title: 'Display Components/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'DynAvatar displays user profile pictures with automatic fallback to initials or placeholder icon. Includes error handling and loading states.'
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL'
    },
    size: {
      control: { type: 'select' },
      options: Object.keys(AVATAR_SIZES) as Array<keyof typeof AVATAR_SIZES>,
      description: 'Avatar size variant'
    },
    loading: {
      control: { type: 'select' },
      options: ['eager', 'lazy'],
      description: 'Image loading strategy'
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility and initials generation'
    },
    initials: {
      control: 'text',
      description: 'Custom initials override (auto-generated from alt if not provided)'
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive avatars'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default avatar with image
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    size: 'md'
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar 
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
        alt="Jane Smith" 
        size="xs" 
      />
      <DynAvatar 
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
        alt="Mike Johnson" 
        size="sm" 
      />
      <DynAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
        alt="John Doe" 
        size="md" 
      />
      <DynAvatar 
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
        alt="Sarah Wilson" 
        size="lg" 
      />
      <DynAvatar 
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" 
        alt="David Brown" 
        size="xl" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `Avatar size variants: xs (${AVATAR_SIZES.xs}px), sm (${AVATAR_SIZES.sm}px), md (${AVATAR_SIZES.md}px), lg (${AVATAR_SIZES.lg}px), xl (${AVATAR_SIZES.xl}px)`
      }
    }
  }
};

// Fallback to initials
export const WithInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt="John Doe" size="md" />
      <DynAvatar alt="Jane Smith" size="md" />
      <DynAvatar alt="Mike" size="md" />
      <DynAvatar initials="AB" alt="Custom" size="md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars without image src fall back to initials generated from alt text. Custom initials can be provided.'
      }
    }
  }
};

// Error handling (broken image URLs)
export const ErrorHandling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar 
        src="https://broken-url.jpg" 
        alt="John Doe" 
        size="md" 
      />
      <DynAvatar 
        src="https://invalid-image.png" 
        alt="Jane Smith" 
        size="md" 
      />
      <DynAvatar 
        src="" 
        alt="Mike Johnson" 
        size="md" 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When image fails to load, avatar gracefully falls back to initials or placeholder icon.'
      }
    }
  }
};

// Interactive avatars
export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
        alt="Clickable John" 
        size="md" 
        onClick={() => alert('Avatar clicked!')} 
      />
      <DynAvatar 
        alt="Clickable Jane" 
        size="md" 
        onClick={() => alert('Initials avatar clicked!')} 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive avatars with onClick handler show hover effects and focus states.'
      }
    }
  }
};

// No alt text (placeholder icon)
export const PlaceholderIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar size="sm" />
      <DynAvatar size="md" />
      <DynAvatar size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars without src or meaningful alt text show a generic user icon placeholder.'
      }
    }
  }
};

// Loading demonstration
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
        alt="Eager Loading" 
        size="md" 
        loading="eager"
      />
      <DynAvatar 
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
        alt="Lazy Loading" 
        size="md" 
        loading="lazy"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars support both eager and lazy loading strategies. During load, a placeholder with shimmer effect is shown.'
      }
    }
  }
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
        alt="Custom Border" 
        size="lg" 
        className="custom-avatar" 
        style={{ border: '3px solid #007bff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
      />
      <DynAvatar 
        alt="Custom Background" 
        size="lg" 
        className="custom-avatar" 
        style={{ backgroundColor: '#28a745', color: 'white' }} 
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatars can be customized with CSS classes and inline styles for borders, shadows, and colors.'
      }
    }
  }
};
