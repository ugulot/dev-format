/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

import path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@lib': path.resolve('./src/lib'),
      '@tags': path.resolve('./src/tags'),
    },
  },
  test: {
    typecheck: {
      enabled: true,
    },
  },
})
