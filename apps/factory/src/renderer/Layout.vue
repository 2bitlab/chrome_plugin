<template>
  <div class="flex mx-auto max-w-7xl">
    <div class="flex flex-col flex-shrink-0 border-r-2 border-gray-100 p-5">
      <a href="/" class="logo">
        <img src="./logo.svg" height="64" width="64" />
      </a>
      <template v-for="(item, i) in menuData" :key="i">
        <Link :href="item.href">{{ item.label }}</Link>
      </template>
    </div>
    <div class="min-h-screen p-5 pb-12 transition ease-in content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Link from '@/components/Link.vue'
import menuData from './menu'
</script>

<style scoped>
.logo {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
