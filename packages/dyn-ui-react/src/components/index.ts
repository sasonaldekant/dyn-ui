/**
 * Main component exports for DYN UI React
 * Updated to include Layout Components Group - SCOPE 7
 */

// Import global theme styles
import '../styles/themes.css';
// Import component styles
import '../styles/dyn-field-container.css';
import '../styles/dyn-input.css';
import '../styles/dyn-select.css';
import '../styles/dyn-checkbox.css';
import '../styles/dyn-datepicker.css';
import '../styles/dyn-layout.css';

// Basic components
export { DynButton } from './DynButton';
export { DynIcon } from './DynIcon';

// Display Components - SCOPE 5
export { DynBadge } from './DynBadge';
export { DynAvatar } from './DynAvatar';
export { DynLabel } from './DynLabel';

// Form Components - SCOPE 6
export { DynInput } from './DynInput';
export { DynSelect } from './DynSelect';
export { DynCheckbox } from './DynCheckbox';
export { DynDatePicker } from './DynDatePicker';
export { DynFieldContainer } from './DynFieldContainer';

// Layout Components - SCOPE 7
export { DynContainer } from './DynContainer';
export { DynDivider } from './DynDivider';
export { DynGrid } from './DynGrid';
export { DynPage } from './DynPage';

// Utility components
export { ThemeSwitcher } from './ThemeSwitcher';

// Theme system
export { ThemeProvider, useTheme } from '../theme/ThemeProvider';
export type { ThemeProviderProps, ThemeContextValue } from '../theme/ThemeProvider';

// Export types
export type { DynButtonProps } from './DynButton/DynButton.types';
export type { DynIconProps as DynIconPropsNew } from '../types/icon.types';

// Display Components types
export type { DynBadgeProps, BadgeStatus, BadgeSize } from '../types/badge.types';
export type { DynAvatarProps, AvatarSize } from '../types/avatar.types';
export type { DynLabelProps } from '../types/label.types';

// Form Components types - SCOPE 6
export type {
  DynInputProps,
  DynSelectProps,
  DynCheckboxProps,
  DynDatePickerProps,
  DynFieldContainerProps,
  ValidationRule,
  DynFieldRef,
  DynFieldBase,
  SelectOption
} from '../types/field.types';

// Layout Components types - SCOPE 7
export type {
  DynContainerProps,
  DynDividerProps,
  DynGridProps,
  DynGridColumn,
  DynPageProps,
  DynPageBreadcrumb,
  DynPageAction,
  LayoutSize,
  LayoutSpacing,
  LayoutDirection,
  LayoutAlignment,
  LayoutJustify
} from '../types/layout.types';

// Utility types
export type { ThemeSwitcherProps } from './ThemeSwitcher/ThemeSwitcher';

// Constants
export { DYN_COLOR_PALETTE } from '../types/badge.types';
export { AVATAR_SIZES } from '../types/avatar.types';

// Form validation utilities - SCOPE 6
export { useDynFieldValidation, validators } from '../hooks/useDynFieldValidation';
export { useDynMask, MASK_PATTERNS, getMaskPattern } from '../hooks/useDynMask';
export { useDynDateParser, DATE_FORMATS, getDateFormat } from '../hooks/useDynDateParser';