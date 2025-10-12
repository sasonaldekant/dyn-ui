# 🎯 DYN-UI CODEX PROMPT 05 - DynBadge

## 🚀 AI ZADATAK: Refaktoriši DynBadge komponent za design tokens compliance i semantic colors

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim simple komponentima

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynBadge/
├── DynBadge.tsx
├── DynBadge.types.ts  
├── DynBadge.module.css
├── DynBadge.stories.tsx
├── DynBadge.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynBadge.module.css):

**TRENUTNO STANJE**: Hard-coded hex colors i font properties
**POTREBNO**: Design tokens i semantic color variants

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--dyn-border-radius-full);
  font-family: var(--dyn-font-family-primary);
  font-weight: var(--dyn-font-weight-semibold);
  line-height: var(--dyn-line-height-tight);
  white-space: nowrap;
  vertical-align: middle;
  gap: var(--dyn-spacing-xs);
  transition: var(--dyn-transition-fast);
  border: var(--dyn-border-width) solid transparent;
}

/* Size variants using design tokens */
.badge--small {
  height: var(--dyn-spacing-lg);
  min-width: var(--dyn-spacing-lg);
  padding: 0 var(--dyn-spacing-xs);
  font-size: var(--dyn-font-size-xs);
}

.badge--medium {
  height: var(--dyn-spacing-xl);
  min-width: var(--dyn-spacing-xl);
  padding: 0 var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-sm);
}

.badge--large {
  height: calc(var(--dyn-spacing-xl) + var(--dyn-spacing-xs));
  min-width: calc(var(--dyn-spacing-xl) + var(--dyn-spacing-xs));
  padding: 0 var(--dyn-spacing-md);
  font-size: var(--dyn-font-size-base);
}

/* Semantic color variants */
.badge--primary {
  background-color: var(--dyn-color-primary);
  color: var(--dyn-color-text-on-primary);
}

.badge--secondary {
  background-color: var(--dyn-color-secondary);
  color: var(--dyn-color-text-on-secondary);
}

.badge--success {
  background-color: var(--dyn-color-success);
  color: var(--dyn-color-text-on-primary);
}

.badge--warning {
  background-color: var(--dyn-color-warning);
  color: var(--dyn-color-neutral-900);
}

.badge--danger {
  background-color: var(--dyn-color-danger);
  color: var(--dyn-color-text-on-primary);
}

.badge--info {
  background-color: var(--dyn-color-info);
  color: var(--dyn-color-text-on-primary);
}

.badge--neutral {
  background-color: var(--dyn-color-neutral-500);
  color: var(--dyn-color-text-on-primary);
}

/* Variant styles */
.badge--solid {
  /* Default variant - colors defined above */
}

.badge--soft {
  background-color: var(--dyn-color-primary-alpha-10);
  color: var(--dyn-color-primary);
  
  &.badge--secondary {
    background-color: var(--dyn-color-neutral-100);
    color: var(--dyn-color-text-primary);
  }
  
  &.badge--success {
    background-color: rgba(40, 167, 69, 0.1);
    color: var(--dyn-color-success);
  }
  
  &.badge--warning {
    background-color: rgba(255, 193, 7, 0.1);
    color: var(--dyn-color-warning);
  }
  
  &.badge--danger {
    background-color: rgba(220, 53, 69, 0.1);
    color: var(--dyn-color-danger);
  }
  
  &.badge--info {
    background-color: rgba(23, 162, 184, 0.1);
    color: var(--dyn-color-info);
  }
  
  &.badge--neutral {
    background-color: var(--dyn-color-neutral-100);
    color: var(--dyn-color-text-secondary);
  }
}

.badge--outline {
  background-color: transparent;
  border-color: var(--dyn-color-primary);
  color: var(--dyn-color-primary);
  
  &.badge--secondary {
    border-color: var(--dyn-color-neutral-300);
    color: var(--dyn-color-text-primary);
  }
  
  &.badge--success {
    border-color: var(--dyn-color-success);
    color: var(--dyn-color-success);
  }
  
  &.badge--warning {
    border-color: var(--dyn-color-warning);
    color: var(--dyn-color-warning);
  }
  
  &.badge--danger {
    border-color: var(--dyn-color-danger);
    color: var(--dyn-color-danger);
  }
  
  &.badge--info {
    border-color: var(--dyn-color-info);
    color: var(--dyn-color-info);
  }
  
  &.badge--neutral {
    border-color: var(--dyn-color-neutral-400);
    color: var(--dyn-color-text-secondary);
  }
}

/* Interactive states */
.badge--clickable {
  cursor: pointer;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--dyn-shadow-sm);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
  
  &:active {
    transform: translateY(0);
  }
}

/* Dot variant */
.badge--dot {
  width: var(--dyn-spacing-sm);
  height: var(--dyn-spacing-sm);
  min-width: var(--dyn-spacing-sm);
  padding: 0;
  border-radius: var(--dyn-border-radius-full);
  
  /* Hide content in dot mode */
  .badge__content {
    display: none;
  }
}

/* Badge content */
.badge__content {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-xs);
}

.badge__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.75em;
}

.badge__text {
  font-weight: inherit;
  min-width: 0; /* Allow text truncation */
}

/* Positioning variants for absolute badges */
.badge--positioned {
  position: absolute;
  transform: translate(50%, -50%);
  z-index: var(--dyn-z-index-dropdown);
}

.badge--topRight {
  top: 0;
  right: 0;
}

.badge--topLeft {
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}

.badge--bottomRight {
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.badge--bottomLeft {
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

/* Count badges */
.badge--count {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}

/* Responsive design */
@media (max-width: 767px) {
  .badge--clickable {
    /* Ensure minimum touch target */
    min-height: 32px;
    min-width: 32px;
  }
  
  .badge--small.badge--clickable {
    min-height: 28px;
    min-width: 28px;
  }
  
  /* Slightly larger text on mobile */
  .badge--small {
    font-size: var(--dyn-font-size-xs);
  }
  
  .badge--medium {
    font-size: var(--dyn-font-size-sm);
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .badge {
    border-color: var(--dyn-color-neutral-600);
  }
  
  .badge--soft {
    &.badge--secondary {
      background-color: var(--dyn-color-neutral-800);
      color: var(--dyn-color-text-primary);
    }
    
    &.badge--neutral {
      background-color: var(--dyn-color-neutral-700);
      color: var(--dyn-color-text-secondary);
    }
  }
  
  .badge--outline {
    &.badge--secondary {
      border-color: var(--dyn-color-neutral-600);
      color: var(--dyn-color-text-primary);
    }
    
    &.badge--neutral {
      border-color: var(--dyn-color-neutral-500);
      color: var(--dyn-color-text-secondary);
    }
  }
}

/* High contrast support */
@media (prefers-contrast: high) {
  .badge {
    border-width: calc(var(--dyn-border-width) * 2);
  }
  
  .badge--soft,
  .badge--outline {
    border-color: currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .badge,
  .badge--clickable:hover,
  .badge--clickable:active {
    transition: none;
    transform: none;
  }
}

/* Animation for dynamic badges */
.badge--animated {
  animation: badge-appear var(--dyn-duration-normal) var(--dyn-timing-ease);
}

@keyframes badge-appear {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse animation for notifications */
.badge--pulse {
  animation: badge-pulse 2s infinite;
}

@keyframes badge-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynBadge.types.ts):

**ZADATAK**: Standardizuj sa BaseComponentProps i semantic variants

```typescript
import { HTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps } from '../../types/base';

export type DynBadgeVariant = 'solid' | 'soft' | 'outline' | 'dot';
export type DynBadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type DynBadgePosition = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface DynBadgeProps extends 
  BaseComponentProps<HTMLSpanElement>,
  AccessibilityProps {
  
  /** Badge content */
  children?: ReactNode;
  
  /** Badge variant style */
  variant?: DynBadgeVariant;
  
  /** Semantic color */
  color?: DynBadgeColor;
  
  /** Size variant */
  size?: ComponentSize;
  
  /** Position when used as overlay */
  position?: DynBadgePosition;
  
  /** Click handler (makes badge interactive) */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  
  /** Icon before text */
  startIcon?: ReactNode;
  
  /** Icon after text */
  endIcon?: ReactNode;
  
  /** Max count before showing + */
  maxCount?: number;
  
  /** Numeric value (for count badges) */
  count?: number;
  
  /** Show badge even when count is 0 */
  showZero?: boolean;
  
  /** Animate appearance */
  animated?: boolean;
  
  /** Pulse animation for notifications */
  pulse?: boolean;
  
  /** Accessible description for count */
  countDescription?: string;
}

export interface DynBadgeRef extends HTMLSpanElement {}
```

---

## ⚛️ REACT COMPONENT (DynBadge.tsx):

```typescript
import React, { forwardRef } from 'react';
import { cn } from '../../utils/className';
import { generateId } from '../../utils/accessibility';
import { DynBadgeProps, DynBadgeRef } from './DynBadge.types';
import styles from './DynBadge.module.css';

export const DynBadge = forwardRef<DynBadgeRef, DynBadgeProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'primary',
      size = 'medium',
      position,
      onClick,
      startIcon,
      endIcon,
      maxCount = 99,
      count,
      showZero = false,
      animated = false,
      pulse = false,
      countDescription,
      className,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-live': ariaLive,
      'data-testid': dataTestId,
      ...rest
    },
    ref
  ) => {
    const [internalId] = React.useState(() => id || generateId('badge'));
    const isInteractive = Boolean(onClick);
    
    // Handle count display
    const displayCount = React.useMemo(() => {
      if (typeof count !== 'number') return null;
      if (count === 0 && !showZero) return null;
      if (count > maxCount) return `${maxCount}+`;
      return count.toString();
    }, [count, maxCount, showZero]);
    
    // Content to display
    const displayContent = displayCount || children;
    
    // Don't render if no content and not showing zero
    if (!displayContent && !startIcon && !endIcon) {
      return null;
    }

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
      if (!isInteractive) return;
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (!isInteractive) return;
      
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as any);
      }
    };

    const badgeClasses = cn(
      styles.badge,
      styles[`badge--${size}`],
      styles[`badge--${color}`],
      styles[`badge--${variant}`],
      {
        [styles['badge--clickable']]: isInteractive,
        [styles['badge--positioned']]: Boolean(position),
        [styles[`badge--${position}`]]: position,
        [styles['badge--dot']]: variant === 'dot',
        [styles['badge--count']]: typeof count === 'number',
        [styles['badge--animated']]: animated,
        [styles['badge--pulse']]: pulse,
      },
      className
    );

    // Accessibility props
    const accessibilityProps = {
      id: internalId,
      role: isInteractive ? 'button' : undefined,
      tabIndex: isInteractive ? 0 : undefined,
      'aria-label': ariaLabel || (
        typeof count === 'number' 
          ? `${countDescription || 'Count'}: ${displayCount}`
          : undefined
      ),
      'aria-describedby': ariaDescribedBy,
      'aria-live': ariaLive || (typeof count === 'number' ? 'polite' : undefined),
      'data-testid': dataTestId || 'dyn-badge',
    };

    return (
      <span
        ref={ref}
        className={badgeClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...accessibilityProps}
        {...rest}
      >
        <span className={styles.badge__content}>
          {startIcon && (
            <span className={styles.badge__icon} aria-hidden=\"true\">
              {startIcon}
            </span>
          )}
          
          {displayContent && variant !== 'dot' && (
            <span className={styles.badge__text}>
              {displayContent}
            </span>
          )}
          
          {endIcon && (
            <span className={styles.badge__icon} aria-hidden=\"true\">
              {endIcon}
            </span>
          )}
        </span>
        
        {/* Screen reader count announcement */}
        {typeof count === 'number' && count > 0 && (
          <span className=\"dyn-sr-only\">
            {countDescription || 'Notifications'}: {displayCount}
          </span>
        )}
      </span>
    );
  }
);

DynBadge.displayName = 'DynBadge';
```

---

## 🧪 TESTING ENHANCEMENTS (DynBadge.test.tsx):

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testAccessibility } from '../../test-utils';
import { DynBadge } from './DynBadge';

describe('DynBadge', () => {
  describe('Basic Functionality', () => {
    it('renders badge with text content', () => {
      render(<DynBadge>New</DynBadge>);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByTestId('dyn-badge')).toBeInTheDocument();
    });

    it('renders count badges correctly', () => {
      render(<DynBadge count={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows maxCount+ when count exceeds maximum', () => {
      render(<DynBadge count={150} maxCount={99} />);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('hides badge when count is 0 and showZero is false', () => {
      const { container } = render(<DynBadge count={0} />);
      expect(container.firstChild).toBeNull();
    });

    it('shows badge when count is 0 and showZero is true', () => {
      render(<DynBadge count={0} showZero />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynBadge>Accessible badge</DynBadge>);
      await testAccessibility(container);
    });

    it('announces count to screen readers', () => {
      render(<DynBadge count={3} countDescription=\"Notifications\" />);
      expect(screen.getByText('Notifications: 3')).toBeInTheDocument();
    });

    it('has aria-live for dynamic counts', () => {
      render(<DynBadge count={5} />);
      expect(screen.getByTestId('dyn-badge')).toHaveAttribute('aria-live', 'polite');
    });

    it('supports custom aria-label', () => {
      render(<DynBadge aria-label=\"Status indicator\">Active</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveAttribute('aria-label', 'Status indicator');
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <DynBadge aria-describedby=\"badge-description\">Status</DynBadge>
          <div id=\"badge-description\">Current user status</div>
        </>
      );
      expect(screen.getByTestId('dyn-badge')).toHaveAttribute('aria-describedby', 'badge-description');
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events when clickable', async () => {
      const handleClick = vi.fn();
      render(<DynBadge onClick={handleClick}>Clickable</DynBadge>);
      
      const badge = screen.getByRole('button');
      expect(badge).toHaveAttribute('tabIndex', '0');
      
      await userEvent.click(badge);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn();
      render(<DynBadge onClick={handleClick}>Keyboard</DynBadge>);
      
      const badge = screen.getByRole('button');
      badge.focus();
      
      // Test Enter key
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test Space key
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('is not interactive without onClick', () => {
      render(<DynBadge>Non-interactive</DynBadge>);
      const badge = screen.getByTestId('dyn-badge');
      
      expect(badge).not.toHaveAttribute('role', 'button');
      expect(badge).not.toHaveAttribute('tabIndex');
    });
  });

  describe('Variants and Colors', () => {
    it('applies variant classes correctly', () => {
      const { rerender } = render(<DynBadge variant=\"solid\">Solid</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--solid');
      
      rerender(<DynBadge variant=\"soft\">Soft</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--soft');
      
      rerender(<DynBadge variant=\"outline\">Outline</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--outline');
    });

    it('applies color classes correctly', () => {
      const { rerender } = render(<DynBadge color=\"primary\">Primary</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--primary');
      
      rerender(<DynBadge color=\"danger\">Danger</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--danger');
      
      rerender(<DynBadge color=\"success\">Success</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--success');
    });

    it('applies size classes correctly', () => {
      const { rerender } = render(<DynBadge size=\"small\">Small</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--small');
      
      rerender(<DynBadge size=\"large\">Large</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--large');
    });

    it('renders dot variant correctly', () => {
      render(<DynBadge variant=\"dot\" color=\"danger\" />);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--dot');
    });
  });

  describe('Icons', () => {
    it('renders start icon', () => {
      render(
        <DynBadge startIcon={<span data-testid=\"start-icon\">🔥</span>}>
          Hot
        </DynBadge>
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('renders end icon', () => {
      render(
        <DynBadge endIcon={<span data-testid=\"end-icon\">→</span>}>
          Next
        </DynBadge>
      );
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    it('applies position classes correctly', () => {
      render(<DynBadge position=\"topRight\">Positioned</DynBadge>);
      const badge = screen.getByTestId('dyn-badge');
      expect(badge).toHaveClass('badge--positioned');
      expect(badge).toHaveClass('badge--topRight');
    });
  });

  describe('Animation', () => {
    it('applies animated class when animated prop is true', () => {
      render(<DynBadge animated>Animated</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--animated');
    });

    it('applies pulse class when pulse prop is true', () => {
      render(<DynBadge pulse>Pulsing</DynBadge>);
      expect(screen.getByTestId('dyn-badge')).toHaveClass('badge--pulse');
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynBadge.stories.tsx):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynBadge } from './DynBadge';
import { DynIcon } from '../DynIcon';

const meta = {
  title: 'Components/DynBadge',
  component: DynBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile badge component for status indicators, counts, and labels with full accessibility support.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'dot'],
      description: 'Badge visual variant'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Semantic color'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Badge size'
    },
    count: {
      control: 'number',
      description: 'Numeric count to display'
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'New',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge color=\"primary\">Primary</DynBadge>
      <DynBadge color=\"secondary\">Secondary</DynBadge>
      <DynBadge color=\"success\">Success</DynBadge>
      <DynBadge color=\"warning\">Warning</DynBadge>
      <DynBadge color=\"danger\">Danger</DynBadge>
      <DynBadge color=\"info\">Info</DynBadge>
      <DynBadge color=\"neutral\">Neutral</DynBadge>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <DynBadge variant=\"solid\">Solid</DynBadge>
        <DynBadge variant=\"soft\">Soft</DynBadge>
        <DynBadge variant=\"outline\">Outline</DynBadge>
        <DynBadge variant=\"dot\" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge size=\"small\">Small</DynBadge>
      <DynBadge size=\"medium\">Medium</DynBadge>  
      <DynBadge size=\"large\">Large</DynBadge>
    </div>
  ),
};

export const CountBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynBadge count={3} />
      <DynBadge count={99} />
      <DynBadge count={150} maxCount={99} />
      <DynBadge count={0} showZero />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge startIcon={<DynIcon name=\"star\" />}>Featured</DynBadge>
      <DynBadge endIcon={<DynIcon name=\"arrow-right\" />}>Next</DynBadge>
      <DynBadge 
        startIcon={<DynIcon name=\"check\" />}
        color=\"success\"
      >
        Verified
      </DynBadge>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: 64, height: 64, background: '#f0f0f0', borderRadius: 8 }}>
        <DynBadge variant=\"dot\" color=\"success\" position=\"topRight\" />
        <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: '0.75rem' }}>Online</span>
      </div>
      <div style={{ position: 'relative', width: 64, height: 64, background: '#f0f0f0', borderRadius: 8 }}>
        <DynBadge count={3} color=\"danger\" position=\"topRight\" />
        <span style={{ position: 'absolute', bottom: 4, left: 4, fontSize: '0.75rem' }}>Alerts</span>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <DynBadge onClick={() => alert('Badge clicked!')}>
        Clickable
      </DynBadge>
      <DynBadge 
        count={5} 
        onClick={() => alert('5 notifications')}
        countDescription=\"Notifications\"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive badges with click handlers and keyboard navigation.'
      }
    }
  }
};

export const Animated: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <DynBadge animated>Animated</DynBadge>
      <DynBadge pulse color=\"danger\">Pulsing</DynBadge>
      <DynBadge animated pulse count={1} color=\"info\" />
    </div>
  ),
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme=\"dark\" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <DynBadge color=\"primary\">Primary</DynBadge>
        <DynBadge variant=\"soft\" color=\"success\">Soft Success</DynBadge>
        <DynBadge variant=\"outline\" color=\"warning\">Outline Warning</DynBadge>
        <DynBadge variant=\"dot\" color=\"danger\" />
        <DynBadge count={9} color=\"info\" />
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
      <DynBadge 
        count={12}
        countDescription=\"Unread messages\"
        aria-describedby=\"message-description\"
      />
      <p id=\"message-description\">You have unread messages in your inbox</p>
      
      <DynBadge 
        color=\"success\"
        onClick={() => {}}
        aria-label=\"Mark as complete\"
      >
        ✓ Complete
      </DynBadge>
      
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button style={{ padding: '8px 16px' }}>Inbox</button>
        <DynBadge 
          count={3}
          position=\"topRight\"
          countDescription=\"Unread emails\"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility examples with ARIA attributes and screen reader support.'
      }
    }
  }
};
```

---

## 📤 EXPORT STANDARDIZATION (index.ts):

```typescript
export { DynBadge } from './DynBadge';
export { default } from './DynBadge';
export type { 
  DynBadgeProps, 
  DynBadgeRef,
  DynBadgeVariant,
  DynBadgeColor,
  DynBadgePosition
} from './DynBadge.types';
```

---

## ✅ DELIVERABLE CHECKLIST:

- [ ] **CSS Design Tokens**: Svi hard-coded hex colors zamenjeni sa semantic tokens
- [ ] **Responsive Design**: Touch targets i mobile optimizacija
- [ ] **Dark Theme**: Potpuna dark theme podrška
- [ ] **High Contrast**: prefers-contrast support  
- [ ] **Reduced Motion**: prefers-reduced-motion respect
- [ ] **Semantic Colors**: success/warning/danger/info sa proper contrast
- [ ] **TypeScript**: BaseComponentProps extending, accessibility props
- [ ] **Count Logic**: Proper maxCount, showZero, numeric formatting
- [ ] **Interactive States**: Click handling, keyboard navigation
- [ ] **Accessibility**: ARIA live regions, count announcements, roles
- [ ] **Animation**: Appear/pulse animations sa motion preferences
- [ ] **Testing**: Accessibility tests, interactive tests, 85%+ coverage
- [ ] **Storybook**: Dark theme, accessibility, all variants
- [ ] **Icons**: Start/end icon support sa spacing
- [ ] **Positioning**: Absolute positioning za overlay badges

**SUCCESS CRITERIA**: Production-ready badge sa comprehensive semantics, accessibility, i design token compliance!