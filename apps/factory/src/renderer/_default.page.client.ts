/* eslint-disable no-restricted-globals */
import { createApp } from './app'
import { useClientRouter } from 'vite-plugin-ssr/client/router'
import type { PageContext } from './types'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router'
import { getActivePinia } from 'pinia'
import NProgress from 'nprogress'

import { usePluginConfigStore } from '@/stores/pluginConfig'
import servicesHelper from '@server/services/client'
import { setServicesHelper } from '@/renderer/utils/useServicesHelper'

let app: ReturnType<typeof createApp>
const { hydrationPromise } = useClientRouter({
  render(pageContext: PageContextBuiltInClient & PageContext) {
    setServicesHelper(servicesHelper)
    if (!app) {
      app = createApp(pageContext)

      // create and set initial state for store
      const store = getActivePinia()
      if (store) {
        store.state.value = pageContext.initialState
        usePluginConfigStore().fetchDirs()
      }

      app.mount('#app')
    } else {
      app.changePage(pageContext)
    }
  },
  // Vue needs the first render to be a hydration
  ensureHydration: true,
  prefetchLinks: true,
  onTransitionStart,
  onTransitionEnd
})

hydrationPromise.then(() => {
  console.log('Hydration finished; page is now interactive.')
})

function onTransitionStart() {
  console.log('Page transition start')
  document.querySelector('.content')!.classList.add('opacity-0')
  NProgress.start()
}
function onTransitionEnd() {
  console.log('Page transition end')
  document.querySelector('.content')!.classList.remove('opacity-0')
  NProgress.done()
}
