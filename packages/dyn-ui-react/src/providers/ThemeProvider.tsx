import { React, createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeName, ThemeConfig, ThemeContextValue } from '../types/theme';

// Default theme configurations
const defaultThemes: Record<ThemeName, ThemeConfig> = {
  light: {
    name: 'light',
    colors: {
      primary: '#2563eb',
      'primary-contrast': '#ffffff',
      secondary: '#64748b',
      'secondary-contrast': '#ffffff',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0891b2',
      background: '#ffffff',
      surface: '#f8fafc',
      'text-primary': '#1e293b',
      'text-secondary': '#64748b',
      border: '#e2e8f0'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#3b82f6',
      'primary-contrast': '#ffffff',
      secondary: '#94a3b8',
      'secondary-contrast': '#1e293b',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
      background: '#0f172a',
      surface: '#1e293b',
      'text-primary': '#f1f5f9',
      'text-secondary': '#94a3b8',
      border: '#334155'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.5)'
    }
  },
  'high-contrast': {
    name: 'high-contrast',
    colors: {
      primary: '#000000',
      'primary-contrast': '#ffffff',
      secondary: '#666666',
      'secondary-contrast': '#ffffff',
      success: '#008000',
      warning: '#ff8c00',
      danger: '#ff0000',
      info: '#0000ff',
      background: '#ffffff',
      surface: '#f0f0f0',
      'text-primary': '#000000',
      'text-secondary': '#333333',
      border: '#000000'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.8)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.8)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.8)'
    }
  }
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

/**
 * Theme Provider component that manages theme state and provides theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);

  // Apply CSS custom properties to document root
  useEffect(() => {
    const root = document.documentElement;
    const themeConfig = defaultThemes[theme];
    
    // Apply theme colors as CSS custom properties
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Apply spacing
    Object.entries(themeConfig.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
    
    // Apply border radius
    Object.entries(themeConfig.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    // Apply font sizes
    Object.entries(themeConfig.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });
    
    // Apply shadows
    Object.entries(themeConfig.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    const themes: ThemeName[] = ['light', 'dark', 'high-contrast'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const contextValue: ThemeContextValue = {
    theme,
    themeConfig: defaultThemes[theme],
    setTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;