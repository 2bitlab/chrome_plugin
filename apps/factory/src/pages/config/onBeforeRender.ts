import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import type { PageContext } from '@/renderer/types'

import { useServicesHelper } from '@/renderer/utils/useServicesHelper'

import { serviceName } from '@/stores/pluginConfig'

export { onBeforeRender }

async function onBeforeRender(pageContext: PageContextBuiltIn & PageContext) {
  const servicesHelper = useServicesHelper()

  const { type, path_name } = pageContext.routeParams || {}

  console.log('config onBeforeRender', type, path_name)

  const configData = await servicesHelper(`${serviceName}/getData`, {
    type,
    path_name
  })

  console.log('config onBeforeRender configData', configData)

  return {
    pageContext: {
      pageProps: {
        type,
        path_name,
        configData
      },
      documentProps: {
        title: `【${type}】${path_name}`
      }
    }
  }
}
