import type {
  DynDividerColor,
  DynDividerLabelPosition,
  DynDividerLineStyle,
  DynDividerProps as DynDividerPropsBase,
  DynDividerThickness,
  LayoutDirection,
  LayoutSpacing,
} from '../../types';

export type DynDividerProps = DynDividerPropsBase;
export type DynDividerRef = HTMLDivElement;

export interface DynDividerDefaultProps {
  direction: LayoutDirection;
  thickness: DynDividerThickness;
  lineStyle: DynDividerLineStyle;
  color: DynDividerColor;
  labelPosition: DynDividerLabelPosition;
  spacing: LayoutSpacing;
  'data-testid': string;
}

export const DYN_DIVIDER_DEFAULT_PROPS: DynDividerDefaultProps = {
  direction: 'horizontal',
  thickness: 'thin',
  lineStyle: 'solid',
  color: 'default',
  labelPosition: 'center',
  spacing: 'md',
  'data-testid': 'dyn-divider',
};
