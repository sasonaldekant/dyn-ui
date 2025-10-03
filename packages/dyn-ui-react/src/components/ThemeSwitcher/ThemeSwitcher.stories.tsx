import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Utilities/ThemeSwitcher',
  component: ThemeSwitcher,
};
export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: { labels: { light: 'Light', dark: 'Dark' } },
};
