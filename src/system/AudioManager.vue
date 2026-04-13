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

    // handle SFX
    newlyVisible.forEach(id => {
      const cube = painting.cubes.find(c => c.id === id)
      if (cube) sfx.onCubeVisible(cube)
    })

    newlyHidden.forEach(id => sfx.onCubeHidden(id))

    // handle ambience
    const visibleZones = newVisible
      .map(id => painting.cubes.find(c => c.id === id)?.zone)
      .filter(Boolean) as string[]

    if (visibleZones.length > 0) {
      const zone = visibleZones[0] // or pick most frequent
      ambience.playZone(zone)
    }
  },
  { deep: true }
)
</script>

<template>
  <p></p>
  <!-- No UI needed -->
</template>
