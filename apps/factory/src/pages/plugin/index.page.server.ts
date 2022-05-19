import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import servicesHelper from '@server/services/server'

export { onBeforeRender }
export { prerender }

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  console.log('index.page.server onBeforeRender')

  const dirs = await servicesHelper('PluginConfig/loadData')
  console.log('index.page.server dirs', dirs)

  const pageProps = { ...dirs }
  return {
    pageContext: {
      pageProps
    }
  }
}

function prerender() {
  console.log('index.page.server prerender')
  return []
}
