# 🎯 DYN-UI CODEX PROMPT 02 - DynInput

## 🚀 AI ZADATAK: Refaktoriši DynInput komponent za form validation i accessibility

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim form komponentima

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynInput/
├── DynInput.tsx
├── DynInput.types.ts  
├── DynInput.module.css
├── DynInput.stories.tsx
├── DynInput.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynInput.module.css):

```css
.input {
  /* Design tokens implementation */
  display: inline-flex;
  width: 100%;
  min-height: var(--dyn-spacing-2xl);
  padding: var(--dyn-spacing-md) var(--dyn-spacing-lg);
  font-family: var(--dyn-font-family-primary);
  font-size: var(--dyn-font-size-base);
  font-weight: var(--dyn-font-weight-normal);
  line-height: var(--dyn-line-height-normal);
  color: var(--dyn-color-text-primary);
  background-color: var(--dyn-color-bg-primary);
  border: var(--dyn-border-width) solid var(--dyn-color-border);
  border-radius: var(--dyn-border-radius-md);
  transition: var(--dyn-transition-fast);
  
  &::placeholder {
    color: var(--dyn-color-text-secondary);
    opacity: 1;
  }
  
  &:hover:not(:disabled):not(:focus) {
    border-color: var(--dyn-color-border-hover);
  }
  
  &:focus {
    outline: none;
    border-color: var(--dyn-color-focus);
    box-shadow: var(--dyn-shadow-focus);
  }
  
  &:disabled {
    background-color: var(--dyn-color-bg-disabled);
    color: var(--dyn-color-text-disabled);
    border-color: var(--dyn-color-border);
    cursor: not-allowed;
  }
  
  &:invalid {
    border-color: var(--dyn-color-border-error);
  }
}

/* Size variants */
.input--small {
  min-height: var(--dyn-spacing-xl);
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  font-size: var(--dyn-font-size-sm);
}

.input--large {
  min-height: var(--dyn-spacing-3xl);
  padding: var(--dyn-spacing-lg) var(--dyn-spacing-xl);
  font-size: var(--dyn-font-size-lg);
}

/* Error state */
.input--error {
  border-color: var(--dyn-color-border-error);
  
  &:focus {
    border-color: var(--dyn-color-danger);
    box-shadow: 0 0 0 var(--dyn-focus-ring-width) rgba(220, 53, 69, 0.2);
  }
}

/* Success state */
.input--success {
  border-color: var(--dyn-color-success);
  
  &:focus {
    border-color: var(--dyn-color-success);
    box-shadow: 0 0 0 var(--dyn-focus-ring-width) rgba(40, 167, 69, 0.2);
  }
}

/* Input container */
.inputContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Input wrapper */
.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* Start/End icons */
.startIcon,
.endIcon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dyn-color-text-secondary);
  pointer-events: none;
  z-index: 1;
}

.startIcon {
  left: var(--dyn-spacing-md);
}

.endIcon {
  right: var(--dyn-spacing-md);
}

.input--hasStartIcon {
  padding-left: var(--dyn-spacing-3xl);
}

.input--hasEndIcon {
  padding-right: var(--dyn-spacing-3xl);
}

/* Clear button */
.clearButton {
  position: absolute;
  right: var(--dyn-spacing-sm);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--dyn-spacing-xs);
  border-radius: var(--dyn-border-radius-sm);
  color: var(--dyn-color-text-secondary);
  transition: var(--dyn-transition-fast);
  
  &:hover {
    background-color: var(--dyn-color-neutral-100);
    color: var(--dyn-color-text-primary);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}

/* Label */
.label {
  display: flex;
  align-items: center;
  margin-bottom: var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-sm);
  font-weight: var(--dyn-font-weight-medium);
  color: var(--dyn-color-text-primary);
}

.requiredIndicator {
  margin-left: var(--dyn-spacing-xs);
  color: var(--dyn-color-danger);
}

/* Help text */
.helpText {
  margin-top: var(--dyn-spacing-xs);
  font-size: var(--dyn-font-size-sm);
  color: var(--dyn-color-text-secondary);
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
  .input {
    min-height: 44px; /* Touch target */
    font-size: var(--dyn-font-size-base);
  }
  
  .input--small {
    min-height: 40px;
  }
  
  .input--large {
    min-height: 52px;
  }
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  .input {
    background-color: var(--dyn-color-neutral-800);
    border-color: var(--dyn-color-neutral-600);
    color: var(--dyn-color-neutral-0);
  }
  
  .clearButton:hover {
    background-color: var(--dyn-color-neutral-700);
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynInput.types.ts):

```typescript
import { InputHTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps, FormFieldProps } from '../../types/base';

export interface DynInputProps extends 
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
  BaseComponentProps,
  AccessibilityProps,
  FormFieldProps {
  
  /** Input size variant */
  size?: ComponentSize;
  
  /** Input is in error state */
  error?: boolean;
  
  /** Input is in success state */  
  success?: boolean;
  
  /** Icon before input */
  startIcon?: ReactNode;
  
  /** Icon after input */
  endIcon?: ReactNode;
  
  /** Show clear button when input has value */
  clearable?: boolean;
  
  /** Callback when clear button is clicked */
  onClear?: () => void;
  
  /** Loading state */
  loading?: boolean;
  
  /** Full width input */
  fullWidth?: boolean;
  
  /** Input label */
  label?: string;
  
  /** Help text below input */
  helpText?: string;
  
  /** Error message */
  errorMessage?: string;
  
  /** Required field indicator */
  required?: boolean;
  
  /** Auto resize for textarea */
  autoResize?: boolean;
}

export interface DynInputRef extends HTMLInputElement {}
```

---

## ⚛️ REACT COMPONENT (DynInput.tsx):

```typescript
import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../utils/className';
import { generateId } from '../../utils/accessibility';
import { DynInputProps, DynInputRef } from './DynInput.types';
import styles from './DynInput.module.css';

export const DynInput = forwardRef<DynInputRef, DynInputProps>(
  (
    {
      className,
      size = 'medium',
      error = false,
      success = false,
      startIcon,
      endIcon,
      clearable = false,
      onClear,
      loading = false,
      fullWidth = true,
      label,
      helpText,
      errorMessage,
      required = false,
      disabled = false,
      value,
      onChange,
      onFocus,
      onBlur,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      id,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalId] = useState(() => id || generateId('input'));
    const [hasValue, setHasValue] = useState(Boolean(value));

    useEffect(() => {
      setHasValue(Boolean(value));
    }, [value]);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(event.target.value));
      onChange?.(event);
    };

    const handleClear = () => {
      setHasValue(false);
      onClear?.();
    };

    // Generate IDs for associated elements
    const helpTextId = helpText ? `${internalId}-help` : undefined;
    const errorMessageId = errorMessage ? `${internalId}-error` : undefined;
    
    const describedBy = [
      ariaDescribedBy,
      helpTextId,
      errorMessageId,
    ].filter(Boolean).join(' ') || undefined;

    const inputClasses = cn(
      styles.input,
      styles[`input--${size}`],
      {
        [styles['input--error']]: error || Boolean(errorMessage),
        [styles['input--success']]: success,
        [styles['input--hasStartIcon']]: Boolean(startIcon),
        [styles['input--hasEndIcon']]: Boolean(endIcon) || (clearable && hasValue),
      },
      className
    );

    return (
      <div className={cn(styles.inputContainer, { [styles['inputContainer--fullWidth']]: fullWidth })}>
        {/* Label */}
        {label && (
          <label htmlFor={internalId} className={styles.label}>
            {label}
            {required && <span className={styles.requiredIndicator} aria-label="required">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className={styles.inputWrapper}>
          {/* Start icon */}
          {startIcon && (
            <span className={styles.startIcon} aria-hidden="true">
              {startIcon}
            </span>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={internalId}
            className={inputClasses}
            disabled={disabled || loading}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            aria-invalid={error || Boolean(errorMessage) || ariaInvalid}
            aria-required={required}
            {...rest}
          />

          {/* End icon */}
          {endIcon && !clearable && (
            <span className={styles.endIcon} aria-hidden="true">
              {endIcon}
            </span>
          )}

          {/* Clear button */}
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              ✕
            </button>
          )}
        </div>

        {/* Help text */}
        {helpText && (
          <div id={helpTextId} className={styles.helpText}>
            {helpText}
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div id={errorMessageId} className={styles.errorMessage} role="alert">
            ⚠️ {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

DynInput.displayName = 'DynInput';
```

---

## 🧪 TESTING ENHANCEMENTS (DynInput.test.tsx):

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testAccessibility } from '../../test-utils';
import { DynInput } from './DynInput';

describe('DynInput', () => {
  describe('Basic Functionality', () => {
    it('renders input with label', () => {
      render(<DynInput label="Name" />);
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('handles value changes', async () => {
      const handleChange = vi.fn();
      render(<DynInput label="Test" onChange={handleChange} />);
      
      const input = screen.getByLabelText('Test');
      await userEvent.type(input, 'hello');
      
      expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it('shows required indicator when required', () => {
      render(<DynInput label="Required Field" required />);
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynInput label="Accessible input" />);
      await testAccessibility(container);
    });

    it('associates label with input', () => {
      render(<DynInput label="Username" />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });

    it('associates help text with input', () => {
      render(<DynInput label="Email" helpText="Enter your email address" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('help'));
    });

    it('associates error message with input', () => {
      render(<DynInput label="Password" errorMessage="Password is required" />);
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('error'));
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('announces errors to screen readers', () => {
      render(<DynInput label="Email" errorMessage="Invalid email format" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email format');
    });

    it('supports aria-required for required fields', () => {
      render(<DynInput label="Required" required />);
      expect(screen.getByLabelText(/Required/)).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('States and Variants', () => {
    it('applies size classes correctly', () => {
      const { rerender } = render(<DynInput label="Test" size="small" />);
      expect(screen.getByLabelText('Test')).toHaveClass('input--small');
      
      rerender(<DynInput label="Test" size="large" />);
      expect(screen.getByLabelText('Test')).toHaveClass('input--large');
    });

    it('applies error state correctly', () => {
      render(<DynInput label="Test" error />);
      expect(screen.getByLabelText('Test')).toHaveClass('input--error');
      expect(screen.getByLabelText('Test')).toHaveAttribute('aria-invalid', 'true');
    });

    it('applies success state correctly', () => {
      render(<DynInput label="Test" success />);
      expect(screen.getByLabelText('Test')).toHaveClass('input--success');
    });

    it('disables input when disabled prop is true', () => {
      render(<DynInput label="Test" disabled />);
      expect(screen.getByLabelText('Test')).toBeDisabled();
    });
  });

  describe('Icons and Clear Button', () => {
    it('renders start icon', () => {
      render(<DynInput label="Search" startIcon={<span data-testid="search-icon">🔍</span>} />);
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders end icon', () => {
      render(<DynInput label="Password" endIcon={<span data-testid="eye-icon">👁️</span>} />);
      expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    });

    it('shows clear button when clearable and has value', async () => {
      const handleClear = vi.fn();
      render(<DynInput label="Search" clearable onClear={handleClear} />);
      
      const input = screen.getByLabelText('Search');
      await userEvent.type(input, 'test');
      
      const clearButton = screen.getByRole('button', { name: 'Clear input' });
      expect(clearButton).toBeInTheDocument();
      
      await userEvent.click(clearButton);
      expect(handleClear).toHaveBeenCalled();
    });

    it('hides clear button when input is empty', () => {
      render(<DynInput label="Search" clearable />);
      expect(screen.queryByRole('button', { name: 'Clear input' })).not.toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('handles focus and blur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      render(<DynInput label="Test" onFocus={handleFocus} onBlur={handleBlur} />);
      
      const input = screen.getByLabelText('Test');
      
      input.focus();
      expect(handleFocus).toHaveBeenCalled();
      
      input.blur();
      expect(handleBlur).toHaveBeenCalled();
    });

    it('shows focus styles when focused', async () => {
      render(<DynInput label="Test" />);
      const input = screen.getByLabelText('Test');
      
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <DynInput label="Name" name="name" defaultValue="John" />
          <button type="submit">Submit</button>
        </form>
      );
      
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('supports controlled input pattern', async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return (
          <DynInput
            label="Controlled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      };
      
      render(<TestComponent />);
      const input = screen.getByLabelText('Controlled');
      
      await userEvent.type(input, 'test');
      expect(input).toHaveValue('test');
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynInput.stories.tsx):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynInput } from './DynInput';
import { DynIcon } from '../DynIcon';

const meta = {
  title: 'Components/DynInput',
  component: DynInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with design tokens, validation, and accessibility features.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    error: {
      control: 'boolean',
    },
    success: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynInput label="Small" size="small" placeholder="Small input" />
      <DynInput label="Medium" size="medium" placeholder="Medium input" />
      <DynInput label="Large" size="large" placeholder="Large input" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynInput label="Normal" placeholder="Normal state" />
      <DynInput label="Error" error placeholder="Error state" />
      <DynInput label="Success" success placeholder="Success state" />
      <DynInput label="Disabled" disabled placeholder="Disabled state" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynInput 
        label="Search" 
        placeholder="Search..." 
        startIcon={<DynIcon name="search" />} 
      />
      <DynInput 
        label="Password" 
        type="password" 
        placeholder="Enter password" 
        endIcon={<DynIcon name="eye" />} 
      />
      <DynInput 
        label="Email" 
        type="email" 
        placeholder="Enter email" 
        startIcon={<DynIcon name="mail" />}
        endIcon={<DynIcon name="check" />}
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynInput 
        label="Username" 
        placeholder="Enter username"
        helpText="Username must be at least 3 characters long"
      />
      <DynInput 
        label="Email" 
        type="email"
        placeholder="Enter email"
        helpText="We'll never share your email"
        required
      />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynInput 
        label="Email" 
        type="email"
        placeholder="Enter email"
        errorMessage="Please enter a valid email address"
        defaultValue="invalid-email"
      />
      <DynInput 
        label="Password" 
        type="password"
        placeholder="Enter password"
        errorMessage="Password must be at least 8 characters"
        required
      />
      <DynInput 
        label="Confirmed Email" 
        type="email"
        placeholder="Confirmed"
        success
        helpText="Email address confirmed"
        defaultValue="user@example.com"
      />
    </div>
  ),
};

export const Clearable: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynInput 
        label="Search" 
        placeholder="Type to search..."
        clearable
        startIcon={<DynIcon name="search" />}
        defaultValue="Initial search term"
      />
    </div>
  ),
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <DynInput label="Dark Input" placeholder="Dark theme input" />
        <DynInput 
          label="With Icon" 
          placeholder="Search in dark mode" 
          startIcon={<DynIcon name="search" />}
          clearable
        />
        <DynInput 
          label="Error State" 
          placeholder="Error in dark mode"
          errorMessage="This field is required"
        />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynInput 
        label="Full Name" 
        placeholder="Enter your full name"
        required
        helpText="Enter your first and last name"
      />
      <DynInput 
        label="Email Address" 
        type="email"
        placeholder="Enter your email"
        required
        startIcon={<DynIcon name="mail" />}
      />
      <DynInput 
        label="Phone Number" 
        type="tel"
        placeholder="+1 (555) 123-4567"
        helpText="Include country code"
      />
      <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
    </form>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <DynInput 
        label="Accessible Input"
        placeholder="Fully accessible"
        helpText="This input follows WCAG guidelines"
        aria-describedby="custom-description"
      />
      <div id="custom-description">
        This input demonstrates proper accessibility implementation
      </div>
      <DynInput 
        label="Required Field"
        placeholder="Must be filled"
        required
        aria-label="Required user input field"
      />
    </div>
  ),
};
```

---

## 📤 EXPORT STANDARDIZATION (index.ts):

```typescript
export { DynInput } from './DynInput';
export { default } from './DynInput';
export type { 
  DynInputProps, 
  DynInputRef 
} from './DynInput.types';
```

---

## ✅ DELIVERABLE CHECKLIST:

- [ ] CSS custom properties umesto hard-coded vrednosti
- [ ] Responsive design sa 44px touch targets na mobile
- [ ] Dark theme support
- [ ] Form validation states (error, success)
- [ ] Accessibility compliance (WCAG AAA)
- [ ] Screen reader support sa proper ARIA
- [ ] Clear button funkcionalnost
- [ ] Start/end icon podrška
- [ ] Label i help text asocijacija
- [ ] Comprehensive testing (85%+ coverage)
- [ ] Storybook sa dark theme i accessibility examples
- [ ] forwardRef pattern implementiran
- [ ] Keyboard navigation optimizovan

🎯 **SUCCESS**: Production-ready input komponent sa potpunom form validation i accessibility podrškom!