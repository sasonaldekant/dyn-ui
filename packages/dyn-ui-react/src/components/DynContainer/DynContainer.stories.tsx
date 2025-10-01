import type { Meta, StoryObj } from '@storybook/react';
import { DynContainer } from './DynContainer';
import { DynButton } from '../DynButton';

const meta: Meta<typeof DynContainer> = {
  title: 'Components/Layout/DynContainer',
  component: DynContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          DynContainer is a flexible container component for grouping content.
          It provides consistent styling, optional borders, padding, and titles.
          
          **Features:**
          - Optional borders and padding
          - Configurable height
          - Title support
          - Design token integration
          - Responsive design
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 100, max: 800, step: 50 },
      description: 'Fixed height in pixels',
    },
    noBorder: {
      control: 'boolean',
      description: 'Remove container border and shadow',
    },
    noPadding: {
      control: 'boolean', 
      description: 'Remove internal padding',
    },
    title: {
      control: 'text',
      description: 'Optional container title',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default container
export const Default: Story = {
  args: {
    children: (
      <div>
        <p>This is the default container with standard styling, borders, and padding.</p>
        <DynButton label="Sample Button" kind="primary" />
      </div>
    ),
  },
};

// Container with title
export const WithTitle: Story = {
  args: {
    title: 'Container Title',
    children: (
      <div>
        <p>This container has a title in the header section.</p>
        <p>The content area is clearly separated from the title.</p>
      </div>
    ),
  },
};

// Container without borders
export const NoBorder: Story = {
  args: {
    noBorder: true,
    title: 'Borderless Container',
    children: (
      <div>
        <p>This container has no borders or shadow for a cleaner look.</p>
        <DynButton label="Action Button" kind="secondary" />
      </div>
    ),
  },
};

// Container without padding
export const NoPadding: Story = {
  args: {
    noPadding: true,
    title: 'No Padding Container',
    children: (
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        <p>This container has no internal padding. Content spans the full width.</p>
        <p>You can add custom padding to the content if needed.</p>
      </div>
    ),
  },
};

// Container with fixed height
export const FixedHeight: Story = {
  args: {
    height: 300,
    title: 'Fixed Height Container',
    children: (
      <div>
        <p>This container has a fixed height of 300px.</p>
        <p>Content will scroll if it exceeds the container height.</p>
        <p>Additional content to demonstrate height constraints.</p>
        <p>More content to show scrolling behavior.</p>
        <p>Even more content for testing.</p>
      </div>
    ),
  },
};

// Container combinations
export const CustomCombination: Story = {
  args: {
    height: 250,
    noBorder: true,
    title: 'Custom Configuration',
    className: 'custom-container-demo',
    children: (
      <div>
        <p>This container combines multiple features:</p>
        <ul>
          <li>Fixed height (250px)</li>
          <li>No borders</li>
          <li>Custom title</li>
          <li>Custom CSS class</li>
        </ul>
        <div style={{ marginTop: '20px' }}>
          <DynButton label="Primary" kind="primary" style={{ marginRight: '10px' }} />
          <DynButton label="Secondary" kind="secondary" />
        </div>
      </div>
    ),
  },
};

// Nested containers
export const NestedContainers: Story = {
  args: {
    title: 'Parent Container',
    children: (
      <div>
        <p>This is a parent container with nested child containers:</p>
        <br />
        <DynContainer title="Child Container 1" noBorder>
          <p>First nested container content.</p>
        </DynContainer>
        <br />
        <DynContainer title="Child Container 2" noBorder>
          <p>Second nested container content.</p>
          <DynButton label="Nested Action" kind="tertiary" />
        </DynContainer>
      </div>
    ),
  },
};

// Showcase all variants
export const Showcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', width: '100%' }}>
      <DynContainer title="Default Container">
        <p>Standard container with all default settings.</p>
        <DynButton label="Default" kind="primary" />
      </DynContainer>
      
      <DynContainer noBorder title="No Border">
        <p>Container without borders or shadow.</p>
        <DynButton label="No Border" kind="secondary" />
      </DynContainer>
      
      <DynContainer noPadding title="No Padding">
        <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
          <p>Container with custom content padding.</p>
          <DynButton label="Custom" kind="tertiary" />
        </div>
      </DynContainer>
      
      <DynContainer height={200} title="Fixed Height">
        <p>Container with fixed height constraint.</p>
        <p>Content will be constrained to the specified height.</p>
        <DynButton label="Fixed" kind="primary" />
      </DynContainer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase of all DynContainer variants and configurations.',
      },
    },
  },
};