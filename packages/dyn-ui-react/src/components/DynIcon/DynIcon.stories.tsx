import type { Meta, StoryObj } from '@storybook/react';
import { React } from 'react';
import { DynIcon } from './DynIcon';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { IconDictionaryProvider } from '../../contexts/IconDictionaryContext';

const meta: Meta<typeof DynIcon> = {
  title: 'Components/DynIcon',
  component: DynIcon,
  decorators: [(S) => <ThemeProvider initialTheme="light"><S/></ThemeProvider>],
  decorators: [(S) => <IconDictionaryProvider><S/></IconDictionaryProvider>],
};
export default meta;
type Story = StoryObj<typeof DynIcon>;
export const Playground: Story = { args: {} };
