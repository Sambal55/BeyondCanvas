<!--SeineView
View which has the painting La Grenouillèrey by Renoir-->
<script setup lang="ts">
import { observeGridCubes } from '@/utils/observerGridCubes'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { onMounted, watch } from 'vue'
import seineGrid from '@/data/json/seineGrid.json'
import DebugGrid from '@/components/DebugGrid.vue'

const grid = seineGrid


const visibility = useGridVisibilityStore()
onMounted(() => {
  observeGridCubes()
})

watch(
  () => visibility.list,
  (newList) => {
    console.log('Visible cubes:', newList)
  },
  { deep: true },
)
</script>

<template>
  <DebugGrid :grid="grid"></DebugGrid>
</template>

<style scoped>
</style>
