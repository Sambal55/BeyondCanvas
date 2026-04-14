<script setup lang="ts">
import { watch } from 'vue'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { useAmbienceStore } from '@/stores/useAmbienceStore'
import { useSfxStore } from '@/stores/useSfxStore'
import {usePaintingStore} from '@/stores/usePaintingStore'

const grid = useGridVisibilityStore()
const ambience = useAmbienceStore()
const sfx = useSfxStore()
const painting = usePaintingStore()

watch(
  () => grid.list,
  (newVisible, oldVisible) => {
    const newlyVisible = newVisible.filter(id => !oldVisible.includes(id))
    const newlyHidden = oldVisible.filter(id => !newVisible.includes(id))

    // --- HANDLE NEWLY VISIBLE ---
    newlyVisible.forEach(id => {
      const cube = painting.cubes.find(c => c.id === id)
      if (cube) sfx.onCubeVisible(cube)
    })

    // --- HANDLE NEWLY HIDDEN ---
    newlyHidden.forEach(id => {
      const cube = painting.cubes.find(c => c.id === id)
      if (!cube) return

      const stillVisible = newVisible.some(vId => {
        const other = painting.cubes.find(c => c.id === vId)
        return other?.label === cube.label
      })

      if (!stillVisible) {
        sfx.onLabelHidden(cube.label)
      }
    })

    // --- HANDLE AMBIENCE ---
    const visibleZones = newVisible
      .map(id => painting.cubes.find(c => c.id === id)?.zone)
      .filter(Boolean)

    if (visibleZones.length > 0) {
      ambience.playZone(visibleZones[0])
    }
  },
  { deep: true }
)

</script>

<template>
  <p></p>
  <!-- No UI needed -->
</template>
