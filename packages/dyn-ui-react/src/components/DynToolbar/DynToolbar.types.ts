/**
 * DynToolbar TypeScript type definitions
 * Toolbar component types for action buttons and responsive layouts
 */

import type { ReactNode } from 'react';
import type { DynBadgeColor, DynBadgeVariant } from '../DynBadge/DynBadge.types';

export type ToolbarBadge =
  | number
  | string
  | {
      count?: number;
      value?: number;
      label?: ReactNode;
      color?: DynBadgeColor;
      variant?: DynBadgeVariant;
      maxCount?: number;
      showZero?: boolean;
    };

export interface ToolbarItem {
  id: string;
  label?: string;
  icon?: string | React.ReactNode;
  type?: 'button' | 'separator' | 'dropdown' | 'search' | 'custom';
  action?: () => void;
  disabled?: boolean;
  visible?: boolean;
  items?: ToolbarItem[]; // for dropdown submenus
  component?: React.ReactNode; // for custom components
  tooltip?: string;
  badge?: ToolbarBadge;
}

export interface DynToolbarProps {
  items: ToolbarItem[];
  variant?: 'default' | 'minimal' | 'floating';
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'bottom' | 'fixed-top' | 'fixed-bottom';
  responsive?: boolean;
  overflowMenu?: boolean;
  overflowThreshold?: number;
  showLabels?: boolean;
  className?: string;
  itemClassName?: string;
  onItemClick?: (item: ToolbarItem) => void;
  onOverflowToggle?: (isOpen: boolean) => void;
}

export interface DynToolbarRef {
  openOverflow: () => void;
  closeOverflow: () => void;
  toggleOverflow: () => void;
  refreshLayout: () => void;
}

// Default configuration
export const TOOLBAR_DEFAULTS = {
  variant: 'default' as const,
  size: 'medium' as const,
  position: 'top' as const,
  responsive: true,
  overflowMenu: true,
  overflowThreshold: 3,
  showLabels: true
};

// Toolbar item types
export const TOOLBAR_ITEM_TYPES = {
  BUTTON: 'button',
  SEPARATOR: 'separator', 
  DROPDOWN: 'dropdown',
  SEARCH: 'search',
  CUSTOM: 'custom'
} as const;