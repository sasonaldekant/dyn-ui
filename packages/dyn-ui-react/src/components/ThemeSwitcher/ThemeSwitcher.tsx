import * as React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

export type ThemeSwitcherProps = {
  themes?: string[];
  size?: 'sm' | 'md';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  onChange?: (theme: string) => void;
  labels?: Record<string, string>;
};

const getSpacing = (size: 'sm' | 'md') => {
  return size === 'sm' ? '8px' : '12px';
};

const getBorderRadius = (rounded: string) => {
  const radiusMap = {
    sm: '4px',
    md: '6px',
    lg: '8px',
    full: '9999px'
  };
  return radiusMap[rounded as keyof typeof radiusMap] || '6px';
};

export function ThemeSwitcher({
  themes,
  size = 'md',
  rounded = 'md',
  onChange,
  labels,
}: ThemeSwitcherProps) {
  const { theme, setTheme, availableThemes } = useTheme();
  const themeList = themes && themes.length ? themes : availableThemes;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    onChange?.(newTheme);
  };

  return (
    <div
      role="tablist"
      aria-label="Theme switcher"
      style={{
        display: 'inline-flex',
        border: '1px solid #e5e7eb',
        borderRadius: getBorderRadius(rounded),
        overflow: 'hidden',
        background: '#f9fafb',
      }}
    >
      {themeList.map((t) => {
        const isActive = theme === t;
        return (
          <button
            key={t}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleThemeChange(t)}
            style={{
              appearance: 'none',
              cursor: 'pointer',
              padding: `${getSpacing(size)} ${parseInt(getSpacing(size)) * 1.5}px`,
              border: 'none',
              background: isActive ? '#3b82f6' : 'transparent',
              color: isActive ? '#ffffff' : '#374151',
              fontWeight: 500,
              lineHeight: 1.2,
              fontSize: size === 'sm' ? '0.875rem' : '1rem',
              transition: 'all 0.2s ease',
            }}
          >
            {labels?.[t] ?? t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        );
      })}
    </div>
  );
}