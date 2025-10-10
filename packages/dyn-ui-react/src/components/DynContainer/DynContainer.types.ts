import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps } from '../../types/theme';
import type {
  LayoutAlignment,
  LayoutDirection,
  LayoutJustify,
  LayoutSize,
  LayoutSpacing,
} from '../../types/layout.types';

export type DynContainerBackground = 'none' | 'surface' | 'card';

export interface DynContainerOwnProps {
  /** Optional title displayed above the content */
  title?: string;
  /** Optional subtitle displayed under the title */
  subtitle?: string;
  /** Layout direction for the content area */
  direction?: LayoutDirection;
  /** Cross-axis alignment for content */
  align?: LayoutAlignment;
  /** Main-axis alignment for content */
  justify?: LayoutJustify;
  /** Spacing between content elements */
  spacing?: LayoutSpacing;
  /** Visual size variant which controls internal padding */
  size?: LayoutSize;
  /** Controls whether the container has a border */
  bordered?: boolean;
  /** Controls whether the container has a shadow */
  shadow?: boolean;
  /** Background style variant */
  background?: DynContainerBackground;
  /** Fixed height for the container */
  height?: number | string;
  /** Maximum width constraint */
  maxWidth?: number | string;
  /** Render prop children are supported in addition to nodes */
  children?: ReactNode;
  /** Removes border regardless of bordered value (legacy prop support) */
  noBorder?: boolean;
  /** Removes padding regardless of size value (legacy prop support) */
  noPadding?: boolean;
  /** Inline style overrides */
  style?: CSSProperties;
}

export type DynContainerProps = BaseComponentProps &
  DynContainerOwnProps &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    keyof BaseComponentProps | keyof DynContainerOwnProps
  >;

export type DynContainerRef = HTMLDivElement;

export interface DynContainerDefaultProps {
  direction: LayoutDirection;
  spacing: LayoutSpacing;
  size: LayoutSize;
  background: DynContainerBackground;
  bordered: boolean;
  shadow: boolean;
  'data-testid': string;
}

export const DYN_CONTAINER_DEFAULT_PROPS: DynContainerDefaultProps = {
  direction: 'vertical',
  spacing: 'md',
  size: 'medium',
  background: 'surface',
  bordered: true,
  shadow: false,
  'data-testid': 'dyn-container',
};
