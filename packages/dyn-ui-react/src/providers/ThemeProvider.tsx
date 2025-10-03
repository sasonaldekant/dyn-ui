// src/theme/ThemeProvider.tsx
import * as React from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'light'
}) => {
  const [theme, setTheme] = React.useState<Theme>(initialTheme);

  React.useEffect(() => {
    const root = document.documentElement;

    // Ukloni postojeće theme klase
    root.classList.remove('theme-light', 'theme-dark');

    // Dodaj novu theme klasu
    root.classList.add(`theme-${theme}`);

    // Postavi data atribut za dodatnu selektivnost
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
