<template>
  <div>build</div>

  <div>new</div>
  <div>
    <ObjForm v-model="formData" :define="formDefine" />

    <ElButton @click="saveConfig">创建</ElButton>
  </div>

  <div>{{ formData }}</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { formDefine } from './formDefine'
import { usePluginConfigStore } from '@/stores/pluginConfig'

const props = defineProps(['type', 'path_name', 'configData'])

const pluginConfigStore = usePluginConfigStore()

const initFormData = ({
  configData,
  path_name
}: {
  configData: any
  path_name: string
}) => {
  const { manifest } = configData || {}
  return {
    path_name: path_name,
    manifest: manifest || {}
  }
}

const formData = ref(
  initFormData({ configData: props.configData, path_name: props.path_name })
)

watch(
  () => {
    const { configData, path_name } = props
    return {
      configData,
      path_name
    }
  },
  newValue => {
    console.log('watch newValue', newValue)
    if (newValue) {
      formData.value = initFormData({
        configData: newValue.configData,
        path_name: newValue.path_name
      })
    }
  }
)

const saveConfig = async () => {
  console.log('saveConfig', formData.value)
  await pluginConfigStore.saveNew({
    type: props.type,
    ...formData.value
  })
}
</script>

<script lang="ts">
export { onBeforeRender } from './onBeforeRender'
</script>
