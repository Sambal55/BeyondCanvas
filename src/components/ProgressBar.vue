<script setup lang="ts">
import { computed } from 'vue'
import { usePaintingStore } from '@/stores/usePaintingStore'

const painting = usePaintingStore()

const total = computed(() => painting.importantCubes.length)
const seen = computed(() => painting.seenImportantCubeIds.size)
const progress = computed(() =>
  total.value === 0 ? 0 : (seen.value / total.value) * 100
)
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__fill" :style="{ width: `${progress}%` }">
      <h2 class="progress-label">{{ seen.valueOf() }} / {{ total.valueOf() }}</h2>    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  position: relative;
  width: 150px;
  border: 2px solid blue;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0; /* alleen boven/onder */

  background: #222;
}

.progress-bar__fill {
  height: 100%;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.25s ease;
}

.progress-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  color: yellow;
  pointer-events: none;
}

</style>
