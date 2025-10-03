// packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import DynAvatar from './DynAvatar';
import IconDictionaryProvider from './IconDictionary/IconDictionaryProvider';

const meta: Meta<typeof DynAvatar> = {
  title: 'Display Components/DynAvatar',
  component: DynAvatar,
  decorators: [
    (Story) => (
      <IconDictionaryProvider>
        <Story />
      </IconDictionaryProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Profile picture',
    name: 'John Doe',
    size: 'md',
  },
};

export const ErrorFallback: Story = {
  args: {
    src: 'invalid-url.jpg',
    name: 'Jane Smith',
    size: 'md',
  },
};

export const LoadingState: Story = {
  args: {
    name: 'Loading User',
    size: 'md',
    loading: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <DynAvatar name="Extra Small" size="xs" />
      <DynAvatar name="Small Size" size="sm" />
      <DynAvatar name="Medium Size" size="md" />
      <DynAvatar name="Large Size" size="lg" />
      <DynAvatar name="Extra Large" size="xl" />
    </div>
  ),
};

export const SquareVariant: Story = {
  args: {
    name: 'Square Avatar',
    size: 'md',
    shape: 'square',
  },
};
