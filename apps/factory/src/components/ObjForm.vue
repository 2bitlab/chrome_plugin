<template>
  <div>
    <template v-for="formItem in formItems" :key="formItem.key">
      <div>{{ formItem.label }}</div>
      <component
        :is="formItem.is"
        v-model="formData[formItem.key]"
        v-bind="formItem.componentProps"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { isString, isObject, get, set } from 'lodash'
import { readonly, reactive, watch, computed } from 'vue'

interface DefineFormItem {
  label: string
  is?: string
  props?: any
}
interface Define {
  [key: string]: DefineFormItem | string
}

const props = defineProps<{
  define: Define
  modelValue: any
}>()
const emits = defineEmits(['update:modelValue'])

const formData: any = reactive({})

const objKeys = computed(() => Object.keys(props.define))
const formItems = computed(() => {
  return objKeys.value.map(key => {
    const formItemDefine: DefineFormItem | string = props.define[key]
    let is
    let componentProps
    let label = ''
    if (isString(formItemDefine)) {
      label = formItemDefine
    } else if (isObject(formItemDefine)) {
      ;({ label, is, props: componentProps } = formItemDefine)
    }

    return {
      label,
      key,
      is: is || 'ElInput',
      componentProps: componentProps || {}
    }
  })
})

const modelValue = readonly(props.modelValue)

watch(formData, newValue => {
  console.log('formData watch', newValue)

  const newObj = Object.keys(newValue).reduce((obj, key) => {
    const val = newValue[key]
    set(obj, key, val)

    return obj
  }, {})

  // console.log('formData watch JSON.stringify(newObj)', JSON.stringify(newObj))
  // console.log(
  //   'formData watch JSON.stringify(modelValue)',
  //   JSON.stringify(modelValue)
  // )
  // console.log(
  //   'formData watch JSON.stringify(newObj) !== JSON.stringify(modelValue)',
  //   JSON.stringify(newObj) !== JSON.stringify(modelValue)
  // )
  if (JSON.stringify(newObj) !== JSON.stringify(modelValue)) {
    emits('update:modelValue', newObj)
  }
})

watch(
  modelValue,
  newValue => {
    // console.log('modelValue watch', newValue)

    objKeys.value.map(key => {
      const value = get(newValue, key)
      formData[key] = value
    })
  },
  {
    immediate: true
  }
)
</script>
