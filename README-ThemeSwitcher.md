# ThemeSwitcher — brza integracija

**Lokacija:** `packages/dyn-ui-react/src/components/ThemeSwitcher/ThemeSwitcher.tsx`

Korišćenje:
```tsx
import { ThemeProvider } from 'packages/dyn-ui-react/src/theme/ThemeProvider';
import ThemeSwitcher from 'packages/dyn-ui-react/src/components/ThemeSwitcher';

function App() {
  return (
    <ThemeProvider initialTheme="light">
      <div style={{ padding: 'var(--dyn-spacing-lg)' }}>
        <ThemeSwitcher labels={{ light: 'Light', dark: 'Dark' }} />
      </div>
    </ThemeProvider>
  );
}
```

U Storybook-u (već imamo globalni dekorator u `.storybook/preview.tsx`):
```tsx
<ThemeSwitcher />
```
