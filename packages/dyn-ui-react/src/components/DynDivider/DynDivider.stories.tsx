import type { Meta, StoryObj } from '@storybook/react';
import { DynDivider } from './DynDivider';
import { ThemeProvider } from '../../theme/ThemeProvider';

const meta: Meta<typeof DynDivider> = {
  title: 'Components/DynDivider',
  component: DynDivider,
  decorators: [Story => (
    <ThemeProvider initialTheme="light">
      <Story />
    </ThemeProvider>
  )],
  argTypes: {
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof DynDivider>;

export const Playground: Story = {
  args: {
    label: 'Section Title',
    labelPosition: 'center',
    direction: 'horizontal',
    thickness: 'thin',
    lineStyle: 'solid',
    color: 'default',
    spacing: 'md',
  },
};

export const WithoutLabel: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'sm',
  },
};

export const Vertical: Story = {
  args: {
    label: 'Timeline',
    labelPosition: 'right',
    direction: 'vertical',
    thickness: 'medium',
    lineStyle: 'dotted',
    color: 'primary',
    spacing: 'lg',
  },
  parameters: {
    layout: 'centered',
  },
};
