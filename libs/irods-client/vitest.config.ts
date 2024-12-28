import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    root: __dirname,
    setupFiles: ['./vitest.setup.ts'],
  },
})
