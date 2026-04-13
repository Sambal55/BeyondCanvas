<!--RowersView
View which has the painting Luncheon of the Boating Party by Renoir-->
<script setup lang="ts">
import rowerGrid from '@/data/json/rowerGrid.json'
import DebugGrid from '@/components/DebugGrid.vue'
import { usePaintingStore } from '@/stores/usePaintingStore'
const grid = rowerGrid

// set correct painting in store
usePaintingStore().load(rowerGrid)
</script>

<template>
  <DebugGrid :grid="grid"></DebugGrid>
</template>

<style scoped></style>
