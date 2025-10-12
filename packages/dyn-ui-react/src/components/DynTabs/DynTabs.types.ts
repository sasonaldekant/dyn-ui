/**
 * DynTabs TypeScript type definitions
 * Tab navigation component types with advanced features
 */

import type { ReactNode } from 'react';
import type { DynBadgeColor, DynBadgeVariant } from '../DynBadge/DynBadge.types';

export type TabBadge =
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

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  icon?: string | React.ReactNode;
  badge?: TabBadge;
  tooltip?: string;
}

export interface DynTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  defaultActiveTab?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  size?: 'small' | 'medium' | 'large';
  scrollable?: boolean;
  lazyLoad?: boolean;
  closable?: boolean;
  addable?: boolean;
  className?: string;
  tabClassName?: string;
  panelClassName?: string;
  onTabChange?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onTabAdd?: () => void;
  renderTabContent?: (tab: TabItem) => React.ReactNode;
}

export interface DynTabsHandle {
  setActiveTab: (tabId: string) => void;
  getActiveTab: () => string | undefined;
  closeTab: (tabId: string) => void;
  addTab: (tab: TabItem) => void;
}

// Default configuration
export const TABS_DEFAULTS = {
  position: 'top' as const,
  variant: 'default' as const,
  size: 'medium' as const,
  scrollable: false,
  lazyLoad: false,
  closable: false,
  addable: false
};

// Tab positions
export const TAB_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
} as const;

// Tab variants
export const TAB_VARIANTS = {
  DEFAULT: 'default',
  PILLS: 'pills',
  UNDERLINE: 'underline',
  CARDS: 'cards'
} as const;