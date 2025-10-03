import type { Meta, StoryObj } from '@storybook/react';
import { DynLabel } from './index';

const meta: Meta<typeof DynLabel> = {
  title: 'Display Components/DynLabel',
  component: DynLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'DynLabel provides accessible form labels with required/optional indicators and help text. Designed for maximum accessibility compliance.'
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content'
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form control'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state styling'
    },
    required: {
      control: 'boolean',
      description: 'Show required asterisk (*)'
    },
    optional: {
      control: 'boolean',
      description: 'Show (optional) text'
    },
    helpText: {
      control: 'text',
      description: 'Additional help text below label'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic label
export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email-input'
  },
};

// Required field
export const Required: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password-input',
    required: true
  },
};

// Optional field
export const Optional: Story = {
  args: {
    children: 'Middle Name',
    htmlFor: 'middle-name-input',
    optional: true
  },
};

// With help text
export const WithHelpText: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username-input',
    required: true,
    helpText: 'Must be 3-20 characters, letters and numbers only'
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: 'Account Type',
    htmlFor: 'account-type-input',
    disabled: true,
    helpText: 'This field cannot be modified'
  },
};

// Form example showcase
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <div>
        <DynLabel htmlFor="first-name" required>
          First Name
        </DynLabel>
        <input 
          id="first-name" 
          type="text" 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
      
      <div>
        <DynLabel htmlFor="last-name" required>
          Last Name
        </DynLabel>
        <input 
          id="last-name" 
          type="text" 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
      
      <div>
        <DynLabel htmlFor="middle-name" optional>
          Middle Name
        </DynLabel>
        <input 
          id="middle-name" 
          type="text" 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
      
      <div>
        <DynLabel 
          htmlFor="email" 
          required 
          helpText="We'll never share your email with anyone"
        >
          Email Address
        </DynLabel>
        <input 
          id="email" 
          type="email" 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
      
      <div>
        <DynLabel 
          htmlFor="phone" 
          optional
          helpText="Include country code for international numbers"
        >
          Phone Number
        </DynLabel>
        <input 
          id="phone" 
          type="tel" 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
      
      <div>
        <DynLabel 
          htmlFor="account-type" 
          disabled
          helpText="Account type is determined by your organization"
        >
          Account Type
        </DynLabel>
        <select 
          id="account-type" 
          disabled
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        >
          <option>Standard User</option>
        </select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form example showing DynLabel with various form controls, demonstrating proper accessibility practices.'
      }
    }
  }
};

// Accessibility showcase
export const AccessibilityFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '400px' }}>
      <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Proper ARIA Relationships</h4>
        <DynLabel 
          htmlFor="aria-example" 
          required 
          helpText="This help text is properly associated with the input via aria-describedby"
        >
          Accessible Input
        </DynLabel>
        <input 
          id="aria-example" 
          type="text" 
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: '#e8f4fd', borderRadius: '4px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Focus Management</h4>
        <DynLabel htmlFor="focus-example" required>
          Click this label to focus input
        </DynLabel>
        <input 
          id="focus-example" 
          type="text" 
          placeholder="Click the label above to focus me"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: '#fff2e8', borderRadius: '4px' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Screen Reader Support</h4>
        <DynLabel 
          htmlFor="screen-reader-example" 
          optional
          helpText="Screen readers will announce this as an optional field with help text"
        >
          Screen Reader Friendly
        </DynLabel>
        <textarea 
          id="screen-reader-example" 
          rows={3}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features demonstration: proper ARIA relationships, focus management, and screen reader support.'
      }
    }
  }
};

// Visual states comparison
export const VisualStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Normal States</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynLabel>Basic Label</DynLabel>
          <DynLabel required>Required Field</DynLabel>
          <DynLabel optional>Optional Field</DynLabel>
          <DynLabel helpText="With help text">With Help</DynLabel>
        </div>
      </div>
      
      <div>
        <h4 style={{ margin: '0 0 1rem 0' }}>Disabled States</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DynLabel disabled>Disabled Label</DynLabel>
          <DynLabel disabled required>Disabled Required</DynLabel>
          <DynLabel disabled optional>Disabled Optional</DynLabel>
          <DynLabel disabled helpText="Disabled help text">Disabled Help</DynLabel>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of normal vs disabled states for all label variants.'
      }
    }
  }
};
