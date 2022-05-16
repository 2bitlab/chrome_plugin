<template>
  <div>build</div>

  <div>Saas</div>
  <div>{{ saasDirs }}</div>

  <div>私有化</div>
  <div>{{ customDirs }}</div>

  <div>new</div>
  <div>
    <el-input />
  </div>
</template>

<script lang="ts" setup>
defineProps(['saasDirs', 'customDirs'])
</script>
