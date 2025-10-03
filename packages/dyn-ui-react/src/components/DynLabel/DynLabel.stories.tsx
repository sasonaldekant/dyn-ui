// packages/dyn-ui-react/src/components/DynLabel/DynLabel.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DynLabel } from './DynLabel';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

const meta: Meta<typeof DynLabel> = {
  title: 'Display Components/DynLabel',
  component: DynLabel,
  decorators: [
    (Story) => (
      <IconDictionaryProvider>
        <div style={{ padding: '1rem' }}>
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
    children: { control: 'text' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    helpText: { control: 'text' },
    disabled: { control: 'boolean' },
    htmlFor: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
  },
};

export const Optional: Story = {
  args: {
    children: 'Optional Field',
    optional: true,
  },
};

export const WithHelpText: Story = {
  args: {
    children: 'Username',
    helpText: 'Must be between 3-20 characters',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Label',
    disabled: true,
    helpText: 'This field is disabled',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynLabel>Default Label</DynLabel>
      <DynLabel required>Required Field</DynLabel>
      <DynLabel optional>Optional Field</DynLabel>
      <DynLabel disabled>Disabled Label</DynLabel>
      <DynLabel required helpText="This field is required">With Help Text</DynLabel>
    </div>
  ),
};