import { renderToNodeStream } from '@vue/server-renderer'
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr'
import { createApp } from './app'
import type { PageContext } from './types'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { renderHeadToString } from '@vueuse/head'
import { getActivePinia } from 'pinia'
import { getHead } from '@/renderer/utils/useHead'

import { usePluginConfigStore } from '@/stores/pluginConfig'
import servicesHelper from '@server/services/server'
import { setServicesHelper } from '@/renderer/utils/useServicesHelper'

export { passToClient }
export { render }

const passToClient = ['pageProps', 'documentProps', 'initialState']

async function render(pageContext: PageContextBuiltIn & PageContext) {
  setServicesHelper(servicesHelper)
  const app = createApp(pageContext)

  const stream = renderToNodeStream(app)

  const store = getActivePinia()
  if (store) {
    pageContext.initialState = store.state.value

    await usePluginConfigStore().fetchDirs()
  }

  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(getHead())

  return escapeInject`<!DOCTYPE html>
    <html lang="ru" ${dangerouslySkipEscape(htmlAttrs)}>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="/favicon.ico">
      <link rel="apple-touch-icon" href="/pwa-192x192.png">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00aba9">
      <meta name="msapplication-TileColor" content="#00aba9">
      <meta name="theme-color" content="#ffffff">
      ${dangerouslySkipEscape(headTags)}
      <script>
        (function() {
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          const setting = localStorage.getItem('vueuse-color-scheme') || 'auto'
          if (setting === 'dark' || (prefersDark && setting !== 'light'))
            document.documentElement.classList.toggle('dark', true)
        })()
      </script>
    </head>
    <body${dangerouslySkipEscape(bodyAttrs)}>
      <div id="app">${stream}</div>
    </body>
    </html>`
}
