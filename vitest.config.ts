import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom', // Faster than jsdom
    setupFiles: './test-setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 90,
      functions: 90,
      branches: 90,
      statements: 90,
      include: ['packages/dyn-ui-react/src/**/*.{ts,tsx}'],
      exclude: [
        'packages/dyn-ui-react/src/**/*.stories.tsx',
        'packages/dyn-ui-react/src/**/*.test.tsx',
        'packages/dyn-ui-react/src/**/*.types.ts',
        'packages/dyn-ui-react/src/components/index.ts'
      ]
    },
    // CSS Modules support
    css: {
      modules: {
        classNameStrategy: 'scoped'
      }
    }
  },
  // CSS Modules configuration for build
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    }
  }
});