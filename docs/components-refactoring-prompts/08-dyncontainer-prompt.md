# 🎯 DYN-UI CODEX PROMPT 04 - DynContainer

## 🚀 AI ZADATAK: Refaktoriši DynContainer komponent za responsive page layout

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim layout komponentima

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynContainer/
├── DynContainer.tsx
├── DynContainer.types.ts  
├── DynContainer.module.css
├── DynContainer.stories.tsx
├── DynContainer.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynContainer.module.css):

**ZADATAK**: Zameni SVE hard-coded vrednosti sa design tokens i dodaj responsive design

```css
.container {
  /* Base container styles using design tokens */
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  padding-left: var(--dyn-spacing-lg);
  padding-right: var(--dyn-spacing-lg);
  transition: var(--dyn-transition-fast);
}

/* Max width variants */
.container--sm {
  max-width: var(--dyn-container-sm);
}

.container--md {
  max-width: var(--dyn-container-md);
}

.container--lg {
  max-width: var(--dyn-container-lg);
}

.container--xl {
  max-width: var(--dyn-container-xl);
}

.container--2xl {
  max-width: var(--dyn-container-2xl);
}

.container--full {
  max-width: 100%;
}

.container--fluid {
  max-width: none;
  padding-left: var(--dyn-spacing-md);
  padding-right: var(--dyn-spacing-md);
}

/* Padding variants */
.container--noPadding {
  padding-left: 0;
  padding-right: 0;
}

.container--paddingSmall {
  padding-left: var(--dyn-spacing-sm);
  padding-right: var(--dyn-spacing-sm);
}

.container--paddingLarge {
  padding-left: var(--dyn-spacing-2xl);
  padding-right: var(--dyn-spacing-2xl);
}

/* Center content */
.container--center {
  text-align: center;
}

/* Responsive breakpoints using design tokens */
@media (max-width: 640px) {
  .container {
    padding-left: var(--dyn-spacing-md);
    padding-right: var(--dyn-spacing-md);
  }
  
  .container--paddingSmall {
    padding-left: var(--dyn-spacing-xs);
    padding-right: var(--dyn-spacing-xs);
  }
  
  .container--paddingLarge {
    padding-left: var(--dyn-spacing-lg);
    padding-right: var(--dyn-spacing-lg);
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .container--paddingLarge {
    padding-left: var(--dyn-spacing-xl);
    padding-right: var(--dyn-spacing-xl);
  }
}

/* Section styling for semantic containers */
.containerSection {
  composes: container;
  padding-top: var(--dyn-spacing-section);
  padding-bottom: var(--dyn-spacing-section);
}

.containerArticle {
  composes: container;
  background-color: var(--dyn-color-bg-primary);
  border-radius: var(--dyn-border-radius-lg);
  padding: var(--dyn-spacing-2xl);
  box-shadow: var(--dyn-shadow-sm);
  border: var(--dyn-border-width) solid var(--dyn-color-border);
}

/* Header styling for containers with titles */
.containerHeader {
  margin-bottom: var(--dyn-spacing-lg);
  padding-bottom: var(--dyn-spacing-md);
  border-bottom: var(--dyn-border-width) solid var(--dyn-color-border);
}

.containerTitle {
  margin: 0 0 var(--dyn-spacing-xs) 0;
  font-family: var(--dyn-font-family-primary);
  font-size: var(--dyn-font-size-2xl);
  font-weight: var(--dyn-font-weight-bold);
  line-height: var(--dyn-line-height-tight);
  color: var(--dyn-color-text-primary);
}

.containerSubtitle {
  margin: 0;
  font-family: var(--dyn-font-family-primary);
  font-size: var(--dyn-font-size-lg);
  font-weight: var(--dyn-font-weight-normal);
  line-height: var(--dyn-line-height-normal);
  color: var(--dyn-color-text-secondary);
}

/* Content wrapper */
.containerContent {
  width: 100%;
}

/* Responsive design for different container types */
@media (max-width: 767px) {
  .containerArticle {
    padding: var(--dyn-spacing-lg);
    border-radius: var(--dyn-border-radius-md);
  }
  
  .containerTitle {
    font-size: var(--dyn-font-size-xl);
  }
  
  .containerSubtitle {
    font-size: var(--dyn-font-size-base);
  }
  
  .containerSection {
    padding-top: var(--dyn-spacing-xl);
    padding-bottom: var(--dyn-spacing-xl);
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .containerArticle {
    background-color: var(--dyn-color-neutral-800);
    border-color: var(--dyn-color-neutral-600);
    box-shadow: var(--dyn-shadow-lg);
  }
  
  .containerTitle {
    color: var(--dyn-color-neutral-0);
  }
  
  .containerSubtitle {
    color: var(--dyn-color-neutral-300);
  }
  
  .containerHeader {
    border-bottom-color: var(--dyn-color-neutral-600);
  }
}

/* Focus indicators for accessibility */
.container:focus-visible {
  outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
  outline-offset: var(--dyn-focus-ring-offset);
}

/* Print styles */
@media print {
  .container {
    max-width: none !important;
    padding: 0 !important;
  }
  
  .containerArticle {
    box-shadow: none !important;
    border: var(--dyn-border-width) solid var(--dyn-color-neutral-400) !important;
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynContainer.types.ts):

```typescript
import { HTMLAttributes, ReactNode } from 'react';
import { BaseComponentProps, AccessibilityProps } from '../../types/base';

export type DynContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'fluid';
export type DynContainerPadding = 'none' | 'small' | 'medium' | 'large';
export type DynContainerVariant = 'default' | 'section' | 'article';

export interface DynContainerProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps,
  AccessibilityProps {
  
  /** Maximum width of the container */
  maxWidth?: DynContainerMaxWidth;
  
  /** Padding variant */
  padding?: DynContainerPadding;
  
  /** Container variant for semantic HTML */
  variant?: DynContainerVariant;
  
  /** Center align the container content */
  center?: boolean;
  
  /** Container title */
  title?: ReactNode;
  
  /** Container subtitle */
  subtitle?: ReactNode;
  
  /** Custom max-width value (overrides maxWidth prop) */
  customMaxWidth?: number | string;
  
  /** Custom padding value (overrides padding prop) */
  customPadding?: number | string;
  
  /** Disable responsive padding adjustments */
  disableResponsivePadding?: boolean;
  
  /** ARIA role override */
  role?: string;
}

export interface DynContainerRef extends HTMLDivElement {}
```

---

## ⚛️ REACT COMPONENT (DynContainer.tsx):

```typescript
import React, { forwardRef } from 'react';
import { cn } from '../../utils/className';
import { DynContainerProps, DynContainerRef } from './DynContainer.types';
import styles from './DynContainer.module.css';

export const DynContainer = forwardRef<DynContainerRef, DynContainerProps>(
  (
    {
      children,
      className,
      maxWidth = 'lg',
      padding = 'medium',
      variant = 'default',
      center = false,
      title,
      subtitle,
      customMaxWidth,
      customPadding,
      disableResponsivePadding = false,
      role,
      style,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    
    // Determine the HTML element to render based on variant
    const Component = variant === 'section' ? 'section' : 
                     variant === 'article' ? 'article' : 'div';

    // Build custom styles
    const customStyles: React.CSSProperties = {
      ...style,
      ...(customMaxWidth && { maxWidth: typeof customMaxWidth === 'number' ? `${customMaxWidth}px` : customMaxWidth }),
      ...(customPadding && { 
        paddingLeft: typeof customPadding === 'number' ? `${customPadding}px` : customPadding,
        paddingRight: typeof customPadding === 'number' ? `${customPadding}px` : customPadding
      }),
    };

    // Build class names
    const containerClasses = cn(
      variant === 'section' ? styles.containerSection :
      variant === 'article' ? styles.containerArticle :
      styles.container,
      {
        [styles[`container--${maxWidth}`]]: maxWidth && !customMaxWidth,
        [styles[`container--padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`]]: padding !== 'medium' && !customPadding,
        [styles['container--center']]: center,
        [styles['container--noPadding']]: padding === 'none',
      },
      className
    );

    return (
      <Component
        ref={ref}
        className={containerClasses}
        style={Object.keys(customStyles).length ? customStyles : style}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        {...rest}
      >
        {/* Header section */}
        {(title || subtitle) && (
          <header className={styles.containerHeader}>
            {title && (
              <h1 className={styles.containerTitle}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p className={styles.containerSubtitle}>
                {subtitle}
              </p>
            )}
          </header>
        )}

        {/* Main content */}
        <div className={styles.containerContent}>
          {children}
        </div>
      </Component>
    );
  }
);

DynContainer.displayName = 'DynContainer';
```

---

## 🧪 TESTING ENHANCEMENTS (DynContainer.test.tsx):

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testAccessibility } from '../../test-utils';
import { DynContainer } from './DynContainer';

describe('DynContainer', () => {
  describe('Basic Functionality', () => {
    it('renders container with content', () => {
      render(
        <DynContainer data-testid="container">
          <p>Test content</p>
        </DynContainer>
      );
      
      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders as div by default', () => {
      render(<DynContainer data-testid="container">Content</DynContainer>);
      expect(screen.getByTestId('container')).toHaveProperty('tagName', 'DIV');
    });

    it('renders as section when variant is section', () => {
      render(
        <DynContainer variant="section" data-testid="container">
          Content
        </DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveProperty('tagName', 'SECTION');
    });

    it('renders as article when variant is article', () => {
      render(
        <DynContainer variant="article" data-testid="container">
          Content
        </DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveProperty('tagName', 'ARTICLE');
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <DynContainer>
          <h1>Accessible container</h1>
          <p>Container content</p>
        </DynContainer>
      );
      await testAccessibility(container);
    });

    it('supports aria-label', () => {
      render(
        <DynContainer aria-label="Main content container" data-testid="container">
          Content
        </DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveAttribute('aria-label', 'Main content container');
    });

    it('supports aria-labelledby', () => {
      render(
        <>
          <h1 id="section-title">Section Title</h1>
          <DynContainer aria-labelledby="section-title" data-testid="container">
            Content
          </DynContainer>
        </>
      );
      expect(screen.getByTestId('container')).toHaveAttribute('aria-labelledby', 'section-title');
    });

    it('supports custom role', () => {
      render(
        <DynContainer role="banner" data-testid="container">
          Content
        </DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveAttribute('role', 'banner');
    });
  });

  describe('Max Width Variants', () => {
    it('applies max width classes correctly', () => {
      const { rerender } = render(
        <DynContainer maxWidth="sm" data-testid="container">Content</DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveClass('container--sm');
      
      rerender(<DynContainer maxWidth="lg" data-testid="container">Content</DynContainer>);
      expect(screen.getByTestId('container')).toHaveClass('container--lg');
      
      rerender(<DynContainer maxWidth="full" data-testid="container">Content</DynContainer>);
      expect(screen.getByTestId('container')).toHaveClass('container--full');
    });

    it('applies fluid class for fluid maxWidth', () => {
      render(
        <DynContainer maxWidth="fluid" data-testid="container">Content</DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveClass('container--fluid');
    });
  });

  describe('Padding Variants', () => {
    it('applies padding classes correctly', () => {
      const { rerender } = render(
        <DynContainer padding="none" data-testid="container">Content</DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveClass('container--noPadding');
      
      rerender(<DynContainer padding="small" data-testid="container">Content</DynContainer>);
      expect(screen.getByTestId('container')).toHaveClass('container--paddingSmall');
      
      rerender(<DynContainer padding="large" data-testid="container">Content</DynContainer>);
      expect(screen.getByTestId('container')).toHaveClass('container--paddingLarge');
    });
  });

  describe('Custom Styles', () => {
    it('applies custom max width', () => {
      render(
        <DynContainer customMaxWidth="500px" data-testid="container">
          Content
        </DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveStyle('max-width: 500px');
    });

    it('applies custom padding', () => {
      render(
        <DynContainer customPadding="30px" data-testid="container">
          Content
        </DynContainer>
      );
      const container = screen.getByTestId('container');
      expect(container).toHaveStyle('padding-left: 30px');
      expect(container).toHaveStyle('padding-right: 30px');
    });

    it('applies center alignment', () => {
      render(
        <DynContainer center data-testid="container">Content</DynContainer>
      );
      expect(screen.getByTestId('container')).toHaveClass('container--center');
    });
  });

  describe('Title and Subtitle', () => {
    it('renders title when provided', () => {
      render(
        <DynContainer title="Container Title">
          Content
        </DynContainer>
      );
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Container Title');
    });

    it('renders subtitle when provided', () => {
      render(
        <DynContainer subtitle="Container subtitle">
          Content
        </DynContainer>
      );
      expect(screen.getByText('Container subtitle')).toBeInTheDocument();
    });

    it('renders both title and subtitle', () => {
      render(
        <DynContainer title="Title" subtitle="Subtitle">
          Content
        </DynContainer>
      );
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
    });

    it('renders header section when title or subtitle is provided', () => {
      render(
        <DynContainer title="Title">
          Content
        </DynContainer>
      );
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('maintains structure across different screen sizes', () => {
      render(
        <DynContainer maxWidth="lg" padding="medium" data-testid="container">
          <p>Responsive content</p>
        </DynContainer>
      );
      
      const container = screen.getByTestId('container');
      expect(container).toHaveClass('container');
      expect(container).toHaveClass('container--lg');
    });
  });
});
```

---

## 📚 STORYBOOK IMPROVEMENTS (DynContainer.stories.tsx):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynContainer } from './DynContainer';

const meta = {
  title: 'Components/Layout/DynContainer',
  component: DynContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive container component for page layouts with design tokens and accessibility features.'
      }
    }
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full', 'fluid'],
      description: 'Maximum width of the container'
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
      description: 'Padding around container content'
    },
    variant: {
      control: 'select',
      options: ['default', 'section', 'article'],
      description: 'Semantic HTML element variant'
    },
    center: {
      control: 'boolean',
      description: 'Center align container content'
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ background: '#f0f0f0', padding: '2rem', textAlign: 'center' }}>
        <h2>Default Container</h2>
        <p>This is the default container with medium padding and lg max-width.</p>
      </div>
    ),
  },
};

export const MaxWidths: Story = {
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer maxWidth="sm">
          <div style={{ background: '#e3f2fd', padding: '1rem', textAlign: 'center' }}>
            Small (sm) - Max width 576px
          </div>
        </DynContainer>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer maxWidth="md">
          <div style={{ background: '#e8f5e8', padding: '1rem', textAlign: 'center' }}>
            Medium (md) - Max width 768px
          </div>
        </DynContainer>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer maxWidth="lg">
          <div style={{ background: '#fff3e0', padding: '1rem', textAlign: 'center' }}>
            Large (lg) - Max width 1024px
          </div>
        </DynContainer>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer maxWidth="xl">
          <div style={{ background: '#fce4ec', padding: '1rem', textAlign: 'center' }}>
            Extra Large (xl) - Max width 1200px
          </div>
        </DynContainer>
      </div>
      
      <div>
        <DynContainer maxWidth="full">
          <div style={{ background: '#f3e5f5', padding: '1rem', textAlign: 'center' }}>
            Full Width - No max width constraint
          </div>
        </DynContainer>
      </div>
    </div>
  ),
};

export const PaddingVariants: Story = {
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer padding="none" maxWidth="md">
          <div style={{ background: '#ffebee', padding: '1rem', border: '2px dashed #f44336' }}>
            No Padding - Content touches container edges
          </div>
        </DynContainer>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer padding="small" maxWidth="md">
          <div style={{ background: '#e8f5e8', padding: '1rem', border: '2px dashed #4caf50' }}>
            Small Padding - Minimal spacing
          </div>
        </DynContainer>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer padding="medium" maxWidth="md">
          <div style={{ background: '#e3f2fd', padding: '1rem', border: '2px dashed #2196f3' }}>
            Medium Padding - Default spacing
          </div>
        </DynContainer>
      </div>
      
      <div>
        <DynContainer padding="large" maxWidth="md">
          <div style={{ background: '#fff3e0', padding: '1rem', border: '2px dashed #ff9800' }}>
            Large Padding - Extra spacing
          </div>
        </DynContainer>
      </div>
    </div>
  ),
};

export const SemanticVariants: Story = {
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '2rem' }}>
      <DynContainer variant="default" maxWidth="lg" style={{ marginBottom: '2rem' }}>
        <div style={{ background: '#e3f2fd', padding: '2rem' }}>
          <h3>Default Container (div)</h3>
          <p>Regular container using div element. Good for general layout purposes.</p>
        </div>
      </DynContainer>
      
      <DynContainer variant="section" maxWidth="lg" style={{ marginBottom: '2rem' }}>
        <div style={{ background: '#e8f5e8', padding: '2rem' }}>
          <h3>Section Container</h3>
          <p>Semantic section element. Use for distinct sections of content.</p>
        </div>
      </DynContainer>
      
      <DynContainer variant="article" maxWidth="lg">
        <div style={{ background: '#fff3e0', padding: '2rem' }}>
          <h3>Article Container</h3>
          <p>Semantic article element. Use for standalone content like blog posts or articles.</p>
        </div>
      </DynContainer>
    </div>
  ),
};

export const WithTitleAndSubtitle: Story = {
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '2rem' }}>
      <DynContainer 
        variant="article" 
        maxWidth="md" 
        title="Article Title" 
        subtitle="This is a subtitle that provides additional context"
      >
        <p>This container demonstrates the title and subtitle functionality. The header section is automatically added when title or subtitle props are provided.</p>
        <p>The semantic structure helps with accessibility and SEO, making the content more meaningful to screen readers and search engines.</p>
      </DynContainer>
    </div>
  ),
};

export const CustomSizing: Story = {
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <DynContainer customMaxWidth="400px">
          <div style={{ background: '#e8f5e8', padding: '1rem', textAlign: 'center' }}>
            Custom Max Width: 400px
          </div>
        </DynContainer>
      </div>
      
      <div>
        <DynContainer customPadding="3rem" maxWidth="md">
          <div style={{ background: '#e3f2fd', padding: '1rem', border: '2px dashed #2196f3', textAlign: 'center' }}>
            Custom Padding: 3rem on left and right
          </div>
        </DynContainer>
      </div>
    </div>
  ),
};

export const CenteredContent: Story = {
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '2rem' }}>
      <DynContainer center maxWidth="md">
        <div style={{ background: '#e8f5e8', padding: '2rem' }}>
          <h3>Centered Container Content</h3>
          <p>All content inside this container is center-aligned.</p>
          <button>Call to Action</button>
        </div>
      </DynContainer>
    </div>
  ),
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a', minHeight: '100vh' }}>
      <DynContainer variant="article" maxWidth="lg" title="Dark Theme Container" subtitle="Demonstrating dark theme support">
        <div style={{ background: '#2d2d2d', padding: '2rem', borderRadius: '8px', color: 'white' }}>
          <h3>Dark Theme Content</h3>
          <p>This container adapts its appearance for dark theme environments using CSS custom properties and media queries.</p>
          <p>The background, borders, and text colors are automatically adjusted for better contrast and readability in dark mode.</p>
        </div>
      </DynContainer>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '1rem' }}>
      <DynContainer maxWidth="lg" padding="large">
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>Responsive Container</h2>
          <p>This container adjusts its padding and behavior across different screen sizes:</p>
          <ul>
            <li><strong>Mobile:</strong> Reduced padding for better space utilization</li>
            <li><strong>Tablet:</strong> Medium padding with optimized layout</li>
            <li><strong>Desktop:</strong> Full padding for comfortable reading</li>
          </ul>
          <p>Resize your viewport or use the Storybook viewport controls to see the responsive behavior in action.</p>
        </div>
      </DynContainer>
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ background: '#f8f9fa', padding: '2rem' }}>
      <DynContainer 
        variant="section" 
        maxWidth="lg"
        role="main"
        aria-label="Main content area"
      >
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px' }}>
          <h2>Accessibility Features</h2>
          <p>This container demonstrates proper accessibility implementation:</p>
          <ul>
            <li>Semantic HTML elements (section, article, div)</li>
            <li>ARIA labels and roles support</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>Focus indicators</li>
          </ul>
        </div>
      </DynContainer>
    </div>
  ),
};
```

---

## 📤 EXPORT STANDARDIZATION (index.ts):

```typescript
export { DynContainer } from './DynContainer';
export { default } from './DynContainer';
export type { 
  DynContainerProps, 
  DynContainerRef,
  DynContainerMaxWidth,
  DynContainerPadding,
  DynContainerVariant
} from './DynContainer.types';
```

---

## ✅ DELIVERABLE CHECKLIST:

- [ ] CSS custom properties umesto svih hard-coded vrednosti
- [ ] Responsive breakpoints definisani kroz design tokens
- [ ] Dark theme support implementiran
- [ ] Semantic HTML variants (div, section, article)
- [ ] Max width variants sa design token vrednostima
- [ ] Responsive padding system
- [ ] Title/subtitle header funkcionalnost
- [ ] Custom sizing options (customMaxWidth, customPadding)
- [ ] Accessibility compliance (ARIA support, semantic HTML)
- [ ] forwardRef pattern implementiran
- [ ] Comprehensive testing (85%+ coverage)
- [ ] Storybook sa responsive i dark theme examples
- [ ] TypeScript strict mode compliance
- [ ] Print media styles
- [ ] Focus indicators za accessibility

🎯 **SUCCESS**: Production-ready responsive container komponent koji zamenjuje postojeću implementaciju sa potpunom design tokens podrškom!