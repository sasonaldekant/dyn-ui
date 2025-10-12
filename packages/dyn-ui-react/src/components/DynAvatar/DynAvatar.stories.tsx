import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from './DynAvatar';
import { DynAvatarProps } from '../../types/avatar.types';

const meta: Meta<typeof DynAvatar> = {
  title: 'Components/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component with image fallback to initials. Supports different sizes and click handlers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    loading: {
      control: 'select',
      options: ['eager', 'lazy'],
    },
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<DynAvatarProps>;

export const Default: Story = {
  args: {
    alt: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'JD',
    alt: 'John Doe',
  },
};

export const Clickable: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    alt: 'Jane Smith',
    onClick: () => console.log('Avatar clicked'),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar size="xs" alt="Extra Small" />
      <DynAvatar size="sm" alt="Small" />
      <DynAvatar size="md" alt="Medium" />
      <DynAvatar size="lg" alt="Large" />
      <DynAvatar size="xl" alt="Extra Large" />
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar
        size="md"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="John Doe"
      />
      <DynAvatar
        size="md"
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        alt="Jane Smith"
      />
      <DynAvatar
        size="md"
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        alt="Bob Johnson"
      />
    </div>
  ),
};

export const ErrorFallback: Story = {
  args: {
    src: 'https://invalid-url.jpg',
    alt: 'Failed Image',
    initials: 'FI',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Images</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <DynAvatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="John Doe"
          />
          <DynAvatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Jane Smith"
          />
        </div>
      </div>
      <div>
        <h3>Initials</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <DynAvatar initials="JD" alt="John Doe" />
          <DynAvatar initials="JS" alt="Jane Smith" />
          <DynAvatar alt="Bob Johnson" />
        </div>
      </div>
      <div>
        <h3>Clickable</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <DynAvatar
            initials="CL"
            alt="Clickable Avatar"
            onClick={() => alert('Avatar clicked!')}
          />
        </div>
      </div>
    </div>
  ),
};
