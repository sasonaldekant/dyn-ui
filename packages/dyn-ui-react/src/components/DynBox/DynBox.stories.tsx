import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DynBox } from './DynBox';

const meta: Meta<typeof DynBox> = {
  title: 'Components/DynBox',
  component: DynBox,
  parameters: {
    docs: {
      description: {
        component:
          'DynBox is the polymorphic, design-token aware layout primitive used across dyn-ui. It mirrors the DynAvatar patterns with CSS custom properties, accessibility affordances, and responsive helpers.',
      },
    },
  },
  args: {
    as: 'div',
    p: 'md',
    borderRadius: 'md',
  },
};

export default meta;

type Story = StoryObj<typeof DynBox>;

export const Default: Story = {
  args: {
    bg: 'tertiary',
    shadow: 'sm',
    children: (
      <>
        <strong>DynBox</strong>
        <span>Token aware container with spacing, border radius and shadow.</span>
      </>
    ),
  },
};

export const Variants: Story = {
  render: args => (
    <DynBox
      {...args}
      display="grid"
      gap="sm"
      gridTemplateColumns="repeat(auto-fit, minmax(180px, 1fr))"
      aria-label="DynBox variants"
    >
      <DynBox bg="primary" borderRadius="md" shadow="md" p="sm" color="#ffffff">
        Primary surface
      </DynBox>
      <DynBox bg="secondary" borderRadius="md" shadow="sm" p="sm" color="#ffffff">
        Secondary surface
      </DynBox>
      <DynBox bg="success" borderRadius="md" shadow="sm" p="sm" color="#ffffff">
        Success state
      </DynBox>
      <DynBox border borderRadius="md" p="sm">
        Neutral border only
      </DynBox>
    </DynBox>
  ),
  args: {
    p: 'lg',
    borderRadius: 'lg',
    shadow: undefined,
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    'aria-label': 'Interactive DynBox',
    focusOnMount: true,
    onClick: action('onClick'),
    children: 'Activate me with click, Enter or Space',
  },
};

export const Accessibility: Story = {
  render: args => (
    <DynBox {...args} display="flex" flexDirection="column" gap="sm" role="region">
      <DynBox bg="tertiary" p="sm" borderRadius="md">
        Resize the viewport to see responsive helpers in action.
      </DynBox>
      <DynBox
        bg="secondary"
        color="#ffffff"
        p="sm"
        borderRadius="md"
        ariaLiveMessage="Live status: background tasks complete."
      >
        Screen readers receive updates via the aria-live region below.
      </DynBox>
    </DynBox>
  ),
  args: {
    'aria-label': 'Accessibility demo',
    hideOnMobile: false,
    tabletOnly: false,
  },
};

export const DarkTheme: Story = {
  args: {
    bg: 'primary',
    shadow: 'md',
    color: '#ffffff',
    children: 'DynBox respects surface tokens in dark mode.',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
