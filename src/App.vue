<script setup lang="ts">
import { RouterView } from 'vue-router'
import GridOrchestrator from '@/system/GridOrchestrator.vue'
</script>

<template>
  <GridOrchestrator />
  <main>
    <RouterView />
  </main>
</template>
