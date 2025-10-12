import type { Meta, StoryObj } from '@storybook/react';
import { DynBox } from './DynBox';

const meta: Meta<typeof DynBox> = {
  title: 'Primitives/DynBox',
  component: DynBox,
  args: {
    as: 'div',
  },
};

export default meta;

type Story = StoryObj<typeof DynBox>;

export const Playground: Story = {
  args: {
    p: 'lg',
    bg: 'primary',
    color: '#ffffff',
    borderRadius: 'lg',
    shadow: 'md',
    display: 'flex',
    flexDirection: 'column',
    gap: 'sm',
    children: (
      <>
        <DynBox bg="secondary" color="#ffffff" p="sm" borderRadius="md">
          Token aware layout primitive
        </DynBox>
        <DynBox bg="tertiary" p="sm" border borderRadius="md">
          Composes spacing, borders and shadows
        </DynBox>
      </>
    ),
  },
};
