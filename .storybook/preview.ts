import type { Preview } from '@storybook/react'

// Import centralized Dyn UI styles (single source of truth)
import '../packages/dyn-ui-react/src/styles/dyn-ui.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
      description: {
        component: 'Dyn UI React komponente sa centralizovanim CSS design sistemom',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'surface',
          value: '#f8fafc',
        },
        {
          name: 'dark',
          value: '#0f172a',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div 
          className="dyn-component"
          style={{ 
            padding: 'var(--spacing-xl, 2rem)', 
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'var(--color-background, #ffffff)',
            color: 'var(--color-text-primary, #1e293b)',
            minHeight: '100vh'
          }}
        >
          <Story />
        </div>
      )
    },
  ],
  globalTypes: {
    theme: {
      description: 'Dyn UI theme variant',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light Theme' },
          { value: 'dark', title: 'Dark Theme' },
          { value: 'high-contrast', title: 'High Contrast' }
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview