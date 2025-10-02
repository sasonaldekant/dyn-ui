import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    globals: true
  }
})
