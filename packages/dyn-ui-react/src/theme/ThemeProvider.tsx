import { React } from 'react';
import type { DynThemeTokens } from './tokens';
import { applyCssVars } from './applyCssVars';
import { loadThemeTokens, getAvailableThemes, CSS_VAR_PREFIX } from './bridge/themeLoader.design-tokens';

export type ThemeContextValue = {
  name: string;
  tokens: DynThemeTokens | null;
  setTheme: (name: string) => void;
  available: string[];
};

export const ThemeContext = React.createContext<ThemeContextValue>({
  name: 'light',
  tokens: null,
  setTheme: () => {},
  available: [],
});

export type ThemeProviderProps = {
  initialTheme?: string;
  scope?: HTMLElement | string;
  children: React.ReactNode;
};

export function ThemeProvider({ initialTheme, scope, children }: ThemeProviderProps) {
  const options = React.useMemo(() => getAvailableThemes(), []);
  const defaultName = initialTheme ?? (options.includes('light') ? 'light' : options[0] ?? 'light');
  const [name, setName] = React.useState(defaultName);
  const [tokens, setTokens] = React.useState<DynThemeTokens | null>(null);

  React.useEffect(() => {
    let alive = true;
    loadThemeTokens(name).then((t) => {
      if (!alive) return;
      setTokens(t);
      applyCssVars(t, { scope, prefix: CSS_VAR_PREFIX });
    }).catch((e) => console.error(e));
    return () => { alive = false; };
  }, [name, scope]);

  const ctx = React.useMemo(() => ({
    name,
    tokens,
    setTheme: setName,
    available: options,
  }), [name, tokens, options]);

  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => React.useContext(ThemeContext);
