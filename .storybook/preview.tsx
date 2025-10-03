import { React } from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../packages/dyn-ui-react/src/theme/ThemeProvider';
import { getAvailableThemes } from '../packages/dyn-ui-react/src/theme/bridge/themeLoader.design-tokens';

const themes = getAvailableThemes();

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Dinamička tema',
    defaultValue: themes.includes('light') ? 'light' : themes[0] ?? 'light',
    toolbar: { icon: 'circlehollow', items: themes.length ? themes : ['light','dark'], dynamicTitle: true },
  },
};

const preview: Preview = {
  decorators: [
    (Story, ctx) => (
      <ThemeProvider initialTheme={ctx.globals.theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
