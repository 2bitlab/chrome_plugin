<template>
  <a :class="{ active: pageContext?.urlPathname === $attrs.href }">
    <slot />
  </a>
</template>
<script lang="ts" setup>
import { usePageContext } from '@/renderer/utils/usePageContext'
const pageContext = usePageContext()
</script>
<style scoped>
a {
  padding: 2px 10px;
  margin-left: -10px;
}
a.active {
  background-color: #eee;
}
</style>
