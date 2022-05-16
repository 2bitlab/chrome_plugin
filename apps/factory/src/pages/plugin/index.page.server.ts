import type { PageContextBuiltIn } from 'vite-plugin-ssr'

import { loadData } from '@server/data'

export { onBeforeRender }
export { prerender }

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  console.log('index.page.server onBeforeRender')

  const dirs = loadData()

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
