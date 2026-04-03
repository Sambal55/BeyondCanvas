<!--RowersView
View which has the painting Luncheon of the Boating Party by Renoir-->
<script setup lang="ts">
import { observeGridCubes } from '@/utils/observerGridCubes'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { onMounted, watch } from 'vue'
import rowerGrid from '@/data/json/rowerGrid.json'
import DebugGrid from '@/components/DebugGrid.vue'

const grid = rowerGrid

// all cubes
// const positionedCubes = rowerGridCubes.cubes.map((c) => ({
//   ...c,
//   left: c.position.x * cubeSize.width,
//   top: c.position.y * cubeSize.height,
// }))
// cubes which are visible on screen
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
.image-wrapper {
  position: relative;
  display: inline-block;
}

.image-wrapper img {
  display: block;
}

.cube {
  position: absolute;
  border: 1px solid transparent;
  pointer-events: none;
}

.cube.visible {
  border-color: red;
}
</style>
