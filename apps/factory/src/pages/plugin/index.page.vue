<template>
  <div>build</div>

  <div>Saas</div>
  <div>{{ saasDirs }}</div>

  <div>私有化</div>
  <div>{{ customDirs }}</div>

  <div>new</div>
  <div>
    <ObjForm v-model="formData" :define="formDefine" />

    <ElButton @click="saveConfig">创建</ElButton>
  </div>

  <div>{{ formData }}</div>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'

import { ref, unref } from 'vue'

import clientServices from '@server/services/client'

defineProps(['saasDirs', 'customDirs'])

const formDefine = {
  path_name: '客户名',
  'manifest.name': '插件名',
  'manifest.description': '插件描述文案',
  'manifest.action.default_title': '图标悬停时的标题',
  'manifest.action.default_icon': '浏览器栏上的图标',
  'manifest.icons': {
    label: '扩展程序内的图标',
    props: {
      type: 'textarea',
      placeholder: `${JSON.stringify(
        {
          '16': '图片地址',
          '24': '图片地址'
        },
        undefined,
        2
      )}`
    }
  }
}

const formData = ref({
  path_name: '1231',
  manifest: {
    name: '1231'
  }
})

const saveConfig = async () => {
  console.log('saveConfig', formData.value)

  await clientServices('PluginConfig/save', formData)
}
</script>
