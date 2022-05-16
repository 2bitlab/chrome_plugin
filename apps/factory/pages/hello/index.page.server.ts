import type { PageContextBuiltIn } from 'vite-plugin-ssr'

export { onBeforeRender }
export { prerender }

async function onBeforeRender(pageContext: PageContextBuiltIn) {
  console.log('index.page.server onBeforeRender')
  const { name } = pageContext.routeParams
  const pageProps = { name }
  return {
    pageContext: {
      pageProps
    }
  }
}

function prerender() {
  console.log('index.page.server prerender')
  const names = ['evan', 'rom', 'alice', 'jon', 'eli']
  const urls = names.map(name => `/hello/${name}`)
  return urls
}
