import React, { ReactNode } from 'react';
import { BaseComponentProps, ComponentSize, AccessibilityProps } from '../../types';

export type DynTabsSize = ComponentSize;
export type DynTabsPosition = 'top' | 'bottom' | 'left' | 'right';
export type DynTabsVariant = 'default' | 'underlined' | 'pills' | 'bordered';

/**
 * Individual tab item configuration
 */
export interface DynTabItem {
  /** Unique identifier for the tab */
  id: string;
  
  /** Display label for the tab */
  label: string;
  
  /** Content to display when tab is active */
  content: ReactNode;
  
  /** Whether the tab is disabled */
  disabled?: boolean;
  
  /** Whether this specific tab can be closed */
  closable?: boolean;
  
  /** Optional icon element or component */
  icon?: ReactNode;
  
  /** Badge content (number or string) */
  badge?: string | number;
  
  /** Tooltip text for the tab */
  tooltip?: string;
}

/**
 * Props interface for DynTabs component
 * Extends BaseComponentProps for consistency across the design system
 */
export interface DynTabsProps extends 
  BaseComponentProps,
  AccessibilityProps,
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps | keyof AccessibilityProps | 'onChange' | 'children'> {
  
  /** Array of tab items to display */
  items: DynTabItem[];
  
  /** Currently active tab ID (controlled) */
  activeTab?: string;
  
  /** Default active tab ID (uncontrolled) */
  defaultActiveTab?: string;
  
  /** Position of tabs relative to content */
  position?: DynTabsPosition;
  
  /** Visual variant of the tabs */
  variant?: DynTabsVariant;
  
  /** Size of the tab elements */
  size?: DynTabsSize;
  
  /** Enable horizontal scrolling for overflow tabs */
  scrollable?: boolean;
  
  /** Allow tabs to be closed */
  closable?: boolean;
  
  /** Enable lazy loading of tab content */
  lazy?: boolean;
  
  /** Enable tab transition animations */
  animated?: boolean;
  
  /** Show add new tab button */
  addable?: boolean;
  
  /** Custom className for the tab list container */
  tabListClassName?: string;
  
  /** Custom className for the content container */
  contentClassName?: string;
  
  /** Custom loading component for lazy tabs */
  loadingComponent?: ReactNode;
  
  /** Called when active tab changes */
  onChange?: (tabId: string) => void;
  
  /** Called when a tab is closed */
  onTabClose?: (tabId: string) => void;
  
  /** Called when add tab button is clicked */
  onTabAdd?: () => void;
}

/**
 * Ref type for DynTabs component
 */
export type DynTabsRef = HTMLDivElement;

/**
 * Default props for DynTabs component
 */
export const DYN_TABS_DEFAULT_PROPS = {
  position: 'top' as const,
  variant: 'default' as const,
  size: 'medium' as const,
  scrollable: false,
  closable: false,
  lazy: false,
  animated: true,
  addable: false,
} as const;