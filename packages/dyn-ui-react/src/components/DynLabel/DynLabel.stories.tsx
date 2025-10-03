// packages/dyn-ui-react/src/components/DynLabel/DynLabel.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DynLabel } from './DynLabel';
import { IconDictionaryProvider } from '../IconDictionary/IconDictionaryProvider';

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
    icon: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'accent'],
    },
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

export const WithIcon: Story = {
  args: {
    children: 'Email Address',
    icon: 'envelope',
    required: true,
    helpText: 'We will never share your email',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynLabel variant="default" required>Default Required</DynLabel>
      <DynLabel variant="subtle" optional>Subtle Optional</DynLabel>
      <DynLabel variant="accent" icon="star">Accent with Icon</DynLabel>
    </div>
  ),
};
