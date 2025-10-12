# 🎯 DYN-UI CODEX PROMPT 04 - DynBreadcrumb

## 🚀 AI ZADATAK: Refaktoriši DynBreadcrumb komponent za design tokens i accessibility compliance

> **PARALLELNO IZVRŠAVANJE**: Ovaj prompt može se pokretati simultano sa ostalim navigation komponentima

---

## 📂 FAJLOVI ZA MODIFIKACIJU:

```
packages/dyn-ui-react/src/components/DynBreadcrumb/
├── DynBreadcrumb.tsx
├── DynBreadcrumb.types.ts  
├── DynBreadcrumb.module.css
├── DynBreadcrumb.stories.tsx
├── DynBreadcrumb.test.tsx
└── index.ts
```

---

## 🔧 CSS MODULE REFACTORING (DynBreadcrumb.module.css):

**ZADATAK**: Zameni SVE hard-coded vrednosti sa design tokens i dodaj accessibility/responsive features

```css
.breadcrumb {
  /* Navigation wrapper */
  font-family: var(--dyn-font-family-primary);
  font-size: var(--dyn-font-size-sm);
  line-height: var(--dyn-line-height-normal);
}

.breadcrumbList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--dyn-spacing-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumbItem {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-xs);
  
  /* Truncation for long items */
  &:not(:last-child) {
    max-width: 200px;
  }
}

.breadcrumbLink {
  color: var(--dyn-color-text-secondary);
  text-decoration: none;
  padding: var(--dyn-spacing-xs);
  border-radius: var(--dyn-border-radius-sm);
  transition: var(--dyn-transition-fast);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  /* Interactive states */
  &:hover {
    color: var(--dyn-color-primary);
    background-color: var(--dyn-color-primary-alpha-10);
    text-decoration: underline;
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
  
  &:active {
    background-color: var(--dyn-color-primary-alpha-20);
  }
}

.breadcrumbCurrent {
  color: var(--dyn-color-text-primary);
  font-weight: var(--dyn-font-weight-medium);
  padding: var(--dyn-spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  /* Not interactive */
  cursor: default;
}

.breadcrumbSeparator {
  color: var(--dyn-color-text-disabled);
  font-size: var(--dyn-font-size-sm);
  user-select: none;
  flex-shrink: 0;
  
  /* Default separator */
  &::before {
    content: '/';
  }
}

/* Custom separator variants */
.breadcrumbSeparator--chevron {
  &::before {
    content: '›';
    font-size: var(--dyn-font-size-base);
  }
}

.breadcrumbSeparator--arrow {
  &::before {
    content: '→';
  }
}

.breadcrumbSeparator--dot {
  &::before {
    content: '•';
  }
}

/* Size variants */
.breadcrumb--small {
  font-size: var(--dyn-font-size-xs);
  
  .breadcrumbList {
    gap: var(--dyn-spacing-2xs);
  }
  
  .breadcrumbLink,
  .breadcrumbCurrent {
    padding: var(--dyn-spacing-2xs) var(--dyn-spacing-xs);
  }
}

.breadcrumb--large {
  font-size: var(--dyn-font-size-base);
  
  .breadcrumbList {
    gap: var(--dyn-spacing-sm);
  }
  
  .breadcrumbLink,
  .breadcrumbCurrent {
    padding: var(--dyn-spacing-sm);
  }
}

/* Overflow handling */
.breadcrumb--collapsed {
  .breadcrumbItem:not(:first-child):not(:last-child):not(.breadcrumbItem--show) {
    display: none;
  }
  
  .breadcrumbItem--ellipsis {
    display: flex;
  }
}

.breadcrumbItem--ellipsis {
  display: none;
  color: var(--dyn-color-text-disabled);
  cursor: pointer;
  padding: var(--dyn-spacing-xs);
  border-radius: var(--dyn-border-radius-sm);
  transition: var(--dyn-transition-fast);
  
  &:hover {
    background-color: var(--dyn-color-neutral-25);
    color: var(--dyn-color-text-secondary);
  }
  
  &:focus-visible {
    outline: var(--dyn-focus-ring-width) solid var(--dyn-color-focus);
    outline-offset: var(--dyn-focus-ring-offset);
  }
}

/* Responsive design */
@media (max-width: 767px) {
  .breadcrumb {
    font-size: var(--dyn-font-size-xs);
  }
  
  .breadcrumbList {
    gap: var(--dyn-spacing-2xs);
  }
  
  .breadcrumbLink,
  .breadcrumbCurrent {
    padding: var(--dyn-spacing-xs);
    min-height: 44px; /* Touch target */
    display: flex;
    align-items: center;
  }
  
  .breadcrumbItem:not(:last-child) {
    max-width: 120px; /* Smaller on mobile */
  }
  
  /* Auto-collapse on mobile when more than 3 items */
  .breadcrumb:has(.breadcrumbList li:nth-child(4)) {
    .breadcrumbItem:not(:first-child):not(:last-child):not(.breadcrumbItem--show) {
      display: none;
    }
    
    .breadcrumbItem--ellipsis {
      display: flex;
    }
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .breadcrumbLink {
    color: var(--dyn-color-neutral-300);
    
    &:hover {
      color: var(--dyn-color-primary-dark);
      background-color: var(--dyn-color-neutral-800);
    }
    
    &:active {
      background-color: var(--dyn-color-neutral-700);
    }
  }
  
  .breadcrumbCurrent {
    color: var(--dyn-color-neutral-0);
  }
  
  .breadcrumbSeparator {
    color: var(--dyn-color-neutral-500);
  }
  
  .breadcrumbItem--ellipsis:hover {
    background-color: var(--dyn-color-neutral-800);
    color: var(--dyn-color-neutral-300);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .breadcrumbLink {
    border: 1px solid transparent;
    
    &:hover,
    &:focus-visible {
      border-color: currentColor;
    }
  }
  
  .breadcrumbCurrent {
    border: 1px solid currentColor;
  }
}

/* Reduce motion support */
@media (prefers-reduced-motion: reduce) {
  .breadcrumbLink,
  .breadcrumbItem--ellipsis {
    transition: none;
  }
}
```

---

## 🔤 TYPESCRIPT IMPROVEMENTS (DynBreadcrumb.types.ts):

```typescript
import { ReactNode, AnchorHTMLAttributes } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps } from '../../types/base';

export type BreadcrumbSeparator = 'slash' | 'chevron' | 'arrow' | 'dot' | 'custom';

export interface BreadcrumbItem {
  /** Unique identifier for the item */
  id?: string;
  
  /** Label text to display */
  label: string;
  
  /** URL to navigate to (if not provided, item is treated as current) */
  href?: string;
  
  /** Whether this item is the current page */
  current?: boolean;
  
  /** Whether to show this item when collapsed */
  showWhenCollapsed?: boolean;
  
  /** Custom icon before label */
  icon?: ReactNode;
  
  /** Additional props for the link element */
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'aria-current'>;
}

export interface DynBreadcrumbProps extends 
  BaseComponentProps,
  AccessibilityProps {
  
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  
  /** Size variant */
  size?: ComponentSize;
  
  /** Separator style */
  separator?: BreadcrumbSeparator;
  
  /** Custom separator element (when separator is 'custom') */
  customSeparator?: ReactNode;
  
  /** Maximum number of items to show before collapsing */
  maxItems?: number;
  
  /** Whether to show ellipsis button when collapsed */
  showEllipsis?: boolean;
  
  /** Navigation aria-label */
  navigationLabel?: string;
  
  /** Click handler for breadcrumb items */
  onItemClick?: (item: BreadcrumbItem, event: React.MouseEvent<HTMLAnchorElement>) => void;
  
  /** Expand handler for ellipsis button */
  onEllipsisClick?: () => void;
  
  /** Whether breadcrumb is currently expanded (controlled) */
  expanded?: boolean;
  
  /** Custom link component (for router integration) */
  linkComponent?: React.ElementType;
  
  /** Schema.org structured data support */
  enableStructuredData?: boolean;
}

export interface DynBreadcrumbRef extends HTMLElement {}
```

---

## ⚛️ REACT COMPONENT (DynBreadcrumb.tsx):

```typescript
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/className';
import { generateId } from '../../utils/accessibility';
import { DynBreadcrumbProps, DynBreadcrumbRef, BreadcrumbItem } from './DynBreadcrumb.types';
import styles from './DynBreadcrumb.module.css';

export const DynBreadcrumb = forwardRef<DynBreadcrumbRef, DynBreadcrumbProps>(
  (
    {
      className,
      items,
      size = 'medium',
      separator = 'slash',
      customSeparator,
      maxItems = 0,
      showEllipsis = true,
      navigationLabel = 'Breadcrumb',
      onItemClick,
      onEllipsisClick,
      expanded: controlledExpanded,
      linkComponent: LinkComponent = 'a',
      enableStructuredData = false,
      id,
      'aria-label': ariaLabel,
      ...rest
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = useState(false);
    const [internalId] = useState(() => id || generateId('breadcrumb'));
    
    const expanded = controlledExpanded ?? internalExpanded;
    
    const handleEllipsisClick = () => {
      if (controlledExpanded === undefined) {
        setInternalExpanded(true);
      }
      onEllipsisClick?.();
    };
    
    const handleItemClick = (item: BreadcrumbItem) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      onItemClick?.(item, event);
    };
    
    // Determine which items to show
    const shouldCollapse = maxItems > 0 && items.length > maxItems && !expanded;
    const visibleItems = shouldCollapse 
      ? [
          items[0], // First item (usually home)
          ...items.slice(1, -1).filter(item => item.showWhenCollapsed),
          items[items.length - 1] // Last item (current page)
        ]
      : items;
    
    const hasHiddenItems = shouldCollapse && items.length > visibleItems.length;
    
    const renderSeparator = (index: number) => {
      const separatorClasses = cn(\n        styles.breadcrumbSeparator,\n        separator !== 'slash' && styles[`breadcrumbSeparator--${separator}`]\n      );\n      \n      return (\n        <span \n          key={`separator-${index}`}\n          className={separatorClasses}\n          aria-hidden=\"true\"\n        >\n          {separator === 'custom' && customSeparator}\n        </span>\n      );\n    };\n    \n    const renderItem = (item: BreadcrumbItem, index: number, array: BreadcrumbItem[]) => {\n      const isLast = index === array.length - 1;\n      const isCurrent = item.current || (isLast && !item.href);\n      \n      const itemContent = (\n        <>\n          {item.icon && (\n            <span className={styles.breadcrumbIcon} aria-hidden=\"true\">\n              {item.icon}\n            </span>\n          )}\n          <span className={styles.breadcrumbText}>\n            {item.label}\n          </span>\n        </>\n      );\n      \n      return (\n        <li key={item.id || index} className={styles.breadcrumbItem}>\n          {isCurrent ? (\n            <span \n              className={styles.breadcrumbCurrent}\n              aria-current=\"page\"\n              {...(enableStructuredData && {\n                itemProp: 'name'\n              })}\n            >\n              {itemContent}\n            </span>\n          ) : (\n            <LinkComponent\n              href={item.href}\n              className={styles.breadcrumbLink}\n              onClick={handleItemClick(item)}\n              {...item.linkProps}\n              {...(enableStructuredData && {\n                itemProp: 'item',\n                itemScope: true,\n                itemType: 'https://schema.org/ListItem'\n              })}\n            >\n              {enableStructuredData && (\n                <>\n                  <span itemProp=\"name\">{itemContent}</span>\n                  <meta itemProp=\"position\" content={String(index + 1)} />\n                </>\n              ) : (\n                itemContent\n              )}\n            </LinkComponent>\n          )}\n          \n          {!isLast && renderSeparator(index)}\n        </li>\n      );\n    };\n    \n    const renderEllipsis = () => {\n      if (!hasHiddenItems || !showEllipsis) return null;\n      \n      return (\n        <>\n          <li className={cn(styles.breadcrumbItem, styles['breadcrumbItem--ellipsis'])}>\n            <button\n              type=\"button\"\n              className={styles.breadcrumbItem--ellipsis}\n              onClick={handleEllipsisClick}\n              aria-label={`Show ${items.length - visibleItems.length} hidden breadcrumb items`}\n              aria-expanded={expanded}\n            >\n              …\n            </button>\n          </li>\n          {renderSeparator(-1)}\n        </>\n      );\n    };\n    \n    const breadcrumbClasses = cn(\n      styles.breadcrumb,\n      styles[`breadcrumb--${size}`],\n      {\n        [styles['breadcrumb--collapsed']]: shouldCollapse\n      },\n      className\n    );\n    \n    return (\n      <nav\n        ref={ref}\n        id={internalId}\n        className={breadcrumbClasses}\n        aria-label={ariaLabel || navigationLabel}\n        {...(enableStructuredData && {\n          itemScope: true,\n          itemType: 'https://schema.org/BreadcrumbList'\n        })}\n        {...rest}\n      >\n        <ol className={styles.breadcrumbList}>\n          {/* Render first item */}\n          {visibleItems.length > 0 && renderItem(visibleItems[0], 0, visibleItems)}\n          \n          {/* Render ellipsis if needed */}\n          {visibleItems.length > 1 && renderEllipsis()}\n          \n          {/* Render remaining items */}\n          {visibleItems.slice(1).map((item, index) => \n            renderItem(item, index + 1, visibleItems)\n          )}\n        </ol>\n      </nav>\n    );\n  }\n);\n\nDynBreadcrumb.displayName = 'DynBreadcrumb';\n```\n\n---\n\n## 🧪 TESTING ENHANCEMENTS (DynBreadcrumb.test.tsx):\n\n```typescript\nimport { describe, it, expect, vi } from 'vitest';\nimport { render, screen, fireEvent } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport { testAccessibility } from '../../test-utils';\nimport { DynBreadcrumb } from './DynBreadcrumb';\nimport type { BreadcrumbItem } from './DynBreadcrumb.types';\n\nconst mockItems: BreadcrumbItem[] = [\n  { id: '1', label: 'Home', href: '/' },\n  { id: '2', label: 'Products', href: '/products' },\n  { id: '3', label: 'Electronics', href: '/products/electronics' },\n  { id: '4', label: 'Smartphones', current: true }\n];\n\ndescribe('DynBreadcrumb', () => {\n  describe('Basic Functionality', () => {\n    it('renders breadcrumb navigation', () => {\n      render(<DynBreadcrumb items={mockItems} />);\n      expect(screen.getByRole('navigation')).toBeInTheDocument();\n      expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();\n    });\n\n    it('renders all breadcrumb items', () => {\n      render(<DynBreadcrumb items={mockItems} />);\n      \n      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();\n      expect(screen.getByRole('link', { name: 'Products' })).toBeInTheDocument();\n      expect(screen.getByRole('link', { name: 'Electronics' })).toBeInTheDocument();\n      expect(screen.getByText('Smartphones')).toBeInTheDocument();\n    });\n\n    it('marks current page with aria-current', () => {\n      render(<DynBreadcrumb items={mockItems} />);\n      \n      const currentItem = screen.getByText('Smartphones');\n      expect(currentItem).toHaveAttribute('aria-current', 'page');\n    });\n\n    it('handles item clicks', async () => {\n      const handleClick = vi.fn();\n      render(<DynBreadcrumb items={mockItems} onItemClick={handleClick} />);\n      \n      const homeLink = screen.getByRole('link', { name: 'Home' });\n      await userEvent.click(homeLink);\n      \n      expect(handleClick).toHaveBeenCalledWith(\n        mockItems[0], \n        expect.any(Object)\n      );\n    });\n  });\n\n  describe('Accessibility', () => {\n    it('has no accessibility violations', async () => {\n      const { container } = render(<DynBreadcrumb items={mockItems} />);\n      await testAccessibility(container);\n    });\n\n    it('uses proper semantic structure', () => {\n      render(<DynBreadcrumb items={mockItems} />);\n      \n      const nav = screen.getByRole('navigation');\n      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');\n      \n      const list = screen.getByRole('list');\n      expect(list).toBeInTheDocument();\n      \n      const listItems = screen.getAllByRole('listitem');\n      expect(listItems).toHaveLength(mockItems.length);\n    });\n\n    it('supports custom navigation label', () => {\n      render(\n        <DynBreadcrumb \n          items={mockItems} \n          navigationLabel=\"Page navigation\" \n        />\n      );\n      expect(screen.getByLabelText('Page navigation')).toBeInTheDocument();\n    });\n\n    it('supports keyboard navigation', async () => {\n      render(<DynBreadcrumb items={mockItems} />);\n      \n      const firstLink = screen.getByRole('link', { name: 'Home' });\n      firstLink.focus();\n      expect(firstLink).toHaveFocus();\n      \n      await userEvent.keyboard('{Tab}');\n      const secondLink = screen.getByRole('link', { name: 'Products' });\n      expect(secondLink).toHaveFocus();\n    });\n  });\n\n  describe('Separators', () => {\n    it('renders default slash separators', () => {\n      render(<DynBreadcrumb items={mockItems} />);\n      const separators = document.querySelectorAll('.breadcrumbSeparator');\n      expect(separators).toHaveLength(mockItems.length - 1);\n    });\n\n    it('renders custom separator', () => {\n      const customSeparator = <span data-testid=\"custom-sep\">→</span>;\n      render(\n        <DynBreadcrumb \n          items={mockItems} \n          separator=\"custom\" \n          customSeparator={customSeparator} \n        />\n      );\n      expect(screen.getAllByTestId('custom-sep')).toHaveLength(mockItems.length - 1);\n    });\n\n    it('applies correct separator variant classes', () => {\n      const { rerender } = render(\n        <DynBreadcrumb items={mockItems} separator=\"chevron\" />\n      );\n      \n      let separators = document.querySelectorAll('.breadcrumbSeparator--chevron');\n      expect(separators).toHaveLength(mockItems.length - 1);\n      \n      rerender(<DynBreadcrumb items={mockItems} separator=\"arrow\" />);\n      separators = document.querySelectorAll('.breadcrumbSeparator--arrow');\n      expect(separators).toHaveLength(mockItems.length - 1);\n    });\n  });\n\n  describe('Collapse and Overflow', () => {\n    const manyItems: BreadcrumbItem[] = [\n      { id: '1', label: 'Home', href: '/' },\n      { id: '2', label: 'Level 1', href: '/level1' },\n      { id: '3', label: 'Level 2', href: '/level1/level2' },\n      { id: '4', label: 'Level 3', href: '/level1/level2/level3' },\n      { id: '5', label: 'Level 4', href: '/level1/level2/level3/level4' },\n      { id: '6', label: 'Current Page', current: true }\n    ];\n\n    it('collapses items when maxItems is set', () => {\n      render(<DynBreadcrumb items={manyItems} maxItems={4} />);\n      \n      // Should show first, last, and ellipsis\n      expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();\n      expect(screen.getByText('Current Page')).toBeInTheDocument();\n      expect(screen.getByRole('button', { name: /Show .* hidden breadcrumb items/ })).toBeInTheDocument();\n    });\n\n    it('expands when ellipsis is clicked', async () => {\n      const handleEllipsisClick = vi.fn();\n      render(\n        <DynBreadcrumb \n          items={manyItems} \n          maxItems={3} \n          onEllipsisClick={handleEllipsisClick}\n        />\n      );\n      \n      const ellipsisButton = screen.getByRole('button', { name: /Show .* hidden breadcrumb items/ });\n      await userEvent.click(ellipsisButton);\n      \n      expect(handleEllipsisClick).toHaveBeenCalled();\n    });\n\n    it('respects showWhenCollapsed flag', () => {\n      const itemsWithFlags: BreadcrumbItem[] = [\n        { id: '1', label: 'Home', href: '/' },\n        { id: '2', label: 'Important', href: '/important', showWhenCollapsed: true },\n        { id: '3', label: 'Hidden', href: '/hidden' },\n        { id: '4', label: 'Current', current: true }\n      ];\n      \n      render(<DynBreadcrumb items={itemsWithFlags} maxItems={3} />);\n      \n      expect(screen.getByRole('link', { name: 'Important' })).toBeInTheDocument();\n      expect(screen.queryByRole('link', { name: 'Hidden' })).not.toBeInTheDocument();\n    });\n  });\n\n  describe('Size Variants', () => {\n    it('applies size classes correctly', () => {\n      const { container, rerender } = render(\n        <DynBreadcrumb items={mockItems} size=\"small\" />\n      );\n      expect(container.firstChild).toHaveClass('breadcrumb--small');\n      \n      rerender(<DynBreadcrumb items={mockItems} size=\"large\" />);\n      expect(container.firstChild).toHaveClass('breadcrumb--large');\n    });\n  });\n\n  describe('Icons', () => {\n    it('renders item icons', () => {\n      const itemsWithIcons: BreadcrumbItem[] = [\n        { \n          id: '1', \n          label: 'Home', \n          href: '/', \n          icon: <span data-testid=\"home-icon\">🏠</span> \n        },\n        { id: '2', label: 'Current', current: true }\n      ];\n      \n      render(<DynBreadcrumb items={itemsWithIcons} />);\n      expect(screen.getByTestId('home-icon')).toBeInTheDocument();\n    });\n  });\n\n  describe('Structured Data', () => {\n    it('includes schema.org markup when enabled', () => {\n      render(<DynBreadcrumb items={mockItems} enableStructuredData />);\n      \n      const nav = screen.getByRole('navigation');\n      expect(nav).toHaveAttribute('itemScope');\n      expect(nav).toHaveAttribute('itemType', 'https://schema.org/BreadcrumbList');\n    });\n  });\n\n  describe('Custom Link Component', () => {\n    it('uses custom link component', () => {\n      const CustomLink = ({ href, children, ...props }: any) => (\n        <span data-testid=\"custom-link\" data-href={href} {...props}>\n          {children}\n        </span>\n      );\n      \n      render(\n        <DynBreadcrumb items={mockItems} linkComponent={CustomLink} />\n      );\n      \n      expect(screen.getAllByTestId('custom-link')).toHaveLength(3); // 3 non-current items\n    });\n  });\n});\n```\n\n---\n\n## 📚 STORYBOOK IMPROVEMENTS (DynBreadcrumb.stories.tsx):\n\n```typescript\nimport type { Meta, StoryObj } from '@storybook/react';\nimport { DynBreadcrumb } from './DynBreadcrumb';\nimport type { BreadcrumbItem } from './DynBreadcrumb.types';\n\nconst meta = {\n  title: 'Components/DynBreadcrumb',\n  component: DynBreadcrumb,\n  parameters: {\n    layout: 'centered',\n    docs: {\n      description: {\n        component: 'Navigation breadcrumb component with accessibility support and responsive behavior.'\n      }\n    }\n  },\n  argTypes: {\n    size: {\n      control: 'select',\n      options: ['small', 'medium', 'large'],\n      description: 'Size variant'\n    },\n    separator: {\n      control: 'select',\n      options: ['slash', 'chevron', 'arrow', 'dot', 'custom'],\n      description: 'Separator style'\n    },\n    maxItems: {\n      control: { type: 'number', min: 0, max: 10 },\n      description: 'Maximum items before collapsing'\n    },\n    showEllipsis: {\n      control: 'boolean',\n      description: 'Show ellipsis when collapsed'\n    },\n    enableStructuredData: {\n      control: 'boolean',\n      description: 'Enable Schema.org structured data'\n    }\n  },\n  tags: ['autodocs'],\n} satisfies Meta<typeof DynBreadcrumb>;\n\nexport default meta;\ntype Story = StoryObj<typeof meta>;\n\nconst basicItems: BreadcrumbItem[] = [\n  { id: 'home', label: 'Home', href: '/' },\n  { id: 'products', label: 'Products', href: '/products' },\n  { id: 'current', label: 'Current Page', current: true }\n];\n\nconst longItems: BreadcrumbItem[] = [\n  { id: 'home', label: 'Home', href: '/' },\n  { id: 'category', label: 'Category', href: '/category' },\n  { id: 'subcategory', label: 'Subcategory', href: '/category/subcategory' },\n  { id: 'product-type', label: 'Product Type', href: '/category/subcategory/type' },\n  { id: 'brand', label: 'Brand', href: '/category/subcategory/type/brand' },\n  { id: 'model', label: 'Model', href: '/category/subcategory/type/brand/model' },\n  { id: 'current', label: 'Current Product', current: true }\n];\n\nconst itemsWithIcons: BreadcrumbItem[] = [\n  { id: 'home', label: 'Home', href: '/', icon: '🏠' },\n  { id: 'docs', label: 'Documentation', href: '/docs', icon: '📚' },\n  { id: 'api', label: 'API Reference', href: '/docs/api', icon: '⚙️' },\n  { id: 'current', label: 'Components', current: true, icon: '🧩' }\n];\n\nexport const Default: Story = {\n  args: {\n    items: basicItems,\n  },\n};\n\nexport const Separators: Story = {\n  render: () => (\n    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>\n      <div>\n        <h3>Slash (Default)</h3>\n        <DynBreadcrumb items={basicItems} separator=\"slash\" />\n      </div>\n      <div>\n        <h3>Chevron</h3>\n        <DynBreadcrumb items={basicItems} separator=\"chevron\" />\n      </div>\n      <div>\n        <h3>Arrow</h3>\n        <DynBreadcrumb items={basicItems} separator=\"arrow\" />\n      </div>\n      <div>\n        <h3>Dot</h3>\n        <DynBreadcrumb items={basicItems} separator=\"dot\" />\n      </div>\n      <div>\n        <h3>Custom</h3>\n        <DynBreadcrumb \n          items={basicItems} \n          separator=\"custom\" \n          customSeparator={<span style={{ color: '#666' }}>→</span>} \n        />\n      </div>\n    </div>\n  ),\n};\n\nexport const Sizes: Story = {\n  render: () => (\n    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>\n      <div>\n        <h3>Small</h3>\n        <DynBreadcrumb items={basicItems} size=\"small\" />\n      </div>\n      <div>\n        <h3>Medium (Default)</h3>\n        <DynBreadcrumb items={basicItems} size=\"medium\" />\n      </div>\n      <div>\n        <h3>Large</h3>\n        <DynBreadcrumb items={basicItems} size=\"large\" />\n      </div>\n    </div>\n  ),\n};\n\nexport const WithIcons: Story = {\n  args: {\n    items: itemsWithIcons,\n  },\n};\n\nexport const LongPath: Story = {\n  args: {\n    items: longItems,\n  },\n};\n\nexport const CollapsedPath: Story = {\n  args: {\n    items: longItems,\n    maxItems: 4,\n    showEllipsis: true,\n  },\n};\n\nexport const WithoutEllipsis: Story = {\n  args: {\n    items: longItems,\n    maxItems: 4,\n    showEllipsis: false,\n  },\n};\n\nexport const StructuredData: Story = {\n  args: {\n    items: basicItems,\n    enableStructuredData: true,\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: 'Includes Schema.org structured data for better SEO.'\n      }\n    }\n  }\n};\n\nexport const DarkTheme: Story = {\n  args: {\n    items: basicItems,\n  },\n  parameters: {\n    backgrounds: { default: 'dark' },\n  },\n  render: (args) => (\n    <div data-theme=\"dark\" style={{ padding: '2rem', background: '#1a1a1a' }}>\n      <DynBreadcrumb {...args} />\n    </div>\n  ),\n};\n\nexport const ResponsiveBehavior: Story = {\n  args: {\n    items: longItems,\n    maxItems: 5,\n  },\n  parameters: {\n    viewport: {\n      defaultViewport: 'mobile1',\n    },\n    docs: {\n      description: {\n        story: 'Automatically collapses on mobile devices and provides larger touch targets.'\n      }\n    }\n  }\n};\n\nexport const Accessibility: Story = {\n  args: {\n    items: [\n      { id: 'home', label: 'Home', href: '/' },\n      { id: 'section', label: 'Accessible Section', href: '/accessible' },\n      { id: 'current', label: 'Current Accessible Page', current: true }\n    ],\n    navigationLabel: 'Main page navigation',\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: 'Demonstrates proper accessibility with custom navigation labels and semantic markup.'\n      }\n    }\n  }\n};\n\nexport const Interactive: Story = {\n  render: () => {\n    const [expanded, setExpanded] = React.useState(false);\n    \n    return (\n      <DynBreadcrumb \n        items={longItems}\n        maxItems={3}\n        expanded={expanded}\n        onEllipsisClick={() => setExpanded(true)}\n        onItemClick={(item, event) => {\n          event.preventDefault();\n          alert(`Navigating to: ${item.label}`);\n        }}\n      />\n    );\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: 'Interactive example with controlled expansion and click handling.'\n      }\n    }\n  }\n};\n```\n\n---\n\n## 📤 EXPORT STANDARDIZATION (index.ts):\n\n```typescript\nexport { DynBreadcrumb } from './DynBreadcrumb';\nexport { default } from './DynBreadcrumb';\nexport type { \n  DynBreadcrumbProps, \n  DynBreadcrumbRef,\n  BreadcrumbItem,\n  BreadcrumbSeparator\n} from './DynBreadcrumb.types';\n```\n\n---\n\n## ✅ DELIVERABLE CHECKLIST:\n\n- [ ] **CSS Tokens**: Svi hard-coded stilovi zamenjeni sa `var(--dyn-*)`\n- [ ] **Navigation Landmark**: `<nav>` sa `aria-label=\"Breadcrumb\"`\n- [ ] **Semantic Structure**: `ol`/`li` lista sa proper roles\n- [ ] **Current Page**: `aria-current=\"page\"` za trenutnu stranicu\n- [ ] **Separators**: Podrška za različite separatore (slash, chevron, arrow, dot, custom)\n- [ ] **Responsive**: Mobile-first sa larger touch targets i auto-collapse\n- [ ] **Dark Theme**: `@media (prefers-color-scheme: dark)` podrška\n- [ ] **Truncation**: Text overflow handling za dugačke paths\n- [ ] **Collapse Logic**: Intelligent collapsing sa ellipsis button\n- [ ] **TypeScript**: BaseComponentProps extending sa accessibility props\n- [ ] **forwardRef**: React component koristi forwardRef pattern\n- [ ] **Keyboard Navigation**: Tab navigation kroz links\n- [ ] **Screen Reader**: Proper announcements i semantic markup\n- [ ] **Icons Support**: Optional icons pored labels\n- [ ] **Schema.org**: Structured data podrška za SEO\n- [ ] **Custom Links**: Router integration podrška\n- [ ] **Testing**: 85%+ coverage sa accessibility tests\n- [ ] **Stories**: Comprehensive Storybook examples sa dark theme\n- [ ] **High Contrast**: `@media (prefers-contrast: high)` podrška\n- [ ] **Reduced Motion**: `@media (prefers-reduced-motion: reduce)` podrška\n\n---\n\n## 🎯 SUCCESS CRITERIA:\n\n✅ **Accessibility**: 0 violations u jest-axe testovima  \n✅ **Design Tokens**: 100% hard-coded vrednosti zamenjeno  \n✅ **Responsive**: Mobile-first sa proper touch targets i auto-collapse  \n✅ **Performance**: Optimized rendering i event handling  \n✅ **SEO**: Schema.org structured data podrška  \n✅ **UX**: Intelligent truncation i collapse behavior  \n✅ **Testing**: 85%+ coverage sa comprehensive test cases  \n✅ **Documentation**: Comprehensive Storybook examples\n\n**REZULTAT**: Production-ready breadcrumb navigation sa full accessibility compliance!