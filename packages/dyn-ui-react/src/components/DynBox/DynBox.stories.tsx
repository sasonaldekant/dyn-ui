import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynBox } from './DynBox';

const meta: Meta<typeof DynBox> = {
  title: 'Primitives/DynBox',
  component: DynBox,
};
export default meta;

type Story = StoryObj<typeof DynBox>;

export const Playground: Story = {
  args: {
    sx: { p: 'lg', radius: 'md', bg: 'muted', color: 'text' },
    children: 'Token-based box (padding=lg, radius=md)',
  },
};
