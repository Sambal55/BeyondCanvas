<script setup lang="ts">
import { onMounted } from 'vue'
import { observeGridCubes } from '@/utils/observerGridCubes'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { Grid } from '@/types/grid'

const { grid } = defineProps<{
  grid: Grid
}>()

// calculate cube positions
const positionedCubes = grid.cubes.map((c) => ({
  ...c,
  //TODO maybe its cleaner if width and height have a final const
  left: c.position.x * 100,
  top: c.position.y * 100,
}))

const visibility = useGridVisibilityStore()

onMounted(() => {
  observeGridCubes()
})
</script>

<template>
  <div class="image-wrapper">
    <!--    TODO maybe switch alt to more descriptive description-->
    <img
      :src="grid.painting.imagePath"
      :width="grid.painting.paintingSize.width"
      :height="grid.painting.paintingSize.height"
      :alt="grid.painting.name"
    />

    <div
      v-for="cube in positionedCubes"
      :key="cube.id"
      class="cube"
      :class="{ visible: visibility.list.includes(cube.id) }"
      :data-id="cube.id"
      :style="{
        left: cube.left + 'px',
        top: cube.top + 'px',
        width: '100px',
        height: '100px',
      }"
    />
  </div>
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
