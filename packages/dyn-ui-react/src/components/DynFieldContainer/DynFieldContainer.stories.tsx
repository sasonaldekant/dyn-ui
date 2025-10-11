import type { Meta, StoryObj } from '@storybook/react';
import { DynFieldContainer } from './DynFieldContainer';
import type { DynFieldContainerProps } from './DynFieldContainer.types';
import { DynInput } from '../DynInput';
import { DynCheckbox } from '../DynCheckbox';

const meta: Meta<typeof DynFieldContainer> = {
  title: 'Components/Form/DynFieldContainer',
  component: DynFieldContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container component that provides consistent layout and validation display for form fields.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'boolean',
    },
    optional: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<DynFieldContainerProps>;

export const Default: Story = {
  args: {
    label: 'Field Label',
    children: <input type="text" placeholder="Enter text" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />,
  },
};

export const WithHelp: Story = {
  args: {
    label: 'Field with Help',
    helpText: 'This is helpful information about the field.',
    children: <input type="text" placeholder="Enter text" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    children: <input type="text" placeholder="Enter text" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />,
  },
};

export const Optional: Story = {
  args: {
    label: 'Optional Field',
    optional: true,
    children: <input type="text" placeholder="Enter text" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Field with Error',
    errorText: 'This field is required.',
    children: <input type="text" placeholder="Enter text" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', borderColor: '#e53e3e' }} />,
  },
};

export const WithDynInput: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <DynFieldContainer
        label="Input Field"
        helpText="Enter your name"
        required
      >
        <DynInput
          name="example-input"
          placeholder="Your name"
        />
      </DynFieldContainer>
    </div>
  ),
};

export const WithDynCheckbox: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <DynFieldContainer
        helpText="Check this to agree to terms"
        required
      >
        <DynCheckbox
          name="terms"
          label="I agree to the terms and conditions"
        />
      </DynFieldContainer>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <DynFieldContainer label="Basic Field">
        <input type="text" placeholder="Basic input" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </DynFieldContainer>

      <DynFieldContainer label="Required Field" required>
        <input type="text" placeholder="Required input" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </DynFieldContainer>

      <DynFieldContainer label="Optional Field" optional>
        <input type="text" placeholder="Optional input" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </DynFieldContainer>

      <DynFieldContainer label="Field with Help" helpText="This field needs some explanation">
        <input type="text" placeholder="Input with help" style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
      </DynFieldContainer>

      <DynFieldContainer label="Field with Error" errorText="This field has an error">
        <input type="text" placeholder="Input with error" style={{ padding: '8px', border: '1px solid #e53e3e', borderRadius: '4px' }} />
      </DynFieldContainer>
    </div>
  ),
};
