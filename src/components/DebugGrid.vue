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
  <div class="scroll-container">
    <div class="image-wrapper scaled">
      <!--    TODO switch alt to more descriptive description-->
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
        :data-x="cube.position.x"
        :data-y="cube.position.y"
        :style="{
        left: cube.left + 'px',
        top: cube.top + 'px',
        width: '100px',
        height: '100px',
      }"
      >
      <span style="color: greenyellow" class="coords"
      >{{ cube.position.x }}, {{ cube.position.y }}</span
      >
      </div>
    </div>
  </div>

</template>

<style scoped>
.scroll-container {
  width: 100%;          /* or whatever viewport-sized bounds you want */
  height: 100vh;
  overflow: auto;       /* this makes it a scroll+clip container */
  border: 3px solid blue;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  transform: scale(1.75);
  transform-origin: top left;
  /* give the container real layout space matching the scaled size */
  /* e.g. if painting is 800x600, scaled 1.75x → 1400x1050 */
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
  border-color: magenta;
}

html, body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}
</style>
