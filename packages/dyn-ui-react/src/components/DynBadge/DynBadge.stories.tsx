// packages/dyn-ui-react/src/components/DynBadge/DynBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynBadge } from './DynBadge';
import { DynBadgeProps } from '../../types/badge.types';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

const meta: Meta<typeof DynBadge> = {
  title: 'Display/DynBadge',
  component: DynBadge,
  decorators: [
    (Story) => (
      <IconDictionaryProvider>
        <div style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Story />
        </div>
      </IconDictionaryProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    status: {
      control: 'select',
      options: ['positive', 'negative', 'warning', 'disabled'],
    },
    color: {
      control: 'select',
      options: ['color-01', 'color-02', 'color-03', 'color-04', 'color-05', 'color-06', 'color-07', 'color-08', 'color-09', 'color-10', 'color-11', 'color-12'],
    },
    showBorder: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 99,
    size: 'medium',
    color: 'color-07'
  },
};

export const StatusVariants: Story = {
  render: () => (
    <>
      <DynBadge status="positive" value={5}>Positive</DynBadge>
      <DynBadge status="negative" value={3}>Negative</DynBadge>
      <DynBadge status="warning" value={10}>Warning</DynBadge>
      <DynBadge status="disabled" value={0}>Disabled</DynBadge>
    </>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <>
      <DynBadge icon="check" status="positive" value={1}>Success</DynBadge>
      <DynBadge icon="close" status="negative">Error</DynBadge>
      <DynBadge icon="warning" status="warning" value={5}>Warning</DynBadge>
    </>
  ),
};

export const BorderVariant: Story = {
  render: () => (
    <>
      <DynBadge value={3} showBorder status="positive">With Border</DynBadge>
      <DynBadge value={7} showBorder color="color-02">Colored Border</DynBadge>
    </>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <>
      <DynBadge size="small" value={5}>Small</DynBadge>
      <DynBadge size="medium" value={10}>Medium</DynBadge>
      <DynBadge size="large" value={15}>Large</DynBadge>
    </>
  ),
};

export const ColorPalette: Story = {
  render: () => (
    <>
      <DynBadge color="color-01" value={1}>Color 01</DynBadge>
      <DynBadge color="color-02" value={2}>Color 02</DynBadge>
      <DynBadge color="color-03" value={3}>Color 03</DynBadge>
      <DynBadge color="color-04" value={4}>Color 04</DynBadge>
      <DynBadge color="color-05" value={5}>Color 05</DynBadge>
      <DynBadge color="color-06" value={6}>Color 06</DynBadge>
    </>
  ),
};

export const WithChildren: Story = {
  render: () => (
    <>
      <DynBadge>Simple Text</DynBadge>
      <DynBadge status="positive">Success</DynBadge>
      <DynBadge status="warning">Warning</DynBadge>
      <DynBadge status="negative">Error</DynBadge>
    </>
  ),
};