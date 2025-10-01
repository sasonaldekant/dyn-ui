/**
 * Theme type definitions for Dyn UI React library
 */

export type ThemeName = 'light' | 'dark' | 'high-contrast';

export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ThemeColors {
  primary: string;
  'primary-contrast': string;
  secondary: string;
  'secondary-contrast': string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  background: string;
  surface: string;
  'text-primary': string;
  'text-secondary': string;
  border: string;
}

export interface ThemeConfig {
  name: ThemeName;
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface ThemeContextValue {
  theme: ThemeName;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

export interface VariantProps {
  variant?: ColorVariant;
}

export interface SizeProps {
  size?: Size;
}