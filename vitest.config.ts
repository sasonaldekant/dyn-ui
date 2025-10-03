import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,                 // describe/it/expect globalno
    environment: 'jsdom',          // okruženje za React komponente
    setupFiles: './vitest.setup.ts',
    css: true,                     // dozvoli import CSS/CSS modules u testovima
    include: ['packages/**/?(*.){test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
      reportsDirectory: './coverage'
    }
  }
});
