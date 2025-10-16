/**
 * DynMenu TypeScript type definitions
 * Navigation component types for hierarchical menu system
 */

import type { ReactNode } from 'react';
import type { DynBadgeColor, DynBadgeVariant } from '../DynBadge/DynBadge.types';
import type { BaseComponentProps, AccessibilityProps } from '../../types/theme';

export interface MenuBadge {
  /** Badge numeric indicator */
  count?: number;

  /** @deprecated Legacy alias for `count` */
  value?: number;

  /** Optional text label rendered inside the badge */
  label?: ReactNode;

  /** Visual color token */
  color?: DynBadgeColor;

  /** Variant styling */
  variant?: DynBadgeVariant;

  /** Maximum count before `max+` is shown */
  maxCount?: number;

  /** Display when the count is zero */
  showZero?: boolean;
}

export interface MenuItem {
  label?: string;
  icon?: string | React.ReactNode;
  shortLabel?: string;
  link?: string;
  action?: string | (() => void);
  badge?: MenuBadge;
  subItems?: MenuItem[];
  children?: MenuItem[]; // alias for subItems for compatibility
  disabled?: boolean;
  visible?: boolean;
  type?: 'divider' | 'item';
}

// Alias for backward compatibility
export type DynMenuItem = MenuItem;

export interface MenuLiterals {
  collapse: string;
  expand: string;
  search: string;
}

export type MenuOrientation = 'horizontal' | 'vertical';

export interface DynMenuProps extends BaseComponentProps, AccessibilityProps {
  /** Menu items array */
  items: MenuItem[];
  
  /** Legacy menu items prop (alias for items) */
  menus?: MenuItem[];
  
  /** Menu orientation */
  orientation?: MenuOrientation;
  
  /** Whether menu is collapsed */
  collapsed?: boolean;
  
  /** Icon for collapsed state */
  collapsedIcon?: string | React.ReactNode;
  
  /** Enable filter/search */
  filter?: boolean;
  
  /** Short logo for collapsed state */
  shortLogo?: string;
  
  /** Full logo */
  logo?: string;
  
  /** UI text literals */
  literals?: Partial<MenuLiterals>;
  
  /** Auto-toggle on mobile */
  automaticToggle?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Collapse state change handler */
  onCollapse?: (collapsed: boolean) => void;
  
  /** Menu item click handler */
  onMenuClick?: (item: MenuItem) => void;
  
  /** Generic action handler (alias for onMenuClick) */
  onAction?: (item: MenuItem | string) => void;
  
  /** Menu ID for ARIA */
  id?: string;
  
  /** ARIA label for menu */
  'aria-label'?: string;
  
  /** ARIA labelledby for menu */
  'aria-labelledby'?: string;
  
  /** ARIA describedby for menu */
  'aria-describedby'?: string;
  
  /** Test ID */
  'data-testid'?: string;
}

export interface DynMenuRef {
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
}

// Default literals
export const DEFAULT_MENU_LITERALS: MenuLiterals = {
  collapse: 'Retrair menu',
  expand: 'Expandir menu',
  search: 'Pesquisar'
};