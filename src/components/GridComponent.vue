<script setup lang="ts">
import { onMounted } from 'vue'
import { observeGridCubes } from '@/utils/observerGridCubes'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { usePaintingStore } from '@/stores/usePaintingStore'
import { Grid } from '@/types/grid'
import ImportantPopup from '@/components/ImportantPopup.vue'

const { grid } = defineProps<{
  grid: Grid
}>()
usePaintingStore().load(grid)

// calculate cube positions
const positionedCubes = grid.cubes.map((c) => ({
  ...c,
  left: c.position.x * grid.cubeSize.width,
  top: c.position.y * grid.cubeSize.height,
}))

const visibility = useGridVisibilityStore()

onMounted(() => {
  observeGridCubes()
})
</script>

<template>
  <ImportantPopup />
  <div class="scroll-container">
    <div class="image-wrapper scaled">
      <img
        :src="grid.painting.imagePath"
        :width="grid.painting.paintingSize.width"
        :height="grid.painting.paintingSize.height"
        :alt="'Kunstbeleving van ' + grid.painting.name"
      />

      <div
        v-for="cube in positionedCubes"
        :key="cube.id"
        class="cube"
        :class="{ visible: visibility.list.includes(cube.id) }"
        :data-id="cube.id"
        :data-x="cube.position.x"
        :data-y="cube.position.y"
        :style="{
          left: cube.left + 'px',
          top: cube.top + 'px',
          width: grid.cubeSize.width + 'px',
          height: grid.cubeSize.height + 'px',
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  width: 100%;
  height: 100vh;
  overflow: auto; /* this makes it a scroll+clip container */
}

.image-wrapper {
  position: relative;
  display: inline-block;
  transform: scale(1.3);
  transform-origin: top left;
}

.image-wrapper img {
  display: block;
}

.cube {
  position: absolute;
  border: 1px solid transparent;
  pointer-events: none;
}

html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}
</style>
