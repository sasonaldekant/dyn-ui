import tsParser from '@typescript-eslint/parser';
import dynUiPlugin from 'eslint-plugin-dyn-ui';

export default [
  {
    files: ['packages/dyn-ui-react/src/components/**/index.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'dyn-ui': dynUiPlugin,
    },
    rules: {
      'dyn-ui/require-component-export-pattern': 'error',
      'dyn-ui/require-component-support-files': 'error',
    },
  },
];
