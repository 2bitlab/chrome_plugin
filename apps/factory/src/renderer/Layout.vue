<template>
  <div class="flex w-screen">
    <div class="flex flex-col flex-shrink-0 border-r-2 border-gray-100">
      <a href="/" class="mt-10 mb-5 mx-4">
        <img
          src="https://assets.belloai.com/staging/config/menu_logo.png"
          height="64"
          width="64"
        />
      </a>
      <el-menu
        class="flex-1 overflow-auto"
        :default-active="pageContext?.urlPathname"
        @select="handleSelect"
      >
        <template v-for="(item, i) in pluginConfigStore.menuData" :key="i">
          <el-menu-item-group v-if="item.children" :title="item.label">
            <el-menu-item
              v-for="(childrenItem, j) in item.children"
              :key="j"
              :index="childrenItem.href"
            >
              {{ childrenItem.label }}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item v-else-if="item.href" :key="j" :index="item.href">
            {{ item.label }}
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="min-h-screen p-5 pb-12 transition ease-in content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { navigate } from 'vite-plugin-ssr/client/router'
import { usePageContext } from '@/renderer/utils/usePageContext'

import { usePluginConfigStore } from '@/stores/pluginConfig'

const pluginConfigStore = usePluginConfigStore()
const pageContext = usePageContext()

const handleSelect = (key: string) => {
  navigate(key)
}
</script>
