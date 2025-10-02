import type { Meta, StoryObj } from '@storybook/react'
import { DynButton } from './DynButton'

const meta: Meta<typeof DynButton> = {
  title: 'Components/DynButton',
  component: DynButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# DynButton Component

DynButton je glavna komponenta za dugmad u Dyn UI sistemu sa potpunom podrška za različite stilove, veličine i stanja.

## Features
- ✅ Četiri kind varijante: primary, secondary, tertiary, danger
- ✅ Tri veličine: small, medium, large  
- ✅ Loading i disabled stanja
- ✅ Icon podrška
- ✅ FullWidth opcija
- ✅ Accessibility (ARIA) podrška
- ✅ Centralizovani CSS iz dyn-ui.css
        `,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'Button',
    kind: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    kind: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: 'Stil dugmeta - primary za glavne akcije, secondary za sporedne, tertiary za minimalne, danger za opasne akcije',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | tertiary | danger' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Veličina dugmeta',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'small | medium | large' },
      },
    },
    label: {
      control: 'text',
      description: 'Tekst koji se prikazuje na dugmetu',
    },
    disabled: {
      control: 'boolean',
      description: 'Da li je dugme onemogućeno',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Da li dugme prikazuje loading spinner',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Da li dugme zauzima punu širinu parenta',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: false, // Disable u Playground jer nije lako manipulisati ReactNode u UI
      description: 'Ikona koja se prikazuje uz dugme (koristi showcase stories za testiranje)',
    },
    onClick: {
      action: 'clicked',
      description: 'Funkcija koja se poziva pri kliku',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ===== Main Playground =====
export const Playground: Story = {
  args: {
    label: 'Playground Button',
    kind: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Koristi Controls panel ispod da testiraj različite kombinacije svojstava dugmeta.',
      },
    },
  },
}

// ===== Basic Variants =====
export const Primary: Story = {
  args: {
    kind: 'primary',
    label: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    kind: 'secondary',
    label: 'Secondary Button',
  },
}

export const Tertiary: Story = {
  args: {
    kind: 'tertiary',
    label: 'Tertiary Button',
  },
}

export const Danger: Story = {
  args: {
    kind: 'danger',
    label: 'Danger Button',
  },
}

// ===== Sizes =====
export const Small: Story = {
  args: {
    kind: 'primary',
    size: 'small',
    label: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    kind: 'primary',
    size: 'medium',
    label: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    kind: 'primary',
    size: 'large',
    label: 'Large Button',
  },
}

// ===== States =====
export const Disabled: Story = {
  args: {
    kind: 'primary',
    label: 'Disabled Button',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    kind: 'primary',
    label: 'Loading Button',
    loading: true,
  },
}

export const FullWidth: Story = {
  args: {
    kind: 'primary',
    label: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
}

// ===== With Icons =====
export const IconLeft: Story = {
  render: () => (
    <DynButton 
      icon={<span style={{ marginRight: '8px' }}>🚀</span>} 
      kind="primary"
      label="With Icon"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dugme sa ikonom levo od teksta.',
      },
    },
  },
}

export const IconOnly: Story = {
  render: () => (
    <DynButton 
      icon={<span>⚙️</span>} 
      kind="secondary"
      ariaLabel="Settings Button"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dugme samo sa ikonom bez teksta. Obavezno dodaj ariaLabel za accessibility.',
      },
    },
  },
}

// ===== MATRIX SHOWCASE - Kombinovani pregled svih kombinacija =====
export const AllVariants: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gap: 'var(--spacing-xl, 2rem)', 
      maxWidth: '1000px',
      padding: 'var(--spacing-lg, 1.5rem)'
    }}>
      
      {/* Button Kinds */}
      <section>
        <h3 style={{ 
          marginBottom: 'var(--spacing-lg, 1.5rem)', 
          color: 'var(--color-text-primary, #1e293b)',
          fontSize: 'var(--font-size-lg, 1.125rem)',
          fontWeight: 'var(--font-weight-semibold, 600)'
        }}>
          Button Kinds
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md, 1rem)', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <DynButton kind="primary" label="Primary" />
          <DynButton kind="secondary" label="Secondary" />
          <DynButton kind="tertiary" label="Tertiary" />
          <DynButton kind="danger" label="Danger" />
        </div>
      </section>
      
      {/* Button Sizes */}
      <section>
        <h3 style={{ 
          marginBottom: 'var(--spacing-lg, 1.5rem)', 
          color: 'var(--color-text-primary, #1e293b)',
          fontSize: 'var(--font-size-lg, 1.125rem)',
          fontWeight: 'var(--font-weight-semibold, 600)'
        }}>
          Button Sizes
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md, 1rem)', 
          alignItems: 'center', 
          flexWrap: 'wrap' 
        }}>
          <DynButton kind="primary" size="small" label="Small" />
          <DynButton kind="primary" size="medium" label="Medium" />
          <DynButton kind="primary" size="large" label="Large" />
        </div>
      </section>
      
      {/* Button States */}
      <section>
        <h3 style={{ 
          marginBottom: 'var(--spacing-lg, 1.5rem)', 
          color: 'var(--color-text-primary, #1e293b)',
          fontSize: 'var(--font-size-lg, 1.125rem)',
          fontWeight: 'var(--font-weight-semibold, 600)'
        }}>
          Button States
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md, 1rem)', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <DynButton kind="primary" label="Normal" />
          <DynButton kind="primary" label="Disabled" disabled />
          <DynButton kind="secondary" label="Loading..." loading />
          <DynButton kind="danger" label="Danger State" />
        </div>
      </section>
      
      {/* Kombinovane Varijante */}
      <section>
        <h3 style={{ 
          marginBottom: 'var(--spacing-lg, 1.5rem)', 
          color: 'var(--color-text-primary, #1e293b)',
          fontSize: 'var(--font-size-lg, 1.125rem)',
          fontWeight: 'var(--font-weight-semibold, 600)'
        }}>
          Kombinovane Varijante
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md, 1rem)', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <DynButton kind="primary" size="small" label="Primary Small" />
          <DynButton kind="secondary" size="large" label="Secondary Large" />
          <DynButton kind="tertiary" size="medium" disabled label="Tertiary Disabled" />
          <DynButton kind="danger" size="small" loading label="Danger Loading" />
        </div>
      </section>
      
      {/* With Icons Showcase */}
      <section>
        <h3 style={{ 
          marginBottom: 'var(--spacing-lg, 1.5rem)', 
          color: 'var(--color-text-primary, #1e293b)',
          fontSize: 'var(--font-size-lg, 1.125rem)',
          fontWeight: 'var(--font-weight-semibold, 600)'
        }}>
          With Icons
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md, 1rem)', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <DynButton 
            kind="primary" 
            icon={<span style={{ marginRight: '8px' }}>📥</span>} 
            label="Download" 
          />
          <DynButton 
            kind="secondary" 
            icon={<span style={{ marginRight: '8px' }}>⚙️</span>} 
            label="Settings" 
          />
          <DynButton 
            kind="tertiary" 
            icon={<span>❓</span>} 
            ariaLabel="Help Button" 
          />
          <DynButton 
            kind="danger" 
            icon={<span style={{ marginRight: '8px' }}>🗑️</span>} 
            label="Delete" 
          />
        </div>
      </section>
      
      {/* Full Width */}
      <section>
        <h3 style={{ 
          marginBottom: 'var(--spacing-lg, 1.5rem)', 
          color: 'var(--color-text-primary, #1e293b)',
          fontSize: 'var(--font-size-lg, 1.125rem)',
          fontWeight: 'var(--font-weight-semibold, 600)'
        }}>
          Full Width
        </h3>
        <div style={{ display: 'grid', gap: 'var(--spacing-sm, 0.5rem)' }}>
          <DynButton kind="primary" label="Full Width Primary" fullWidth />
          <DynButton kind="secondary" label="Full Width Secondary" fullWidth />
        </div>
      </section>
      
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Kompletna matrica svih DynButton varijanti, veličina i stanja za brzu vizuelnu proveru design sistema.',
      },
    },
  },
}