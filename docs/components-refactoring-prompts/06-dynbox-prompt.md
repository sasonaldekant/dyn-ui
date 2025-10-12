# 🎯 DYN-UI CODEX PROMPT 04 - DynBox

## 🚀 AI ZADATAK: Refaktoriši DynBox komponent za layout primitive sa design tokens

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim layout komponentima (DynContainer, DynGrid, DynFieldContainer)

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynBox/
├── DynBox.tsx
├── DynBox.types.ts  
├── DynBox.module.css
├── DynBox.stories.tsx
├── DynBox.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynBox.module.css):

**TRENUTNO STANJE**: Minimalna implementacija bez design tokens
**POTREBNO**: Layout primitive sa design tokens i responsive utilities

```css
.box {
  /* Base box primitive using design tokens */
  display: var(--dyn-box-display, block);
  position: var(--dyn-box-position, relative);
  box-sizing: border-box;
  font-family: var(--dyn-font-family-primary);
  
  /* Spacing system via CSS variables */
  padding: var(--dyn-box-padding, 0);
  margin: var(--dyn-box-margin, 0);
  
  /* Layout properties */
  width: var(--dyn-box-width, auto);
  height: var(--dyn-box-height, auto);
  min-width: var(--dyn-box-min-width, 0);
  min-height: var(--dyn-box-min-height, 0);
  max-width: var(--dyn-box-max-width, none);
  max-height: var(--dyn-box-max-height, none);
  
  /* Background and borders */
  background-color: var(--dyn-box-bg, transparent);
  border: var(--dyn-box-border, none);
  border-radius: var(--dyn-box-radius, 0);
  box-shadow: var(--dyn-box-shadow, none);
  
  /* Text properties */
  color: var(--dyn-box-color, inherit);
  text-align: var(--dyn-box-text-align, inherit);
  
  /* Overflow */
  overflow: var(--dyn-box-overflow, visible);
  overflow-x: var(--dyn-box-overflow-x, visible);
  overflow-y: var(--dyn-box-overflow-y, visible);
}

/* Flexbox utilities */
.box--flex {
  display: flex;
  flex-direction: var(--dyn-box-flex-direction, row);
  flex-wrap: var(--dyn-box-flex-wrap, nowrap);
  justify-content: var(--dyn-box-justify-content, flex-start);
  align-items: var(--dyn-box-align-items, stretch);
  align-content: var(--dyn-box-align-content, stretch);
  gap: var(--dyn-box-gap, 0);
  row-gap: var(--dyn-box-row-gap, var(--dyn-box-gap, 0));
  column-gap: var(--dyn-box-column-gap, var(--dyn-box-gap, 0));
}

.box--inline-flex {
  display: inline-flex;
  flex-direction: var(--dyn-box-flex-direction, row);
  flex-wrap: var(--dyn-box-flex-wrap, nowrap);
  justify-content: var(--dyn-box-justify-content, flex-start);
  align-items: var(--dyn-box-align-items, stretch);
  gap: var(--dyn-box-gap, 0);
}

/* Grid utilities */
.box--grid {
  display: grid;
  grid-template-columns: var(--dyn-box-grid-columns, 1fr);
  grid-template-rows: var(--dyn-box-grid-rows, auto);
  grid-template-areas: var(--dyn-box-grid-areas, none);
  gap: var(--dyn-box-gap, 0);
  row-gap: var(--dyn-box-row-gap, var(--dyn-box-gap, 0));
  column-gap: var(--dyn-box-column-gap, var(--dyn-box-gap, 0));
  justify-content: var(--dyn-box-justify-content, stretch);
  align-content: var(--dyn-box-align-content, stretch);
  justify-items: var(--dyn-box-justify-items, stretch);
  align-items: var(--dyn-box-align-items, stretch);
}

.box--inline-grid {
  display: inline-grid;
  grid-template-columns: var(--dyn-box-grid-columns, 1fr);
  gap: var(--dyn-box-gap, 0);
}

/* Display utilities */
.box--inline {
  display: inline;
}

.box--inline-block {
  display: inline-block;
}

.box--none {
  display: none;
}

/* Position utilities */
.box--absolute {
  position: absolute;
  top: var(--dyn-box-top, auto);
  right: var(--dyn-box-right, auto);
  bottom: var(--dyn-box-bottom, auto);
  left: var(--dyn-box-left, auto);
  z-index: var(--dyn-box-z-index, auto);
}

.box--relative {
  position: relative;
  top: var(--dyn-box-top, auto);
  right: var(--dyn-box-right, auto);
  bottom: var(--dyn-box-bottom, auto);
  left: var(--dyn-box-left, auto);
  z-index: var(--dyn-box-z-index, auto);
}

.box--fixed {
  position: fixed;
  top: var(--dyn-box-top, auto);
  right: var(--dyn-box-right, auto);
  bottom: var(--dyn-box-bottom, auto);
  left: var(--dyn-box-left, auto);
  z-index: var(--dyn-box-z-index, auto);
}

.box--sticky {
  position: sticky;
  top: var(--dyn-box-top, auto);
  z-index: var(--dyn-box-z-index, auto);
}

/* Spacing utilities using design tokens */
.box--p-0 { --dyn-box-padding: 0; }
.box--p-xs { --dyn-box-padding: var(--dyn-spacing-xs); }
.box--p-sm { --dyn-box-padding: var(--dyn-spacing-sm); }
.box--p-md { --dyn-box-padding: var(--dyn-spacing-md); }
.box--p-lg { --dyn-box-padding: var(--dyn-spacing-lg); }
.box--p-xl { --dyn-box-padding: var(--dyn-spacing-xl); }
.box--p-2xl { --dyn-box-padding: var(--dyn-spacing-2xl); }

.box--m-0 { --dyn-box-margin: 0; }
.box--m-xs { --dyn-box-margin: var(--dyn-spacing-xs); }
.box--m-sm { --dyn-box-margin: var(--dyn-spacing-sm); }
.box--m-md { --dyn-box-margin: var(--dyn-spacing-md); }
.box--m-lg { --dyn-box-margin: var(--dyn-spacing-lg); }
.box--m-xl { --dyn-box-margin: var(--dyn-spacing-xl); }
.box--m-auto { --dyn-box-margin: auto; }

/* Background utilities */
.box--bg-primary { --dyn-box-bg: var(--dyn-color-bg-primary); }
.box--bg-secondary { --dyn-box-bg: var(--dyn-color-bg-secondary); }
.box--bg-tertiary { --dyn-box-bg: var(--dyn-color-bg-tertiary); }
.box--bg-success { --dyn-box-bg: var(--dyn-color-success); --dyn-box-color: var(--dyn-color-text-on-primary); }
.box--bg-warning { --dyn-box-bg: var(--dyn-color-warning); --dyn-box-color: var(--dyn-color-text-on-primary); }
.box--bg-danger { --dyn-box-bg: var(--dyn-color-danger); --dyn-box-color: var(--dyn-color-text-on-primary); }

/* Border utilities */
.box--border { --dyn-box-border: var(--dyn-border-width) solid var(--dyn-color-border); }
.box--border-top { border-top: var(--dyn-border-width) solid var(--dyn-color-border); }
.box--border-right { border-right: var(--dyn-border-width) solid var(--dyn-color-border); }
.box--border-bottom { border-bottom: var(--dyn-border-width) solid var(--dyn-color-border); }
.box--border-left { border-left: var(--dyn-border-width) solid var(--dyn-color-border); }

/* Border radius utilities */
.box--rounded-none { --dyn-box-radius: 0; }
.box--rounded-sm { --dyn-box-radius: var(--dyn-border-radius-sm); }
.box--rounded-md { --dyn-box-radius: var(--dyn-border-radius-md); }
.box--rounded-lg { --dyn-box-radius: var(--dyn-border-radius-lg); }
.box--rounded-xl { --dyn-box-radius: var(--dyn-border-radius-xl); }
.box--rounded-full { --dyn-box-radius: var(--dyn-border-radius-full); }

/* Shadow utilities */
.box--shadow-sm { --dyn-box-shadow: var(--dyn-shadow-sm); }
.box--shadow-md { --dyn-box-shadow: var(--dyn-shadow-md); }
.box--shadow-lg { --dyn-box-shadow: var(--dyn-shadow-lg); }

/* Text alignment utilities */
.box--text-left { --dyn-box-text-align: left; }
.box--text-center { --dyn-box-text-align: center; }
.box--text-right { --dyn-box-text-align: right; }

/* Overflow utilities */
.box--overflow-hidden { --dyn-box-overflow: hidden; }
.box--overflow-auto { --dyn-box-overflow: auto; }
.box--overflow-scroll { --dyn-box-overflow: scroll; }

/* Responsive utilities */
@media (max-width: 767px) {
  .box--mobile-block { display: block !important; }
  .box--mobile-flex { display: flex !important; }
  .box--mobile-hidden { display: none !important; }
  .box--mobile-p-sm { --dyn-box-padding: var(--dyn-spacing-sm) !important; }
  .box--mobile-p-md { --dyn-box-padding: var(--dyn-spacing-md) !important; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .box--tablet-block { display: block !important; }
  .box--tablet-flex { display: flex !important; }
  .box--tablet-hidden { display: none !important; }
}

@media (min-width: 1024px) {
  .box--desktop-block { display: block !important; }
  .box--desktop-flex { display: flex !important; }
  .box--desktop-hidden { display: none !important; }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .box--bg-primary { --dyn-box-bg: var(--dyn-color-neutral-800); }
  .box--bg-secondary { --dyn-box-bg: var(--dyn-color-neutral-700); }
  .box--bg-tertiary { --dyn-box-bg: var(--dyn-color-neutral-600); }
}

/* Focus management for interactive boxes */
.box--interactive {
  cursor: pointer;
  transition: var(--dyn-transition-fast);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--dyn-shadow-md);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynBox.types.ts):

```typescript
import { HTMLAttributes, ReactNode, CSSProperties } from 'react';
import { BaseComponentProps, AccessibilityProps, ResponsiveProps } from '../../types/base';

export type BoxDisplay = 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
export type BoxPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
export type SpacingSize = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';
export type BackgroundVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type Shadow = 'sm' | 'md' | 'lg';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type Overflow = 'visible' | 'hidden' | 'auto' | 'scroll';

// Flexbox properties
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
export type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
export type AlignContent = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

export interface DynBoxProps extends 
  Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
  BaseComponentProps,
  AccessibilityProps,
  ResponsiveProps {
  
  /** Element to render as */
  as?: keyof JSX.IntrinsicElements;
  
  /** Display property */
  display?: BoxDisplay;
  
  /** Position property */
  position?: BoxPosition;
  
  /** Padding (all sides) */
  p?: SpacingSize;
  /** Padding horizontal */
  px?: SpacingSize;
  /** Padding vertical */
  py?: SpacingSize;
  /** Padding top */
  pt?: SpacingSize;
  /** Padding right */
  pr?: SpacingSize;
  /** Padding bottom */
  pb?: SpacingSize;
  /** Padding left */
  pl?: SpacingSize;
  
  /** Margin (all sides) */
  m?: SpacingSize;
  /** Margin horizontal */
  mx?: SpacingSize;
  /** Margin vertical */
  my?: SpacingSize;
  /** Margin top */
  mt?: SpacingSize;
  /** Margin right */
  mr?: SpacingSize;
  /** Margin bottom */
  mb?: SpacingSize;
  /** Margin left */
  ml?: SpacingSize;
  
  /** Width */
  width?: string | number;
  /** Height */
  height?: string | number;
  /** Min width */
  minWidth?: string | number;
  /** Min height */
  minHeight?: string | number;
  /** Max width */
  maxWidth?: string | number;
  /** Max height */
  maxHeight?: string | number;
  
  /** Background color variant */
  bg?: BackgroundVariant;
  /** Custom background color */
  backgroundColor?: string;
  
  /** Text color */
  color?: string;
  
  /** Border */
  border?: boolean;
  /** Border top */
  borderTop?: boolean;
  /** Border right */
  borderRight?: boolean;
  /** Border bottom */
  borderBottom?: boolean;
  /** Border left */
  borderLeft?: boolean;
  /** Border radius */
  borderRadius?: BorderRadius;
  /** Custom border radius */
  customBorderRadius?: string;
  
  /** Box shadow */
  shadow?: Shadow;
  
  /** Text alignment */
  textAlign?: TextAlign;
  
  /** Overflow */
  overflow?: Overflow;
  /** Overflow X */
  overflowX?: Overflow;
  /** Overflow Y */
  overflowY?: Overflow;
  
  /** Flexbox properties */
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  gap?: SpacingSize;
  rowGap?: SpacingSize;
  columnGap?: SpacingSize;
  
  /** Grid properties */
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  
  /** Position properties */
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
  
  /** Interactive behavior */
  interactive?: boolean;
  
  /** Click handler for interactive boxes */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Keyboard handler for interactive boxes */
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  
  /** Custom CSS properties */
  cssVars?: Record<string, string | number>;
  
  /** Children */
  children?: ReactNode;
}

export interface DynBoxRef extends HTMLDivElement {}
```

---

## ⚛️ REACT COMPONENT (DynBox.tsx):

```typescript
import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/className';
import { DynBoxProps, DynBoxRef } from './DynBox.types';
import styles from './DynBox.module.css';

export const DynBox = forwardRef<DynBoxRef, DynBoxProps>(
  (
    {
      as: Component = 'div',
      className,
      children,
      
      // Display and positioning
      display,
      position,
      
      // Spacing
      p, px, py, pt, pr, pb, pl,
      m, mx, my, mt, mr, mb, ml,
      
      // Dimensions
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      
      // Background and colors
      bg,
      backgroundColor,
      color,
      
      // Borders
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      borderRadius,
      customBorderRadius,
      
      // Effects
      shadow,
      
      // Text
      textAlign,
      
      // Overflow
      overflow,
      overflowX,
      overflowY,
      
      // Flexbox
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      alignContent,
      gap,
      rowGap,
      columnGap,
      
      // Grid
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
      
      // Position
      top,
      right,
      bottom,
      left,
      zIndex,
      
      // Interactive
      interactive = false,
      onClick,
      onKeyDown,
      
      // Responsive
      hideOnMobile,
      hideOnTablet,
      hideOnDesktop,
      mobileOnly,
      tabletOnly,
      desktopOnly,
      
      // Accessibility
      role,
      tabIndex,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      
      // Custom
      cssVars = {},
      style,
      
      ...rest
    },
    ref
  ) => {
    
    // Build CSS custom properties
    const cssVariables = useMemo(() => {
      const vars: Record<string, string | number> = { ...cssVars };
      
      // Spacing
      if (p) vars['--dyn-box-padding'] = `var(--dyn-spacing-${p})`;
      if (px) {
        vars['--dyn-box-padding-left'] = `var(--dyn-spacing-${px})`;
        vars['--dyn-box-padding-right'] = `var(--dyn-spacing-${px})`;
      }
      if (py) {
        vars['--dyn-box-padding-top'] = `var(--dyn-spacing-${py})`;
        vars['--dyn-box-padding-bottom'] = `var(--dyn-spacing-${py})`;
      }
      if (pt) vars['--dyn-box-padding-top'] = `var(--dyn-spacing-${pt})`;
      if (pr) vars['--dyn-box-padding-right'] = `var(--dyn-spacing-${pr})`;
      if (pb) vars['--dyn-box-padding-bottom'] = `var(--dyn-spacing-${pb})`;
      if (pl) vars['--dyn-box-padding-left'] = `var(--dyn-spacing-${pl})`;
      
      if (m) vars['--dyn-box-margin'] = m === 'auto' ? 'auto' : `var(--dyn-spacing-${m})`;
      if (mx) {
        const value = mx === 'auto' ? 'auto' : `var(--dyn-spacing-${mx})`;
        vars['--dyn-box-margin-left'] = value;
        vars['--dyn-box-margin-right'] = value;
      }
      if (my) {
        vars['--dyn-box-margin-top'] = `var(--dyn-spacing-${my})`;
        vars['--dyn-box-margin-bottom'] = `var(--dyn-spacing-${my})`;
      }
      if (mt) vars['--dyn-box-margin-top'] = `var(--dyn-spacing-${mt})`;
      if (mr) vars['--dyn-box-margin-right'] = mr === 'auto' ? 'auto' : `var(--dyn-spacing-${mr})`;
      if (mb) vars['--dyn-box-margin-bottom'] = `var(--dyn-spacing-${mb})`;
      if (ml) vars['--dyn-box-margin-left'] = ml === 'auto' ? 'auto' : `var(--dyn-spacing-${ml})`;
      
      // Dimensions
      if (width) vars['--dyn-box-width'] = typeof width === 'number' ? `${width}px` : width;
      if (height) vars['--dyn-box-height'] = typeof height === 'number' ? `${height}px` : height;
      if (minWidth) vars['--dyn-box-min-width'] = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
      if (minHeight) vars['--dyn-box-min-height'] = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
      if (maxWidth) vars['--dyn-box-max-width'] = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      if (maxHeight) vars['--dyn-box-max-height'] = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
      
      // Colors
      if (backgroundColor) vars['--dyn-box-bg'] = backgroundColor;
      if (color) vars['--dyn-box-color'] = color;
      
      // Border radius
      if (customBorderRadius) vars['--dyn-box-radius'] = customBorderRadius;
      
      // Flexbox
      if (flexDirection) vars['--dyn-box-flex-direction'] = flexDirection;
      if (flexWrap) vars['--dyn-box-flex-wrap'] = flexWrap;
      if (justifyContent) vars['--dyn-box-justify-content'] = justifyContent;
      if (alignItems) vars['--dyn-box-align-items'] = alignItems;
      if (alignContent) vars['--dyn-box-align-content'] = alignContent;
      if (gap) vars['--dyn-box-gap'] = `var(--dyn-spacing-${gap})`;
      if (rowGap) vars['--dyn-box-row-gap'] = `var(--dyn-spacing-${rowGap})`;
      if (columnGap) vars['--dyn-box-column-gap'] = `var(--dyn-spacing-${columnGap})`;
      
      // Grid
      if (gridTemplateColumns) vars['--dyn-box-grid-columns'] = gridTemplateColumns;
      if (gridTemplateRows) vars['--dyn-box-grid-rows'] = gridTemplateRows;
      if (gridTemplateAreas) vars['--dyn-box-grid-areas'] = gridTemplateAreas;
      
      // Position
      if (top !== undefined) vars['--dyn-box-top'] = typeof top === 'number' ? `${top}px` : top;
      if (right !== undefined) vars['--dyn-box-right'] = typeof right === 'number' ? `${right}px` : right;
      if (bottom !== undefined) vars['--dyn-box-bottom'] = typeof bottom === 'number' ? `${bottom}px` : bottom;
      if (left !== undefined) vars['--dyn-box-left'] = typeof left === 'number' ? `${left}px` : left;
      if (zIndex !== undefined) vars['--dyn-box-z-index'] = zIndex;
      
      // Text alignment
      if (textAlign) vars['--dyn-box-text-align'] = textAlign;
      
      // Overflow
      if (overflow) vars['--dyn-box-overflow'] = overflow;
      if (overflowX) vars['--dyn-box-overflow-x'] = overflowX;
      if (overflowY) vars['--dyn-box-overflow-y'] = overflowY;
      
      return vars;
    }, [
      cssVars, p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml,
      width, height, minWidth, minHeight, maxWidth, maxHeight,
      backgroundColor, color, customBorderRadius,
      flexDirection, flexWrap, justifyContent, alignItems, alignContent, gap, rowGap, columnGap,
      gridTemplateColumns, gridTemplateRows, gridTemplateAreas,
      top, right, bottom, left, zIndex, textAlign, overflow, overflowX, overflowY
    ]);

    // Build class names
    const boxClasses = cn(
      styles.box,
      
      // Display
      display && styles[`box--${display}`],
      
      // Position
      position && position !== 'static' && styles[`box--${position}`],
      
      // Background
      bg && styles[`box--bg-${bg}`],
      
      // Borders
      border && styles['box--border'],
      borderTop && styles['box--border-top'],
      borderRight && styles['box--border-right'],
      borderBottom && styles['box--border-bottom'],
      borderLeft && styles['box--border-left'],
      borderRadius && styles[`box--rounded-${borderRadius}`],
      
      // Shadow
      shadow && styles[`box--shadow-${shadow}`],
      
      // Overflow
      overflow && styles[`box--overflow-${overflow}`],
      
      // Interactive
      interactive && styles['box--interactive'],
      
      // Responsive
      hideOnMobile && styles['box--mobile-hidden'],
      hideOnTablet && styles['box--tablet-hidden'],
      hideOnDesktop && styles['box--desktop-hidden'],
      mobileOnly && [styles['box--tablet-hidden'], styles['box--desktop-hidden']],
      tabletOnly && [styles['box--mobile-hidden'], styles['box--desktop-hidden']],
      desktopOnly && [styles['box--mobile-hidden'], styles['box--tablet-hidden']],
      
      className
    );

    // Handle keyboard navigation for interactive boxes
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (interactive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick?.(event as any);
      }
      onKeyDown?.(event);
    };

    // Combined inline styles
    const combinedStyle = useMemo(() => ({
      ...cssVariables,
      ...style,
    }), [cssVariables, style]);

    return (
      <Component
        ref={ref}
        className={boxClasses}
        style={combinedStyle}
        role={interactive ? role || 'button' : role}
        tabIndex={interactive && tabIndex === undefined ? 0 : tabIndex}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

DynBox.displayName = 'DynBox';
```

---

## 🧪 TESTING ENHANCEMENTS (DynBox.test.tsx):

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testAccessibility } from '../../test-utils';
import { DynBox } from './DynBox';

describe('DynBox', () => {
  describe('Basic Functionality', () => {
    it('renders as div by default', () => {
      render(<DynBox data-testid="test-box">Content</DynBox>);
      expect(screen.getByTestId('test-box')).toBeInTheDocument();
      expect(screen.getByTestId('test-box').tagName).toBe('DIV');
    });

    it('renders as different element when as prop is provided', () => {
      render(<DynBox as="section" data-testid="test-section">Content</DynBox>);
      expect(screen.getByTestId('test-section').tagName).toBe('SECTION');
    });

    it('renders children correctly', () => {
      render(<DynBox>Test content</DynBox>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DynBox>Accessible box</DynBox>);
      await testAccessibility(container);
    });

    it('supports interactive behavior with proper accessibility', async () => {
      const handleClick = vi.fn();
      render(
        <DynBox 
          interactive 
          onClick={handleClick}
          aria-label="Interactive box"
        >
          Click me
        </DynBox>
      );
      
      const box = screen.getByRole('button');
      expect(box).toHaveAttribute('aria-label', 'Interactive box');
      expect(box).toHaveAttribute('tabIndex', '0');
      
      await userEvent.click(box);
      expect(handleClick).toHaveBeenCalled();
    });

    it('supports keyboard navigation for interactive boxes', async () => {
      const handleClick = vi.fn();
      render(
        <DynBox interactive onClick={handleClick}>
          Interactive content
        </DynBox>
      );
      
      const box = screen.getByRole('button');
      box.focus();
      
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('supports custom role and ARIA attributes', () => {
      render(
        <DynBox 
          role="region"
          aria-label="Custom region"
          aria-describedby="description"
        >
          Content
        </DynBox>
      );
      
      const box = screen.getByRole('region');
      expect(box).toHaveAttribute('aria-label', 'Custom region');
      expect(box).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Layout Properties', () => {
    it('applies display classes correctly', () => {
      const { rerender } = render(<DynBox display="flex" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--flex');
      
      rerender(<DynBox display="grid" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--grid');
      
      rerender(<DynBox display="none" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--none');
    });

    it('applies position classes correctly', () => {
      const { rerender } = render(<DynBox position="absolute" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--absolute');
      
      rerender(<DynBox position="relative" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--relative');
    });

    it('applies spacing through CSS variables', () => {
      render(<DynBox p="md" m="lg" data-testid="box">Content</DynBox>);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveStyle({
        '--dyn-box-padding': 'var(--dyn-spacing-md)',
        '--dyn-box-margin': 'var(--dyn-spacing-lg)'
      });
    });

    it('applies directional spacing correctly', () => {
      render(<DynBox px="sm" py="md" mt="lg" data-testid="box">Content</DynBox>);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveStyle({
        '--dyn-box-padding-left': 'var(--dyn-spacing-sm)',
        '--dyn-box-padding-right': 'var(--dyn-spacing-sm)',
        '--dyn-box-padding-top': 'var(--dyn-spacing-md)',
        '--dyn-box-padding-bottom': 'var(--dyn-spacing-md)',
        '--dyn-box-margin-top': 'var(--dyn-spacing-lg)'
      });
    });
  });

  describe('Background and Colors', () => {
    it('applies background variant classes', () => {
      const { rerender } = render(<DynBox bg="primary" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--bg-primary');
      
      rerender(<DynBox bg="danger" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--bg-danger');
    });

    it('applies custom background color', () => {
      render(<DynBox backgroundColor="#ff0000" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveStyle({
        '--dyn-box-bg': '#ff0000'
      });
    });

    it('applies custom text color', () => {
      render(<DynBox color="#0000ff" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveStyle({
        '--dyn-box-color': '#0000ff'
      });
    });
  });

  describe('Borders and Shadows', () => {
    it('applies border classes', () => {
      render(<DynBox border borderRadius="md" data-testid="box">Content</DynBox>);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveClass('box--border');
      expect(box).toHaveClass('box--rounded-md');
    });

    it('applies directional border classes', () => {
      render(<DynBox borderTop borderLeft data-testid="box">Content</DynBox>);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveClass('box--border-top');
      expect(box).toHaveClass('box--border-left');
    });

    it('applies shadow classes', () => {
      render(<DynBox shadow="lg" data-testid="box">Content</DynBox>);
      expect(screen.getByTestId('box')).toHaveClass('box--shadow-lg');
    });
  });

  describe('Flexbox Properties', () => {
    it('applies flexbox CSS variables', () => {
      render(
        <DynBox 
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="md"
          data-testid="box"
        >
          Content
        </DynBox>
      );
      
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle({
        '--dyn-box-flex-direction': 'column',
        '--dyn-box-justify-content': 'center',
        '--dyn-box-align-items': 'flex-start',
        '--dyn-box-gap': 'var(--dyn-spacing-md)'
      });
    });
  });

  describe('Grid Properties', () => {
    it('applies grid CSS variables', () => {
      render(
        <DynBox 
          display="grid"
          gridTemplateColumns="1fr 2fr"
          gridTemplateRows="auto 1fr"
          gap="lg"
          data-testid="box"
        >
          Content
        </DynBox>
      );
      
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle({
        '--dyn-box-grid-columns': '1fr 2fr',
        '--dyn-box-grid-rows': 'auto 1fr',
        '--dyn-box-gap': 'var(--dyn-spacing-lg)'
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('applies responsive visibility classes', () => {
      render(<DynBox hideOnMobile hideOnTablet data-testid="box">Content</DynBox>);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveClass('box--mobile-hidden');
      expect(box).toHaveClass('box--tablet-hidden');
    });

    it('applies single-device visibility', () => {
      render(<DynBox desktopOnly data-testid="box">Content</DynBox>);
      const box = screen.getByTestId('box');
      
      expect(box).toHaveClass('box--mobile-hidden');
      expect(box).toHaveClass('box--tablet-hidden');
    });
  });

  describe('Dimensions', () => {
    it('applies dimension CSS variables', () => {
      render(
        <DynBox 
          width="100px"
          height={200}
          minWidth="50px"
          maxHeight="500px"
          data-testid="box"
        >
          Content
        </DynBox>
      );
      
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle({
        '--dyn-box-width': '100px',
        '--dyn-box-height': '200px',
        '--dyn-box-min-width': '50px',
        '--dyn-box-max-height': '500px'
      });
    });
  });

  describe('Custom CSS Variables', () => {
    it('applies custom CSS variables', () => {
      render(
        <DynBox 
          cssVars={{
            '--custom-var': 'value',
            '--another-var': 42
          }}
          data-testid="box"
        >
          Content
        </DynBox>
      );
      
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle({
        '--custom-var': 'value',
        '--another-var': 42
      });
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynBox.stories.tsx):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynBox } from './DynBox';

const meta = {
  title: 'Components/DynBox',
  component: DynBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible layout primitive component built with design tokens and CSS custom properties.'
      }
    }
  },
  argTypes: {
    display: {
      control: 'select',
      options: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
    },
    position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    },
    p: {
      control: 'select',
      options: ['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    m: {
      control: 'select',
      options: ['0', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'auto'],
    },
    bg: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    shadow: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Box',
    p: 'md',
    border: true,
  },
};

export const AsElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox as="div" p="md" bg="primary" color="white">Div Element</DynBox>
      <DynBox as="section" p="md" bg="secondary" color="white">Section Element</DynBox>
      <DynBox as="article" p="md" bg="tertiary" color="white">Article Element</DynBox>
      <DynBox as="span" p="sm" bg="success" color="white">Span Element</DynBox>
    </div>
  ),
};

export const BackgroundVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <DynBox p="lg" bg="primary" color="white" textAlign="center">Primary</DynBox>
      <DynBox p="lg" bg="secondary" color="white" textAlign="center">Secondary</DynBox>
      <DynBox p="lg" bg="tertiary" color="white" textAlign="center">Tertiary</DynBox>
      <DynBox p="lg" bg="success" color="white" textAlign="center">Success</DynBox>
      <DynBox p="lg" bg="warning" color="white" textAlign="center">Warning</DynBox>
      <DynBox p="lg" bg="danger" color="white" textAlign="center">Danger</DynBox>
    </div>
  ),
};

export const SpacingSystem: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox p="xs" bg="primary" color="white">Padding XS</DynBox>
      <DynBox p="sm" bg="primary" color="white">Padding SM</DynBox>
      <DynBox p="md" bg="primary" color="white">Padding MD</DynBox>
      <DynBox p="lg" bg="primary" color="white">Padding LG</DynBox>
      <DynBox p="xl" bg="primary" color="white">Padding XL</DynBox>
      <DynBox p="2xl" bg="primary" color="white">Padding 2XL</DynBox>
    </div>
  ),
};

export const FlexboxLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DynBox 
        display="flex" 
        gap="md" 
        p="md" 
        border 
        borderRadius="md"
      >
        <DynBox bg="primary" color="white" p="sm" flex="1">Item 1</DynBox>
        <DynBox bg="secondary" color="white" p="sm" flex="1">Item 2</DynBox>
        <DynBox bg="tertiary" color="white" p="sm" flex="1">Item 3</DynBox>
      </DynBox>
      
      <DynBox 
        display="flex" 
        flexDirection="column" 
        gap="sm" 
        p="md" 
        border
        borderRadius="md"
      >
        <DynBox bg="success" color="white" p="sm">Header</DynBox>
        <DynBox bg="warning" color="white" p="md" flex="1">Content</DynBox>
        <DynBox bg="danger" color="white" p="sm">Footer</DynBox>
      </DynBox>
      
      <DynBox 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        p="md" 
        border
        borderRadius="md"
      >
        <DynBox bg="primary" color="white" p="sm">Left</DynBox>
        <DynBox bg="secondary" color="white" p="sm">Center</DynBox>
        <DynBox bg="tertiary" color="white" p="sm">Right</DynBox>
      </DynBox>
    </div>
  ),
};

export const GridLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <DynBox 
        display="grid" 
        gridTemplateColumns="repeat(3, 1fr)" 
        gap="md" 
        p="md" 
        border
        borderRadius="md"
      >
        <DynBox bg="primary" color="white" p="md" textAlign="center">1</DynBox>
        <DynBox bg="secondary" color="white" p="md" textAlign="center">2</DynBox>
        <DynBox bg="tertiary" color="white" p="md" textAlign="center">3</DynBox>
        <DynBox bg="success" color="white" p="md" textAlign="center">4</DynBox>
        <DynBox bg="warning" color="white" p="md" textAlign="center">5</DynBox>
        <DynBox bg="danger" color="white" p="md" textAlign="center">6</DynBox>
      </DynBox>
      
      <DynBox 
        display="grid" 
        gridTemplateColumns="1fr 2fr 1fr" 
        gridTemplateRows="auto 1fr auto" 
        gap="md" 
        height="300px"
        border
        borderRadius="md"
        p="md"
      >
        <DynBox bg="primary" color="white" p="sm" textAlign="center">Sidebar</DynBox>
        <DynBox bg="secondary" color="white" p="sm" textAlign="center">Header</DynBox>
        <DynBox bg="tertiary" color="white" p="sm" textAlign="center">Ads</DynBox>
        
        <DynBox bg="success" color="white" p="sm" textAlign="center">Navigation</DynBox>
        <DynBox bg="warning" color="white" p="sm" textAlign="center">Main Content</DynBox>
        <DynBox bg="danger" color="white" p="sm" textAlign="center">Sidebar</DynBox>
        
        <DynBox bg="primary" color="white" p="sm" textAlign="center" style={{ gridColumn: 'span 3' }}>Footer</DynBox>
      </DynBox>
    </div>
  ),
};

export const BordersAndShadows: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DynBox p="md" border borderRadius="none">No Radius</DynBox>
        <DynBox p="md" border borderRadius="sm">Small Radius</DynBox>
        <DynBox p="md" border borderRadius="md">Medium Radius</DynBox>
        <DynBox p="md" border borderRadius="lg">Large Radius</DynBox>
        <DynBox p="md" border borderRadius="full">Full Radius</DynBox>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DynBox p="md" bg="primary" color="white" shadow="sm">Small Shadow</DynBox>
        <DynBox p="md" bg="secondary" color="white" shadow="md">Medium Shadow</DynBox>
        <DynBox p="md" bg="tertiary" color="white" shadow="lg">Large Shadow</DynBox>
      </div>
    </div>
  ),
};

export const InteractiveBoxes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <DynBox 
        interactive
        p="lg"
        bg="primary"
        color="white"
        borderRadius="md"
        onClick={() => alert('Box 1 clicked!')}
        aria-label="Interactive box 1"
      >
        Click me!
      </DynBox>
      
      <DynBox 
        interactive
        p="lg"
        bg="success"
        color="white"
        borderRadius="md"
        onClick={() => alert('Box 2 clicked!')}
        onKeyDown={(e) => console.log('Key pressed:', e.key)}
        aria-label="Interactive box 2"
      >
        Keyboard accessible
      </DynBox>
      
      <DynBox 
        interactive
        p="lg"
        border
        borderRadius="md"
        onClick={() => alert('Box 3 clicked!')}
        aria-label="Interactive box 3"
      >
        Hover effects
      </DynBox>
    </div>
  ),
};

export const ResponsiveDesign: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox p="md" bg="primary" color="white" hideOnMobile>
        Hidden on Mobile
      </DynBox>
      <DynBox p="md" bg="secondary" color="white" hideOnTablet>
        Hidden on Tablet
      </DynBox>
      <DynBox p="md" bg="tertiary" color="white" hideOnDesktop>
        Hidden on Desktop
      </DynBox>
      <DynBox p="md" bg="success" color="white" mobileOnly>
        Mobile Only
      </DynBox>
      <DynBox p="md" bg="warning" color="white" tabletOnly>
        Tablet Only
      </DynBox>
      <DynBox p="md" bg="danger" color="white" desktopOnly>
        Desktop Only
      </DynBox>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};

export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox 
        backgroundColor="linear-gradient(45deg, #ff6b6b, #4ecdc4)"
        color="white"
        p="lg"
        borderRadius="lg"
        textAlign="center"
      >
        Custom Gradient Background
      </DynBox>
      
      <DynBox 
        cssVars={{
          '--custom-border': '3px dashed #ff6b6b',
          '--custom-animation': 'pulse 2s infinite'
        }}
        style={{
          border: 'var(--custom-border)',
          animation: 'var(--custom-animation)',
        }}
        p="md"
        textAlign="center"
      >
        Custom CSS Variables
      </DynBox>
      
      <DynBox 
        width="200px"
        height="100px"
        backgroundColor="#4ecdc4"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
      >
        Fixed Dimensions
      </DynBox>
    </div>
  ),
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <DynBox p="md" bg="primary" color="white">Primary in Dark</DynBox>
        <DynBox p="md" bg="secondary" color="white">Secondary in Dark</DynBox>
        <DynBox p="md" bg="tertiary" color="white">Tertiary in Dark</DynBox>
        <DynBox p="md" border borderRadius="md" color="white">
          Bordered box in dark theme
        </DynBox>
        <DynBox 
          interactive
          p="md"
          bg="success"
          color="white"
          borderRadius="md"
          onClick={() => alert('Dark theme click!')}
        >
          Interactive dark box
        </DynBox>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DynBox 
        role="region"
        aria-label="Content area"
        p="md"
        border
        borderRadius="md"
      >
        Semantic region with proper ARIA labeling
      </DynBox>
      
      <DynBox 
        interactive
        role="button"
        aria-label="Custom interactive element"
        aria-describedby="box-description"
        p="md"
        bg="primary"
        color="white"
        borderRadius="md"
        onClick={() => alert('Accessible click!')}
        tabIndex={0}
      >
        Fully accessible interactive box
      </DynBox>
      <div id="box-description">
        This box demonstrates proper accessibility implementation
      </div>
      
      <DynBox 
        as="button"
        p="md"
        bg="success"
        color="white"
        borderRadius="md"
        onClick={() => alert('Native button!')}
      >
        Native button element
      </DynBox>
    </div>
  ),
};
```

---

## 📤 EXPORT STANDARDIZATION (index.ts):

```typescript
export { DynBox } from './DynBox';
export { default } from './DynBox';
export type { 
  DynBoxProps, 
  DynBoxRef,
  BoxDisplay,
  BoxPosition,
  SpacingSize,
  BackgroundVariant,
  BorderRadius,
  Shadow,
  FlexDirection,
  JustifyContent,
  AlignItems
} from './DynBox.types';
```

---

## ✅ DELIVERABLE CHECKLIST:

- [ ] **CSS custom properties** umesto hard-coded vrednosti
- [ ] **Design tokens** za spacing, colors, borders, shadows
- [ ] **Layout primitive** sa flexbox i grid support
- [ ] **Responsive utilities** sa mobile/tablet/desktop visibility
- [ ] **Dark theme support** kroz CSS custom properties
- [ ] **Interactive behavior** sa proper accessibility
- [ ] **Keyboard navigation** za interactive boxes
- [ ] **Polymorphic component** (as prop support)
- [ ] **Comprehensive spacing system** (p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml)
- [ ] **Accessibility compliance** (WCAG AAA)
- [ ] **Custom CSS variables** support
- [ ] **Comprehensive testing** (85%+ coverage)
- [ ] **Storybook examples** sa layout patterns
- [ ] **forwardRef pattern** implementiran
- [ ] **Performance optimization** sa useMemo

🎯 **SUCCESS**: Production-ready layout primitive sa potpunom design tokens podrškom i flexible API!