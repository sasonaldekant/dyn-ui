import type { HTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps, AccessibilityProps } from '../../types';

export type BoxDisplay =
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'flex'
  | 'inline-flex'
  | 'grid'
  | 'inline-grid'
  | 'none';

export type BoxPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
export type SpacingSize = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto';
export type BackgroundVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type Shadow = 'sm' | 'md' | 'lg';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type Overflow = 'visible' | 'hidden' | 'auto' | 'scroll';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
export type AlignContent = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';

export interface ResponsiveVisibilityProps {
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
  mobileOnly?: boolean;
  tabletOnly?: boolean;
  desktopOnly?: boolean;
}

export interface DynBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
    BaseComponentProps,
    AccessibilityProps,
    ResponsiveVisibilityProps {
  /** Element to render as */
  as?: keyof JSX.IntrinsicElements;

  /** Display property */
  display?: BoxDisplay;

  /** Position property */
  position?: BoxPosition;

  /** Padding (all sides) */
  p?: SpacingSize;
  /** Horizontal padding */
  px?: SpacingSize;
  /** Vertical padding */
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
  /** Horizontal margin */
  mx?: SpacingSize;
  /** Vertical margin */
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
  /** Minimum width */
  minWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Maximum width */
  maxWidth?: string | number;
  /** Maximum height */
  maxHeight?: string | number;

  /** Background color variant */
  bg?: BackgroundVariant;
  /** Custom background color */
  backgroundColor?: string;

  /** Text color */
  color?: string;

  /** Apply border on all sides */
  border?: boolean;
  /** Apply border on top */
  borderTop?: boolean;
  /** Apply border on right */
  borderRight?: boolean;
  /** Apply border on bottom */
  borderBottom?: boolean;
  /** Apply border on left */
  borderLeft?: boolean;
  /** Border radius token */
  borderRadius?: BorderRadius;
  /** Custom border radius */
  customBorderRadius?: string;

  /** Shadow token */
  shadow?: Shadow;

  /** Text alignment */
  textAlign?: TextAlign;

  /** Overflow behaviour */
  overflow?: Overflow;
  /** Horizontal overflow behaviour */
  overflowX?: Overflow;
  /** Vertical overflow behaviour */
  overflowY?: Overflow;

  /** Flexbox direction */
  flexDirection?: FlexDirection;
  /** Flexbox wrap */
  flexWrap?: FlexWrap;
  /** Flexbox justify content */
  justifyContent?: JustifyContent;
  /** Flexbox align items */
  alignItems?: AlignItems;
  /** Flexbox align content */
  alignContent?: AlignContent;
  /** Gap */
  gap?: SpacingSize;
  /** Row gap */
  rowGap?: SpacingSize;
  /** Column gap */
  columnGap?: SpacingSize;

  /** Grid template columns */
  gridTemplateColumns?: string;
  /** Grid template rows */
  gridTemplateRows?: string;
  /** Grid template areas */
  gridTemplateAreas?: string;

  /** Top offset */
  top?: string | number;
  /** Right offset */
  right?: string | number;
  /** Bottom offset */
  bottom?: string | number;
  /** Left offset */
  left?: string | number;
  /** z-index */
  zIndex?: number;

  /** Enable interactive styles */
  interactive?: boolean;

  /** Custom CSS variables */
  cssVars?: Record<string, string | number>;

  /** Children */
  children?: ReactNode;
}

export type DynBoxRef = HTMLDivElement;

export interface DynBoxDefaultProps {
  'data-testid': string;
}

export const DYN_BOX_DEFAULT_PROPS: DynBoxDefaultProps = {
  'data-testid': 'dyn-box',
};
