/**
 * Layout Components Type Definitions
 * Part of DYN UI Layout Components Group - SCOPE 7
 */

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps } from './theme';

// Common layout types
export type LayoutSize = 'small' | 'medium' | 'large';
export type LayoutSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LayoutDirection = 'horizontal' | 'vertical';
export type LayoutAlignment = 'start' | 'center' | 'end' | 'stretch';
export type LayoutJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// DynContainer Props
export type DynContainerBackground = 'none' | 'surface' | 'card';

export interface DynContainerOwnProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  direction?: LayoutDirection;
  align?: LayoutAlignment;
  justify?: LayoutJustify;
  spacing?: LayoutSpacing;
  size?: LayoutSize;
  bordered?: boolean;
  shadow?: boolean;
  background?: DynContainerBackground;
  height?: number | string;
  maxWidth?: number | string;
  noBorder?: boolean;
  noPadding?: boolean;
  style?: CSSProperties;
}

export type DynContainerProps = BaseComponentProps &
  DynContainerOwnProps &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    keyof BaseComponentProps | keyof DynContainerOwnProps
  >;

// DynDivider Props
export interface DynDividerProps {
  label?: string;
  labelPosition?: 'left' | 'center' | 'right';
  direction?: LayoutDirection;
  thickness?: 'thin' | 'medium' | 'thick';
  style?: 'solid' | 'dashed' | 'dotted';
  color?: 'default' | 'primary' | 'secondary' | 'muted';
  spacing?: LayoutSpacing;
  className?: string;
  id?: string;
  'data-testid'?: string;
}

// DynPage Props
export interface DynPageBreadcrumb {
  title: string;
  href?: string;
  onClick?: () => void;
}

export interface DynPageAction {
  key: string;
  title: string;
  icon?: string;
  type?: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface DynPageProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: DynPageBreadcrumb[];
  actions?: DynPageAction[];
  children: ReactNode;
  loading?: boolean;
  error?: string | ReactNode;
  size?: LayoutSize;
  padding?: LayoutSpacing;
  background?: 'none' | 'surface' | 'page';
  className?: string;
  id?: string;
  'data-testid'?: string;
}