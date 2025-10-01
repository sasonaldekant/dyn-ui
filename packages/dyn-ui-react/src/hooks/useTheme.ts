import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';
import { ThemeContextValue } from '../types/theme';

/**
 * Hook for accessing theme context
 * @returns Theme context value with current theme and theme utilities
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

/**
 * Hook for getting CSS custom properties from current theme
 * @returns Object with CSS custom properties for current theme
 */
export const useThemeVars = () => {
  const { themeConfig } = useTheme();
  
  const cssVars: Record<string, string> = {};
  
  // Convert theme colors to CSS custom properties
  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    cssVars[`--color-${key}`] = value;
  });
  
  // Convert spacing to CSS custom properties
  Object.entries(themeConfig.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  // Convert border radius to CSS custom properties
  Object.entries(themeConfig.borderRadius).forEach(([key, value]) => {
    cssVars[`--radius-${key}`] = value;
  });
  
  // Convert font sizes to CSS custom properties
  Object.entries(themeConfig.fontSize).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value;
  });
  
  // Convert shadows to CSS custom properties
  Object.entries(themeConfig.shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });
  
  return cssVars;
};