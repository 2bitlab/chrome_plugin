<template>
  <div>build</div>

  <div>Saas</div>
  <div>{{ saasDirs }}</div>

  <div>私有化</div>
  <div>{{ customDirs }}</div>

  <div>new</div>
  <div>
    <ElInput />
  </div>
</template>

<script lang="ts" setup>
import { ElInput } from 'element-plus'
defineProps(['saasDirs', 'customDirs'])
</script>
