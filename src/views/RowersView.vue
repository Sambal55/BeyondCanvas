<!--RowersView
View which has the painting Luncheon of the Boating Party by Renoir-->
<script setup lang="ts">
import rowers from '@/assets/images/rowers.jpg'
import { observeGridCubes } from '@/utils/observerGridCubes'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { onMounted, watch } from 'vue'
import rowerGridCubes from '@/data/rowerGrid.json'

const cubeSize = rowerGridCubes.cubeSize

const cubes = rowerGridCubes.cubes.map((c) => ({
  ...c,
  left: c.position.x * cubeSize.width,
  top: c.position.y * cubeSize.height,
}))
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
  <div class="image-wrapper">
    <img :src="rowers" alt="Seine" width="2000" height="1441" />
    <div
      v-for="cube in cubes"
      :key="cube.id"
      class="cube"
      :data-id="cube.id"
      :style="{
        left: cube.left + 'px',
        top: cube.top + 'px',
        width: cubeSize.width + 'px',
        height: cubeSize.height + 'px',
      }"
    />
  </div>
</template>

<style scoped>
.image-wrapper {
  position: relative;
}

.cube {
  position: absolute;
  border: 1px solid red; /* debug */
  pointer-events: none;
}
</style>
