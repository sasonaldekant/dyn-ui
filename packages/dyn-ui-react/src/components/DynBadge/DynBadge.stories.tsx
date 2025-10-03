// packages/dyn-ui-react/src/components/DynBadge/DynBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynBadge } from './DynBadge';
import { DynBadgeProps } from '../../types/badge.types';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

type StoryProps = DynBadgeProps & { variant?: 'default' | 'success' | 'warning' | 'error' | 'info' };

const meta: Meta<typeof DynBadge> = {
  title: 'Display Components/DynBadge',
  component: DynBadge,
  decorators: [
    (Story) => (
      <IconDictionaryProvider>
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      </IconDictionaryProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    icon: { control: 'text' },
    count: { control: 'number' },
    color: { control: 'color' },
  } as any,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default' as any,
  } as StoryProps,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge variant="default">Default</DynBadge>
      <DynBadge variant="success">Success</DynBadge>
      <DynBadge variant="warning">Warning</DynBadge>
      <DynBadge variant="error">Error</DynBadge>
      <DynBadge variant="info">Info</DynBadge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge count={5} variant="success" icon="check">Completed</DynBadge>
      <DynBadge variant="warning" icon="exclamation-triangle">Warning</DynBadge>
      <DynBadge variant="error" icon="times">Error</DynBadge>
      <DynBadge variant="info" icon="info-circle">Info</DynBadge>
    </div>
  ),
};

export const WithCount: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge count={5}>Messages</DynBadge>
      <DynBadge count={23} variant="success">Notifications</DynBadge>
      <DynBadge count={157} variant="error">Errors</DynBadge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge size="sm">Small</DynBadge>
      <DynBadge size="md">Medium</DynBadge>
      <DynBadge size="lg">Large</DynBadge>
    </div>
  ),
};
