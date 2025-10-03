/**
 * Main component exports for DYN UI React
 * Updated to include Form Components Group - SCOPE 6
 */

// Import global theme styles
import '../styles/themes.css';

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

// Layout components
export { DynContainer } from './DynContainer';
export { DynDivider } from './DynDivider';

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

// Utility types
export type { ThemeSwitcherProps } from './ThemeSwitcher/ThemeSwitcher';

// Constants
export { DYN_COLOR_PALETTE } from '../types/badge.types';
export { AVATAR_SIZES } from '../types/avatar.types';

// Form validation utilities - SCOPE 6
export { useDynFieldValidation, validators } from '../hooks/useDynFieldValidation';
export { useDynMask, MASK_PATTERNS, getMaskPattern } from '../hooks/useDynMask';
export { useDynDateParser, DATE_FORMATS, getDateFormat } from '../hooks/useDynDateParser';
