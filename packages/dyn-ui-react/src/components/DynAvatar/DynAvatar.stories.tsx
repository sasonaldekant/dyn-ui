import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from './DynAvatar';

const meta = {
  title: 'Components/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile avatar component with image support, fallback initials, status indicators, and full accessibility. Features comprehensive keyboard navigation, screen reader support, and design token integration.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Avatar size using design system tokens',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape variant',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator with semantic colors',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with shimmer effect',
    },
    error: {
      control: 'boolean',
      description: 'Error state with fallback handling',
    },
    onClick: {
      description: 'Makes avatar interactive with keyboard support',
    },
    'aria-label': {
      description: 'Custom accessibility label',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Profile Picture',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar size="small" alt="Small Avatar" />
      <DynAvatar size="medium" alt="Medium Avatar" />
      <DynAvatar size="large" alt="Large Avatar" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants using design system spacing tokens for consistent scaling.',
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Circle Avatar"
        shape="circle"
      />
      <DynAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Square Avatar"
        shape="square"
      />
      <DynAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Rounded Avatar"
        shape="rounded"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shape variants using design token border radius values.',
      },
    },
  },
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Online User" status="online" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Online</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Away User" status="away" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Away</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Busy User" status="busy" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Busy</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Offline User" status="offline" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Offline</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status indicators using semantic design system colors. Status is included in accessibility labels.',
      },
    },
  },
};

export const InitialsVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="John Doe" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Auto-generated</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Mary Jane Watson" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Multiple names</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar initials="AB" alt="Custom Initials" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Custom initials</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="SingleName" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Single name</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Initials are auto-generated from names or can be manually specified. Supports single and multiple names.',
      },
    },
  },
};

export const InteractiveAvatars: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar 
          alt="Clickable User" 
          onClick={() => alert('Avatar clicked!')} 
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Click or press Enter/Space</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Profile Settings"
          onClick={() => alert('Open profile!')}
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Interactive with image</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar 
          alt="Status Interactive" 
          status="online"
          onClick={() => alert('Online user clicked!')}
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>With status indicator</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive avatars with click handlers and full keyboard navigation. Supports Enter and Space keys.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Loading User" loading />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Explicit loading</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          src="https://slow-loading-image.example.com/avatar.jpg"
          alt="Slow Loading"
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Image loading</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar 
          alt="Loading with Status"
          status="online"
          loading 
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Loading + status</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states with shimmer effects and screen reader announcements. Includes aria-busy attribute.',
      },
    },
  },
};

export const ErrorStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Error User" error />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Explicit error</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar src="invalid-image-url.jpg" alt="Broken Image" />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Image error</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar 
          alt="Error Interactive"
          error
          onClick={() => alert('Error state clicked')}
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Interactive error</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error states with fallback content and screen reader announcements for accessibility.',
      },
    },
  },
};

export const CustomFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          alt="Emoji Fallback"
          fallback={<span style={{ fontSize: '1.5em' }}>🦄</span>}
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Emoji</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          alt="Icon Fallback"
          fallback={<span style={{ fontSize: '1.2em' }}>👤</span>}
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Icon</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          alt="Text Fallback"
          fallback={<span style={{ fontSize: '0.8em', fontWeight: 'bold' }}>N/A</span>}
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>Text</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom fallback content when no image or initials are available.',
      },
    },
  },
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div 
      data-theme="dark" 
      style={{ 
        padding: '2rem', 
        background: '#1a1a1a',
        borderRadius: '8px',
        color: 'white'
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0', color: 'white' }}>Dark Theme Examples</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
        gap: '1rem', 
        alignItems: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <DynAvatar alt="Dark Theme User" />
          <p style={{ fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>Initials</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <DynAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Dark Image"
          />
          <p style={{ fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>Image</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <DynAvatar alt="Dark Online" status="online" />
          <p style={{ fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>Online</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <DynAvatar alt="Dark Loading" loading />
          <p style={{ fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>Loading</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <DynAvatar alt="Dark Clickable" onClick={() => {}} />
          <p style={{ fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>Interactive</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <DynAvatar alt="Dark Error" error />
          <p style={{ fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>Error</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dark theme support using design system tokens with proper contrast and accessibility.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '2rem', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      maxWidth: '600px'
    }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>ARIA Described By</h4>
        <DynAvatar 
          alt="User Profile" 
          aria-describedby="profile-description" 
        />
        <p id="profile-description" style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0', color: '#666' }}>
          Current user's profile picture with online status
        </p>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Custom ARIA Label</h4>
        <DynAvatar 
          alt="Manager" 
          aria-label="Team manager profile - click to view details"
          onClick={() => alert('Manager details')}
        />
        <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0', color: '#666' }}>
          Interactive with custom accessibility label
        </p>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Screen Reader Announcements</h4>
        <DynAvatar 
          alt="Loading Profile" 
          loading 
          aria-describedby="loading-description" 
        />
        <p id="loading-description" style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0', color: '#666' }}>
          Profile picture is loading - screen readers will announce "Loading avatar"
        </p>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Status in Accessibility Label</h4>
        <DynAvatar 
          alt="John Smith" 
          status="busy" 
          aria-describedby="status-description"
        />
        <p id="status-description" style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0', color: '#666' }}>
          ARIA label includes status: "John Smith (Busy)"
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features including ARIA attributes, screen reader support, and keyboard navigation.',
      },
    },
  },
};

export const ResponsiveDesign: Story = {
  render: () => (
    <div style={{ padding: '1rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Responsive Touch Targets</h3>
      <p style={{ fontSize: '0.875rem', margin: '0 0 1rem 0', color: '#666' }}>
        Interactive avatars meet mobile accessibility guidelines (44px minimum touch target)
      </p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <DynAvatar 
          size="small" 
          alt="Small Interactive" 
          onClick={() => alert('Small avatar clicked')}
        />
        <DynAvatar 
          size="medium" 
          alt="Medium Interactive" 
          onClick={() => alert('Medium avatar clicked')}
        />
        <DynAvatar 
          size="large" 
          alt="Large Interactive" 
          onClick={() => alert('Large avatar clicked')}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive design with mobile-friendly touch targets and optimized status indicators.',
      },
    },
  },
};