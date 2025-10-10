import type { Meta, StoryObj } from '@storybook/react';
import { DynCheckbox } from './DynCheckbox';
import type { DynCheckboxProps } from './DynCheckbox.types';

const meta: Meta<typeof DynCheckbox> = {
  title: 'Components/Form/DynCheckbox',
  component: DynCheckbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Advanced checkbox component with indeterminate state and validation support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<DynCheckboxProps>;

export const Default: Story = {
  args: {
    name: 'default-checkbox',
    label: 'Default checkbox',
  },
};

export const Checked: Story = {
  args: {
    name: 'checked-checkbox',
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    name: 'indeterminate-checkbox',
    label: 'Indeterminate checkbox',
    indeterminate: true,
  },
};

export const WithHelp: Story = {
  args: {
    name: 'help-checkbox',
    label: 'Checkbox with help text',
    help: 'This is helpful information about the checkbox.',
  },
};

export const Required: Story = {
  args: {
    name: 'required-checkbox',
    label: 'Required checkbox',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-checkbox',
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    name: 'disabled-checked-checkbox',
    label: 'Disabled checked checkbox',
    disabled: true,
    checked: true,
  },
};

export const ReadOnly: Story = {
  args: {
    name: 'readonly-checkbox',
    label: 'Readonly checkbox',
    readonly: true,
    checked: true,
  },
};

export const WithError: Story = {
  args: {
    name: 'error-checkbox',
    label: 'Checkbox with error',
    errorMessage: 'This field is required.',
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynCheckbox name="small" label="Small checkbox" size="small" />
      <DynCheckbox name="medium" label="Medium checkbox" size="medium" />
      <DynCheckbox name="large" label="Large checkbox" size="large" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Basic States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynCheckbox name="unchecked" label="Unchecked" />
          <DynCheckbox name="checked" label="Checked" checked />
          <DynCheckbox name="indeterminate" label="Indeterminate" indeterminate />
        </div>
      </div>

      <div>
        <h3>Disabled States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynCheckbox name="disabled-unchecked" label="Disabled unchecked" disabled />
          <DynCheckbox name="disabled-checked" label="Disabled checked" disabled checked />
          <DynCheckbox name="disabled-indeterminate" label="Disabled indeterminate" disabled indeterminate />
        </div>
      </div>

      <div>
        <h3>With Validation</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynCheckbox name="required" label="Required checkbox" required />
          <DynCheckbox name="error" label="With error" errorMessage="This field is required" />
          <DynCheckbox name="help" label="With help text" help="Check this box to continue" />
        </div>
      </div>
    </div>
  ),
};
