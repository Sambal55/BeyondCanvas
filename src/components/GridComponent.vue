<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { observeGridCubes } from '@/utils/observerGridCubes'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { usePaintingStore } from '@/stores/usePaintingStore'
import { Grid } from '@/types/grid'
import ImportantPopup from '@/components/ImportantPopup.vue'
import { applyTouchScroll, detectScrollEdge } from '@/utils/scrollHelpers'
import { speak } from '@/utils/TTShelper'
import { useGuideStore } from '@/stores/useGuideStore'
const { grid } = defineProps<{
  grid: Grid
}>()
usePaintingStore().load(grid)
const guide = useGuideStore()

// calculate cube positions
const positionedCubes = grid.cubes.map((c) => ({
  ...c,
  left: c.position.x * grid.cubeSize.width,
  top: c.position.y * grid.cubeSize.height,
}))

const visibility = useGridVisibilityStore()

onMounted(() => {
  observeGridCubes()
  const container = document.querySelector('.scroll-container') as HTMLElement
  applyTouchScroll(container)
  if (guide.isVisible) return
  detectScrollEdge(container, (edge) => {
    if (edge === 'top') {
      speak('Eind boven')
    } else if (edge === 'bottom') {
      speak('Eind beneden')
    } else if (edge === 'left') {
      speak('Eind links')
    } else if (edge === 'right') {
      speak('Eind rechts')
    }
  })
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
  height: 75vh;
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
