import { createSSRApp, defineComponent, h, markRaw, reactive } from 'vue'
import Layout from './Layout.vue'
import type { Component, PageContext } from './types'
import { setPageContext } from './utils/usePageContext'
import { getHead } from './utils/useHead'

import ElementUi from 'element-plus'
import { createPinia } from 'pinia'

// css
import '@/assets/styles/main.scss'
import 'element-plus/dist/index.css'

// plugins
const plugins = import.meta.globEager('/src/plugins/*.ts')

export { createApp }

function createApp(pageContext: PageContext) {
  const { Page } = pageContext

  let rootComponent: Component
  const PageWithWrapper = defineComponent({
    data: () => ({
      Page: markRaw(Page),
      pageProps: markRaw(pageContext.pageProps || {})
    }),
    created() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      rootComponent = this
    },
    render() {
      return h(
        Layout,
        {},
        {
          default: () => {
            return h(this.Page, this.pageProps)
          }
        }
      )
    }
  })

  const app = createSSRApp(PageWithWrapper)
  app.use(getHead())
  app.use(ElementUi)

  const store = createPinia()
  app.use(store)

  for (const path in plugins) {
    plugins[path].default(app, (key: string, value: any) => {
      app.config.globalProperties['$' + key] = value
    })
  }

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext)
      rootComponent.Page = markRaw(pageContext.Page)
      rootComponent.pageProps = markRaw(pageContext.pageProps || {})
    }
  })

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext)

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive)

  return app
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum
): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum)
}
