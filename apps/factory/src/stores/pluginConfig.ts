import { defineStore } from 'pinia'

import { useServicesHelper } from '@/renderer/utils/useServicesHelper'

export const serviceName = 'PluginConfig'

export const usePluginConfigStore = defineStore(serviceName, {
  state: () => {
    return {
      saasDirs: [],
      customDirs: [],
      dataMap: {}
    }
  },
  getters: {
    menuData: state => {
      console.log(
        'usePluginConfigStore getters menuData',
        'state.saasDirs:',
        state.saasDirs,
        'state.customDirs:',
        state.customDirs
      )

      const childrenSaaS = state.saasDirs?.map(item => {
        return {
          label: item,
          href: `/config/saas/${item}`
        }
      })
      const childrenCustom = state.customDirs?.map(item => {
        return {
          label: item,
          href: `/config/custom/${item}`
        }
      })

      console.log(
        'usePluginConfigStore getters menuData',
        childrenSaaS,
        childrenCustom
      )
      const menuData = [
        {
          label: 'SaaS',
          children: childrenSaaS
        },
        {
          label: '私有化',
          children: childrenCustom
        }
      ]

      return menuData
    }
  },
  actions: {
    async fetchDirs() {
      const servicesHelper = useServicesHelper()

      const resData = await servicesHelper(`${serviceName}/loadData`)
      console.log('usePluginConfigStore fetchDirs resData', resData)

      const { saasDirs, customDirs } = resData
      console.log('usePluginConfigStore fetchDirs', saasDirs, customDirs)

      this.saasDirs = saasDirs || []
      this.customDirs = customDirs || []
    },
    async saveNew(data: any) {
      const servicesHelper = useServicesHelper()

      await servicesHelper(`${serviceName}/save`, data)
      await this.fetchDirs()
    }
  }
})
