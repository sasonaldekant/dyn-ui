import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React  from 'react';
import { DynDivider } from './DynDivider';
import { ThemeProvider } from '../../theme/ThemeProvider';

const meta: Meta<typeof DynDivider> = {
  title: 'Components/DynDivider',
  component: DynDivider,
  decorators: [(S) => <ThemeProvider initialTheme="light"><S/></ThemeProvider>],
};
export default meta;
type Story = StoryObj<typeof DynDivider>;
export const Playground: Story = { args: {} };
