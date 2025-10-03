// Core Components
export { DynButton } from './components/DynButton';
export type { DynButtonProps } from './components/DynButton';

// Display Components - SCOPE 5
export { DynBadge, DynAvatar, DynLabel, DynIcon } from './components';
export type { 
  DynBadgeProps, 
  BadgeStatus, 
  BadgeSize, 
  DynAvatarProps, 
  AvatarSize, 
  DynLabelProps,
  DynIconPropsNew as DynIconProps
} from './components';
export { DYN_COLOR_PALETTE, AVATAR_SIZES } from './components';

// Providers
export { ThemeProvider, IconDictionaryProvider } from './providers';
export type { ThemeProviderProps } from './providers';

// Hooks
export { useTheme, useThemeVars } from './hooks/useTheme';
export { useIconDictionary } from './hooks/useIconDictionary';

// Types
export type { 
  ThemeName, 
  ThemeConfig, 
  ThemeContextValue, 
  ColorVariant, 
  Size,
  IconDictionary
} from './types';

// Utils
export { classNames, createClassNameGenerator, combineClasses } from './utils/classNames';
export { generateInitials, formatBadgeValue, isThemeColor, processIconString } from './utils/dynFormatters';

// Note: SCSS imports removed from production build to avoid Rollup issues
// Styles should be imported by consuming applications
