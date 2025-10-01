// Theme System
export { ThemeProvider } from './providers/ThemeProvider';
export { useTheme, useThemeVars } from './hooks/useTheme';
export type { ThemeName, ThemeConfig, ThemeContextValue, ColorVariant, Size } from './types/theme';

// Components
export { DynButton } from './components/Button';
export type { ButtonProps } from './components/Button';

// Utils
export { classNames, createClassNameGenerator, combineClasses } from './utils/classNames';

// Styles
import './styles/globals.scss';

// Legacy export for backward compatibility
export const DynButton_Legacy: React.FC = () => {
  return <button>Dyn Button (Legacy)</button>;
};