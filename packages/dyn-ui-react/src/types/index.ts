/**
 * Type exports for DYN UI React
 * Updated to include Layout Components types - SCOPE 7
 * Updated to include standardized BaseComponentProps - TYPE SYSTEM IMPROVEMENT
 */

// Base component props - standardized across all components
export type {
  BaseComponentProps,
  VariantProps,
  SizeProps
} from './theme';

// Theme types
export type { ThemeName, ThemeConfig, ThemeContextValue, ColorVariant, Size } from './theme';

// Display Components types - SCOPE 5
export type {
  DynBadgeProps,
  DynBadgeRef,
  DynBadgeVariant,
  DynBadgeColor,
  DynBadgePosition,
  DynBadgeSize,
  DynBadgeAccessibilityProps
} from './badge.types';
export type { DynAvatarProps, AvatarSize, AvatarLoading } from './avatar.types';
export type { DynIconProps, IconDictionary, ProcessedIcon } from './icon.types';
export type { DynLabelProps } from './label.types';

// Form Components types - SCOPE 6
export type {
  DynInputProps,
  DynSelectProps,
  DynDatePickerProps,
  DynFieldContainerProps,
  ValidationRule,
  DynFieldRef,
  DynFieldBase,
  SelectOption
} from './field.types';

export type {
  DynCheckboxProps,
  DynCheckboxRef,
  DynCheckboxSize,
} from '../components/DynCheckbox/DynCheckbox.types';
export {
  DYN_CHECKBOX_DEFAULT_PROPS,
} from '../components/DynCheckbox/DynCheckbox.types';

// Layout Components types - SCOPE 7
export type {
  DynContainerProps,
  DynContainerOwnProps,
  DynContainerBackground,
  DynPageProps,
  DynPageBreadcrumb,
  DynPageAction,
  LayoutSize,
  LayoutSpacing,
  LayoutDirection,
  LayoutAlignment,
  LayoutJustify
} from './layout.types';

export type {
  DynGridProps,
  DynGridColumn,
  DynGridPagination,
  DynGridSelectable,
  DynGridSortDirection,
} from '../components/DynGrid/DynGrid.types';
export { DYN_GRID_DEFAULT_PROPS } from '../components/DynGrid/DynGrid.types';

// Constants
export { AVATAR_SIZES } from './avatar.types';
