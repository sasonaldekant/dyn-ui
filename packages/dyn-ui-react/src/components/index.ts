/**
 * Main component exports for DYN UI React
 * Updated to include Display Components Group - SCOPE 5
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
export type { DynIconProps } from './DynIcon/DynIcon';

// Display Components types
export type { DynBadgeProps, BadgeStatus, BadgeSize } from '../types/badge.types';
export type { DynAvatarProps, AvatarSize } from '../types/avatar.types';
export type { DynLabelProps } from '../types/label.types';
export type { DynIconProps as DynIconPropsNew } from '../types/icon.types';

// Utility types
export type { ThemeSwitcherProps } from './ThemeSwitcher/ThemeSwitcher';

// Constants
export { DYN_COLOR_PALETTE } from '../types/badge.types';
export { AVATAR_SIZES } from '../types/avatar.types';