/* eslint-disable spaced-comment */
/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@belloai/api': resolve(__dirname, 'packages/api/index.ts')
    },
    dedupe: ['vue', 'vue-demi', '@vue/runtime-core']
  },
  // define: {
  //   __VUE_OPTIONS_API__: 'true',
  //   __VUE_PROD_DEVTOOLS__: 'false'
  // },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, 'packages/.test/setup.ts')],
    reporters: 'dot',
    deps: {
      inline: ['vue2', '@vue/composition-api', 'vue-demi']
    }
  }
})
