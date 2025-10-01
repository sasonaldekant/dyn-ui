// Core Component - DynButton only for production build
export { DynButton } from './components/DynButton';
export type { DynButtonProps } from './components/DynButton';

// Theme System (keeping enhanced features)
export { ThemeProvider } from './providers/ThemeProvider';
export { useTheme, useThemeVars } from './hooks/useTheme';
export type { ThemeName, ThemeConfig, ThemeContextValue, ColorVariant, Size } from './types/theme';

// Utils (keeping enhanced features)
export { classNames, createClassNameGenerator, combineClasses } from './utils/classNames';

// Legacy compatibility
export const DynButton_Legacy: React.FC = () => {
  return <button>Dyn Button (Legacy)</button>;
};

// Note: SCSS imports removed from production build to avoid Rollup issues
// Styles should be imported by consuming applications