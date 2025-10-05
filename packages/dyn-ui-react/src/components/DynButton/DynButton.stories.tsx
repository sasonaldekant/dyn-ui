import type { Meta, StoryObj } from '@storybook/react-vite';
import DynButton from './DynButton';

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
};
export default meta;

type Story = StoryObj<typeof DynButton>;

export const Default: Story = {
  render: () => <DynButton />,
};
