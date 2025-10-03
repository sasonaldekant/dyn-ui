import * as React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { getAvailableThemes } from '../../theme/bridge/themeLoader.design-tokens';

export type ThemeSwitcherProps = {
  themes?: string[];
  size?: 'sm' | 'md';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  onChange?: (name: string) => void;
  labels?: Record<string, string>;
};

const padVar = (size: 'sm'|'md') => size === 'sm' ? 'var(--dyn-spacing-sm)' : 'var(--dyn-spacing-md)';
const radiusVar = (k: string) => `var(--dyn-radius-${k})`;

export function ThemeSwitcher({
  themes,
  size = 'md',
  rounded = 'md',
  onChange,
  labels,
}: ThemeSwitcherProps) {
  const discovered = React.useMemo(() => getAvailableThemes(), []);
  const list = themes && themes.length ? themes : discovered;
  const { name, setTheme } = useTheme();

  const handle = (t: string) => { setTheme(t); onChange?.(t); };

  return (
    <div role="tablist" aria-label="Theme switcher" style={{
      display: 'inline-flex',
      border: '1px solid var(--dyn-colors-muted)',
      borderRadius: radiusVar(rounded),
      overflow: 'hidden',
      background: 'var(--dyn-colors-muted)',
    }}>
      {list.map((t) => {
        const active = name === t;
        return (
          <button key={t} role="tab" aria-selected={active} onClick={() => handle(t)} style={{
            appearance: 'none',
            cursor: 'pointer',
            padding: `${padVar(size)} calc(${padVar(size)} * 1.5)`,
            border: 'none',
            background: active ? 'var(--dyn-colors-primary)' : 'transparent',
            color: active ? 'var(--dyn-colors-bg)' : 'var(--dyn-colors-text)',
            fontWeight: 500, lineHeight: 1.2,
          }}>
            {labels?.[t] ?? t}
          </button>
        );
      })}
    </div>
  );
}
