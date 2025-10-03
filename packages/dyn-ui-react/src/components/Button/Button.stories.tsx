import type { Meta, StoryObj } from '@storybook/react';
import { React } from 'react';
import { Button } from './Button';
import { ThemeProvider } from '../../theme/ThemeProvider';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [(S) => <ThemeProvider initialTheme="light"><S/></ThemeProvider>],
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Playground: Story = { args: {} };
