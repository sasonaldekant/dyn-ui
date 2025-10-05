import type { Meta, StoryObj } from '@storybook/react-vite';
import DynIcon from './DynIcon';

const meta: Meta<typeof DynIcon> = {
  title: 'Components/DynIcon',
  component: DynIcon,
};
export default meta;

type Story = StoryObj<typeof DynIcon>;

export const Default: Story = {
  render: () => <DynIcon />,
};
