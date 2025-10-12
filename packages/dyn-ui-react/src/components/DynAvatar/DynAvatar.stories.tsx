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
          'A versatile avatar component with image support, fallback initials, status indicators, and full accessibility.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Avatar size',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
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
  args: {
    alt: 'Avatar example',
  },
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
        story: 'Different size variants with proper scaling.',
      },
    },
  },
};

export const Shapes: Story = {
  args: {
    alt: 'Avatar example',
  },
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
};

export const StatusIndicators: Story = {
  args: {
    alt: 'Avatar example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt="Online User" status="online" />
      <DynAvatar alt="Away User" status="away" />
      <DynAvatar alt="Busy User" status="busy" />
      <DynAvatar alt="Offline User" status="offline" />
    </div>
  ),
};

export const InitialsVariants: Story = {
  args: {
    alt: 'Avatar example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt="John Doe" />
      <DynAvatar alt="Mary Jane Watson" />
      <DynAvatar initials="AB" alt="Custom Initials" />
      <DynAvatar alt="SingleName" />
    </div>
  ),
};

export const InteractiveAvatars: Story = {
  args: {
    alt: 'Avatar example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt="Clickable User" onClick={() => alert('Avatar clicked!')} />
      <DynAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Profile Settings"
        onClick={() => alert('Open profile!')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive avatars with click handlers and keyboard navigation.',
      },
    },
  },
};

export const LoadingStates: Story = {
  args: {
    alt: 'Avatar example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt="Loading User" loading />
      <DynAvatar
        src="https://slow-loading-image.example.com/avatar.jpg"
        alt="Slow Loading"
      />
    </div>
  ),
};

export const ErrorStates: Story = {
  args: {
    alt: 'Avatar example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt="Error User" error />
      <DynAvatar src="invalid-image-url.jpg" alt="Broken Image" />
    </div>
  ),
};

export const CustomFallback: Story = {
  args: {
    alt: 'Custom Fallback',
    fallback: <span style={{ fontSize: '1.5em' }}>🦄</span>,
  },
};

export const DarkTheme: Story = {
  args: {
    alt: 'Avatar example',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <DynAvatar alt="Dark Theme User" />
        <DynAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Dark Image"
        />
        <DynAvatar alt="Dark Online" status="online" />
        <DynAvatar alt="Dark Clickable" onClick={() => {}} />
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    alt: 'Avatar example',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div>
        <DynAvatar alt="User Profile" aria-describedby="profile-description" />
        <p id="profile-description">Current user's profile picture</p>
      </div>

      <DynAvatar alt="Manager" aria-label="Team manager profile" onClick={() => {}} />

      <DynAvatar alt="Loading Profile" loading aria-describedby="loading-description" />
      <p id="loading-description">Profile picture is loading</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples demonstrating accessibility features and ARIA attributes.',
      },
    },
  },
};
