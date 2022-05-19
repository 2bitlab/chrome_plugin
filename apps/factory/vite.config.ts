import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import ssr from 'vite-plugin-ssr/plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { UserConfig } from 'vite'
import yaml from '@rollup/plugin-yaml'

import { resolve } from 'path'

const config: UserConfig = {
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: resolve(__dirname, 'src') + '/'
      },
      {
        find: '@server/',
        replacement: resolve(__dirname, 'server') + '/'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    md(),
    ssr(),
    AutoImport({
      imports: [
        // presets
        'vue',
        '@vueuse/head'
      ]
      // dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue', 'ts'],
      dts: 'src/components.d.ts'
    }),
    yaml()
  ],
  // Neeed if using an ESM-only library. This is not the case of this example and it's, in general, a rare case. But such situation will increasingly occur as ESM-only libraries emerge.
  build: {
    rollupOptions: {
      output: {
        format: 'es' // Transpile to ESM instead of CJS
      }
    }
  }
}

export default config
