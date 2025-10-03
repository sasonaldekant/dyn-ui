import * as React from 'react';

export type ThemeContextValue = {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
};

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
  availableThemes: ['light', 'dark'],
});

export type ThemeProviderProps = {
  initialTheme?: string;
  children: React.ReactNode;
};

const AVAILABLE_THEMES = ['light', 'dark'];

export function ThemeProvider({ initialTheme = 'light', children }: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState(initialTheme);

  const setTheme = React.useCallback((newTheme: string) => {
    if (AVAILABLE_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.className = `theme-${newTheme}`;
    }
  }, []);

  // Set initial theme on mount
  React.useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  const contextValue = React.useMemo(() => ({
    theme,
    setTheme,
    availableThemes: AVAILABLE_THEMES,
  }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};