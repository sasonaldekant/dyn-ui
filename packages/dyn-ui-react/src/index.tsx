// Theme System (from my enhanced implementation - keeping these)
export { ThemeProvider } from './providers/ThemeProvider';
export { useTheme, useThemeVars } from './hooks/useTheme';
export type { ThemeName, ThemeConfig, ThemeContextValue, ColorVariant, Size } from './types/theme';

// DynButton - SCOPE 3 specification (corrected)
export { DynButton } from './components/DynButton';
export type { DynButtonProps } from './components/DynButton';

// Utils (keeping these)
export { classNames, createClassNameGenerator, combineClasses } from './utils/classNames';

// Styles (keeping this)
import './styles/globals.scss';

// Legacy compatibility - maintaining backward compatibility
export const DynButton_Legacy: React.FC = () => {
  return <button>Dyn Button (Legacy)</button>;
};

// Note: This combines original SCOPE 3 DynButton with enhanced theme system
// for seamless integration while following the implementation plan