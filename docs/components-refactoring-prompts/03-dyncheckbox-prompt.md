# 🎯 DYN-UI CODEX PROMPT 03 - DynCheckbox

## 🚀 AI ZADATAK: Refaktoriši DynCheckbox komponent za custom styling i accessibility

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim form komponentima

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynCheckbox/
├── DynCheckbox.tsx
├── DynCheckbox.types.ts  
├── DynCheckbox.module.css
├── DynCheckbox.stories.tsx
├── DynCheckbox.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynCheckbox.module.css):

```css
.checkboxContainer {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--dyn-spacing-sm);
  cursor: pointer;
  font-family: var(--dyn-font-family-primary);
  
  &:has(.checkbox:disabled) {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.checkbox {
  /* Hide native checkbox */
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  /* Focus styles for keyboard navigation */
  &:focus-visible + .checkboxBox {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}

.checkboxBox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--dyn-spacing-lg);
  height: var(--dyn-spacing-lg);
  border: var(--dyn-border-width) solid var(--dyn-color-border);
  border-radius: var(--dyn-border-radius-sm);
  background-color: var(--dyn-color-bg-primary);
  transition: var(--dyn-transition-fast);
  flex-shrink: 0;
  
  /* Hover state */
  .checkboxContainer:hover &:not(.checkboxBox--disabled) {
    border-color: var(--dyn-color-border-hover);
    background-color: var(--dyn-color-neutral-25);
  }
  
  /* Checked state */
  .checkbox:checked + & {
    background-color: var(--dyn-color-primary);
    border-color: var(--dyn-color-primary);
    color: var(--dyn-color-text-on-primary);
  }
  
  /* Checked hover state */
  .checkboxContainer:hover .checkbox:checked + & {
    background-color: var(--dyn-color-primary-hover);
    border-color: var(--dyn-color-primary-hover);
  }
  
  /* Indeterminate state */
  .checkbox:indeterminate + & {
    background-color: var(--dyn-color-primary);
    border-color: var(--dyn-color-primary);
    color: var(--dyn-color-text-on-primary);
  }
  
  /* Disabled state */
  &.checkboxBox--disabled {
    background-color: var(--dyn-color-bg-disabled);
    border-color: var(--dyn-color-border);
    color: var(--dyn-color-text-disabled);
  }
  
  /* Error state */
  &.checkboxBox--error {
    border-color: var(--dyn-color-border-error);
  }
  
  /* Success state */
  &.checkboxBox--success {
    border-color: var(--dyn-color-success);
  }
}

.checkIcon {
  width: var(--dyn-spacing-xs);
  height: var(--dyn-spacing-xs);
  opacity: 0;
  transform: scale(0.8);
  transition: all var(--dyn-duration-fast) var(--dyn-timing-ease);
  
  /* Show when checked */
  .checkbox:checked + .checkboxBox & {
    opacity: 1;
    transform: scale(1);
  }
  
  /* Indeterminate icon */
  &.checkIcon--indeterminate {
    width: var(--dyn-spacing-sm);
    height: 2px;
    background-color: currentColor;
    border-radius: 1px;
    
    .checkbox:indeterminate + .checkboxBox & {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.checkboxLabel {
  color: var(--dyn-color-text-primary);
  font-size: var(--dyn-font-size-base);
  font-weight: var(--dyn-font-weight-normal);
  line-height: var(--dyn-line-height-normal);
  user-select: none;
  
  /* Disabled state */
  .checkboxContainer:has(.checkbox:disabled) & {
    color: var(--dyn-color-text-disabled);
  }
}

.description {
  margin-top: var(--dyn-spacing-xs);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-text-secondary);
  line-height: var(--dyn-line-height-normal);
  
  /* Disabled state */
  .checkboxContainer:has(.checkbox:disabled) & {
    color: var(--dyn-color-text-disabled);
  }
}

/* Size variants */
.checkboxContainer--small {
  .checkboxBox {
    width: var(--dyn-spacing-md);
    height: var(--dyn-spacing-md);
  }
  
  .checkIcon {
    width: 8px;
    height: 8px;
  }
  
  .checkboxLabel {
    font-size: var(--dyn-font-size-sm);
  }
}

.checkboxContainer--large {
  .checkboxBox {
    width: var(--dyn-spacing-xl);
    height: var(--dyn-spacing-xl);
  }
  
  .checkIcon {
    width: var(--dyn-spacing-md);
    height: var(--dyn-spacing-md);
  }
  
  .checkboxLabel {
    font-size: var(--dyn-font-size-lg);
  }
}

/* Error message */
.errorMessage {
  margin-top: var(--dyn-spacing-xs);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-danger);
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-xs);
}

/* Responsive design */
@media (max-width: 767px) {
  .checkboxBox {
    width: var(--dyn-spacing-xl); /* Larger touch target */
    height: var(--dyn-spacing-xl);
    min-width: 44px;
    min-height: 44px;
  }
  
  .checkboxContainer--small .checkboxBox {
    min-width: 40px;
    min-height: 40px;
  }
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  .checkboxBox {
    background-color: var(--dyn-color-neutral-800);
    border-color: var(--dyn-color-neutral-600);
  }
  
  .checkboxContainer:hover .checkboxBox:not(.checkboxBox--disabled) {
    background-color: var(--dyn-color-neutral-700);
    border-color: var(--dyn-color-neutral-500);
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynCheckbox.types.ts):

```typescript
import { InputHTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps } from '../../types/base';

export interface DynCheckboxProps extends 
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
  BaseComponentProps,
  AccessibilityProps {
  
  /** Checkbox label */
  label?: ReactNode;
  
  /** Description text below label */
  description?: string;
  
  /** Size variant */
  size?: ComponentSize;
  
  /** Checked state */
  checked?: boolean;
  
  /** Indeterminate state */
  indeterminate?: boolean;
  
  /** Error state */
  error?: boolean;
  
  /** Success state */
  success?: boolean;
  
  /** Error message */
  errorMessage?: string;
  
  /** Change handler */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Custom check icon */
  checkIcon?: ReactNode;
  
  /** Custom indeterminate icon */
  indeterminateIcon?: ReactNode;
}

export interface DynCheckboxRef extends HTMLInputElement {}
```

---

## ⚛️ REACT COMPONENT (DynCheckbox.tsx):

```typescript
import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../utils/className';
import { generateId, mergeRefs } from '../../utils/accessibility';
import { DynCheckboxProps, DynCheckboxRef } from './DynCheckbox.types';
import styles from './DynCheckbox.module.css';

// Default check icon (SVG checkmark)
const DefaultCheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Default indeterminate icon (horizontal line)
const DefaultIndeterminateIcon = () => (
  <div className={cn(styles.checkIcon, styles['checkIcon--indeterminate'])} />
);

export const DynCheckbox = forwardRef<DynCheckboxRef, DynCheckboxProps>(
  (
    {
      className,
      label,
      description,
      size = 'medium',
      checked,
      indeterminate = false,
      error = false,
      success = false,
      errorMessage,
      disabled = false,
      onChange,
      checkIcon,
      indeterminateIcon,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const [internalId] = React.useState(() => id || generateId('checkbox'));
    
    // Handle indeterminate state
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked, event);
    };

    // Generate IDs for associated elements  
    const descriptionId = description ? `${internalId}-description` : undefined;
    const errorMessageId = errorMessage ? `${internalId}-error` : undefined;
    
    const describedBy = [
      ariaDescribedBy,
      descriptionId,
      errorMessageId,
    ].filter(Boolean).join(' ') || undefined;

    const containerClasses = cn(
      styles.checkboxContainer,
      styles[`checkboxContainer--${size}`],
      className
    );

    const checkboxBoxClasses = cn(
      styles.checkboxBox,
      {
        [styles['checkboxBox--disabled']]: disabled,
        [styles['checkboxBox--error']]: error || Boolean(errorMessage),
        [styles['checkboxBox--success']]: success,
      }
    );

    return (
      <div className={containerClasses}>
        <label htmlFor={internalId} className={styles.checkboxContainer}>
          <input
            ref={mergeRefs(ref, internalRef)}
            type="checkbox"
            id={internalId}
            className={styles.checkbox}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            aria-invalid={error || Boolean(errorMessage) || ariaInvalid}
            {...rest}
          />
          
          <span className={checkboxBoxClasses}>
            {indeterminate ? (
              indeterminateIcon || <DefaultIndeterminateIcon />
            ) : (
              <span className={styles.checkIcon}>
                {checkIcon || <DefaultCheckIcon />}
              </span>
            )}
          </span>

          {label && (
            <div>
              <div className={styles.checkboxLabel}>
                {label}
              </div>
              
              {description && (
                <div id={descriptionId} className={styles.description}>
                  {description}
                </div>
              )}
            </div>
          )}
        </label>

        {errorMessage && (
          <div id={errorMessageId} className={styles.errorMessage} role="alert">
            ⚠️ {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

DynCheckbox.displayName = 'DynCheckbox';
```

---

## 🧪 TESTING ENHANCEMENTS (DynCheckbox.test.tsx):

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testAccessibility } from '../../test-utils';
import { DynCheckbox } from './DynCheckbox';

describe('DynCheckbox', () => {
  describe('Basic Functionality', () => {
    it('renders checkbox with label', () => {
      render(<DynCheckbox label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('handles checked state changes', async () => {
      const handleChange = vi.fn();
      render(<DynCheckbox label="Test" onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('supports controlled component pattern', () => {
      const { rerender } = render(<DynCheckbox label="Controlled" checked={false} />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
      
      rerender(<DynCheckbox label="Controlled" checked={true} />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('supports indeterminate state', () => {
      render(<DynCheckbox label="Indeterminate" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynCheckbox label="Accessible checkbox" />);
      await testAccessibility(container);
    });

    it('associates label with checkbox', () => {
      render(<DynCheckbox label="Terms and conditions" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAccessibleName('Terms and conditions');
    });

    it('associates description with checkbox', () => {
      render(
        <DynCheckbox 
          label="Newsletter" 
          description="Receive weekly updates" 
        />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', expect.stringContaining('description'));
    });

    it('associates error message with checkbox', () => {
      render(
        <DynCheckbox 
          label="Required field" 
          errorMessage="This field is required" 
        />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('announces errors to screen readers', () => {
      render(<DynCheckbox label="Test" errorMessage="Invalid selection" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid selection');
    });

    it('supports keyboard navigation', async () => {
      const handleChange = vi.fn();
      render(<DynCheckbox label="Keyboard test" onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      
      expect(checkbox).toHaveFocus();
      
      // Test Space key to toggle
      await userEvent.keyboard(' ');
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('supports custom aria-label', () => {
      render(<DynCheckbox aria-label="Custom accessible name" />);
      expect(screen.getByRole('checkbox')).toHaveAccessibleName('Custom accessible name');
    });
  });

  describe('States and Variants', () => {
    it('applies size classes correctly', () => {
      const { rerender } = render(<DynCheckbox label="Test" size="small" />);
      expect(screen.getByRole('checkbox').closest('.checkboxContainer')).toHaveClass('checkboxContainer--small');
      
      rerender(<DynCheckbox label="Test" size="large" />);
      expect(screen.getByRole('checkbox').closest('.checkboxContainer')).toHaveClass('checkboxContainer--large');
    });

    it('applies error state correctly', () => {
      render(<DynCheckbox label="Test" error />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies success state correctly', () => {
      render(<DynCheckbox label="Test" success />);
      // Success state styling should be applied
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('disables checkbox when disabled prop is true', () => {
      render(<DynCheckbox label="Test" disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });

  describe('Custom Icons', () => {
    it('renders custom check icon', () => {
      const customIcon = <span data-testid="custom-check">✓</span>;
      render(<DynCheckbox label="Test" checkIcon={customIcon} checked />);
      expect(screen.getByTestId('custom-check')).toBeInTheDocument();
    });

    it('renders custom indeterminate icon', () => {
      const customIcon = <span data-testid="custom-indeterminate">~</span>;
      render(<DynCheckbox label="Test" indeterminateIcon={customIcon} indeterminate />);
      expect(screen.getByTestId('custom-indeterminate')).toBeInTheDocument();
    });
  });

  describe('Click Handling', () => {
    it('toggles when clicking on label', async () => {
      const handleChange = vi.fn();
      render(<DynCheckbox label="Click test" onChange={handleChange} />);
      
      await userEvent.click(screen.getByText('Click test'));
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('toggles when clicking on checkbox box', async () => {
      const handleChange = vi.fn();
      render(<DynCheckbox label="Click test" onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await userEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('does not toggle when disabled', async () => {
      const handleChange = vi.fn();
      render(<DynCheckbox label="Disabled test" disabled onChange={handleChange} />);
      
      await userEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <DynCheckbox label="Agree" name="agree" defaultChecked />
          <button type="submit">Submit</button>
        </form>
      );
      
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('includes checkbox value in form data', () => {
      render(
        <form>
          <DynCheckbox label="Newsletter" name="newsletter" value="yes" defaultChecked />
        </form>
      );
      
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.name).toBe('newsletter');
      expect(checkbox.value).toBe('yes');
      expect(checkbox.checked).toBe(true);
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynCheckbox.stories.tsx):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynCheckbox } from './DynCheckbox';

const meta = {
  title: 'Components/DynCheckbox',
  component: DynCheckbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable checkbox component with design tokens and accessibility features.'
      }
    }
  },
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
    error: {
      control: 'boolean',
    },
    success: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynCheckbox label="Small checkbox" size="small" />
      <DynCheckbox label="Medium checkbox" size="medium" />
      <DynCheckbox label="Large checkbox" size="large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynCheckbox label="Unchecked" />
      <DynCheckbox label="Checked" defaultChecked />
      <DynCheckbox label="Indeterminate" indeterminate />
      <DynCheckbox label="Disabled unchecked" disabled />
      <DynCheckbox label="Disabled checked" disabled defaultChecked />
      <DynCheckbox label="Error state" error />
      <DynCheckbox label="Success state" success />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <DynCheckbox 
        label="Marketing emails" 
        description="Receive promotional emails and updates about new features"
      />
      <DynCheckbox 
        label="Terms and conditions" 
        description="By checking this box, you agree to our terms of service and privacy policy"
        required
      />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <DynCheckbox 
        label="Required field" 
        errorMessage="You must accept the terms to continue"
        required
      />
      <DynCheckbox 
        label="Valid selection" 
        success
        defaultChecked
      />
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynCheckbox 
        label="Custom check icon" 
        checkIcon={<span style={{ color: 'green', fontWeight: 'bold' }}>✓</span>}
        defaultChecked
      />
      <DynCheckbox 
        label="Custom indeterminate icon" 
        indeterminateIcon={<span style={{ color: 'orange' }}>~</span>}
        indeterminate
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Account Preferences</legend>
        
        <DynCheckbox 
          label="Email notifications" 
          name="emailNotifications"
          description="Receive important updates via email"
          defaultChecked
        />
        
        <DynCheckbox 
          label="SMS notifications" 
          name="smsNotifications"
          description="Receive urgent alerts via SMS"
        />
        
        <DynCheckbox 
          label="Marketing communications" 
          name="marketing"
          description="Receive promotional content and offers"
        />
        
        <DynCheckbox 
          label="Terms and conditions" 
          name="terms"
          description="I agree to the terms of service"
          required
          errorMessage={undefined}
        />
      </fieldset>
      
      <button type="submit" style={{ marginTop: '1rem' }}>Save Preferences</button>
    </form>
  ),
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DynCheckbox label="Dark theme checkbox" />
        <DynCheckbox label="Checked in dark mode" defaultChecked />
        <DynCheckbox label="Indeterminate in dark" indeterminate />
        <DynCheckbox 
          label="With description" 
          description="This is how descriptions look in dark theme"
        />
        <DynCheckbox 
          label="Error in dark mode" 
          errorMessage="This is an error message in dark theme"
        />
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <DynCheckbox 
        label="Accessible checkbox"
        description="This checkbox follows WCAG guidelines"
        aria-describedby="extra-description"
      />
      <div id="extra-description">
        Additional context provided via aria-describedby
      </div>
      
      <DynCheckbox 
        aria-label="Custom accessible name for screen readers"
        description="This checkbox uses aria-label instead of visible label"
      />
      
      <DynCheckbox 
        label="Keyboard navigable"
        description="Focus this checkbox and use Space to toggle"
      />
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [checkboxStates, setCheckboxStates] = React.useState({
      option1: false,
      option2: true,
      option3: false,
    });
    
    const allChecked = Object.values(checkboxStates).every(Boolean);
    const someChecked = Object.values(checkboxStates).some(Boolean);
    
    const handleSelectAll = (checked: boolean) => {
      setCheckboxStates({
        option1: checked,
        option2: checked,
        option3: checked,
      });
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DynCheckbox 
          label="Select All"
          checked={allChecked}
          indeterminate={someChecked && !allChecked}
          onChange={handleSelectAll}
        />
        
        <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #ccc' }} />
        
        <DynCheckbox 
          label="Option 1"
          checked={checkboxStates.option1}
          onChange={(checked) => setCheckboxStates(prev => ({ ...prev, option1: checked }))}
        />
        
        <DynCheckbox 
          label="Option 2"
          checked={checkboxStates.option2}
          onChange={(checked) => setCheckboxStates(prev => ({ ...prev, option2: checked }))}
        />
        
        <DynCheckbox 
          label="Option 3"
          checked={checkboxStates.option3}
          onChange={(checked) => setCheckboxStates(prev => ({ ...prev, option3: checked }))}
        />
      </div>
    );
  },
};
```

---

## 📤 EXPORT STANDARDIZATION (index.ts):

```typescript
export { DynCheckbox } from './DynCheckbox';
export { default } from './DynCheckbox';
export type { 
  DynCheckboxProps, 
  DynCheckboxRef 
} from './DynCheckbox.types';
```

---

## ✅ DELIVERABLE CHECKLIST:

- [ ] CSS custom properties umesto hard-coded vrednosti
- [ ] Custom checkbox styling sa native checkbox skrivenim
- [ ] Responsive design sa dovoljno velikim touch targets (44px)
- [ ] Dark theme support
- [ ] Indeterminate state podrška
- [ ] Error i success states
- [ ] Label i description asocijacija
- [ ] Accessibility compliance (WCAG AAA)
- [ ] Keyboard navigation (Space za toggle)
- [ ] Screen reader support sa proper ARIA
- [ ] Custom icon support (check i indeterminate)
- [ ] Comprehensive testing (85%+ coverage)
- [ ] Storybook sa interactive examples
- [ ] forwardRef pattern implementiran

🎯 **SUCCESS**: Production-ready checkbox sa custom styling i accessibility!