import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import pkg from './package.json'

const getInput = () => {
  const folders = [
    'popup', // 点击插件图标出现的弹窗
    'devtoolPage', // chrome devtool pane 页面
    'background', // 插件的核心 JS，一直活跃在后台，来监听所有请求
    'devtool', // 加载 chrome devtool pane 的入口
    'options', // 插件设置页面
    'content' // 与页面同级，并在某个时机执行，可以拿到页面的 document
  ]

  const exMap: any = {
    content: 'ts'
  }

  const input = folders.reduce((obj: any, key: string) => {
    const ex = exMap[key] || 'html'
    obj[key] = resolve(__dirname, `src/${key}/index.${ex}`)
    return obj
  }, {})

  console.log('input', input)

  return input
}

const getOutDir = () => {
  const pre = pkg.name.replace('@', '').replace('/', '_')
  const aft = pkg.version.split('.').join('_')
  return resolve(__dirname, `../../build/${pre}_${aft}`)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es6',
    outDir: getOutDir(),
    assetsInlineLimit: 0,
    // chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    emptyOutDir: false,
    rollupOptions: {
      input: getInput(),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})
