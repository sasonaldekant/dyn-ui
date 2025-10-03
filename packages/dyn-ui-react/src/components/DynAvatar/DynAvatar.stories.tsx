import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynAvatar } from './DynAvatar';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

const meta: Meta<typeof DynAvatar> = {
  title: 'Display Components/DynAvatar',
  component: DynAvatar,
  decorators: [(Story) => (
    <IconDictionaryProvider>
      <Story />
    </IconDictionaryProvider>
  )],
};
export default meta;

type Story = StoryObj<typeof DynAvatar>;

export const Image: Story = {
  args: { src: 'https://picsum.photos/96', alt: 'User avatar', size: 'md' },
};

export const WithInitials: Story = {
  args: { initials: 'AP', size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <DynAvatar src="https://picsum.photos/24" size="xs" alt="xs" />
      <DynAvatar src="https://picsum.photos/32" size="sm" alt="sm" />
      <DynAvatar src="https://picsum.photos/64" size="md" alt="md" />
      <DynAvatar src="https://picsum.photos/96" size="lg" alt="lg" />
      <DynAvatar src="https://picsum.photos/144" size="xl" alt="xl" />
    </div>
  ),
};
