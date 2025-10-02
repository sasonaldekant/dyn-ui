import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: [
    '../packages/dyn-ui-react/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../apps/react-demo/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    // Ensure proper CSS handling and workspace resolution
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      'dyn-ui-react': path.resolve(__dirname, '../packages/dyn-ui-react/src'),
    }
    
    // Configure CSS processing
    if (config.css) {
      config.css.preprocessorOptions = {
        ...config.css.preprocessorOptions,
        scss: {
          additionalData: `@import "${path.resolve(__dirname, '../packages/dyn-ui-react/src/styles/dyn-ui.css')}";`,
        },
      }
    }
    
    return config
  },
}

export default config