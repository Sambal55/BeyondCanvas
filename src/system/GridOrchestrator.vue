<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { useAmbienceStore } from '@/stores/useAmbienceStore'
import { useSfxStore } from '@/stores/useSfxStore'
import { usePaintingStore } from '@/stores/usePaintingStore'
import { useGuideStore } from '@/stores/useGuideStore'
import { AmbienceZone } from '@/types/grid'

const grid = useGridVisibilityStore()
const ambience = useAmbienceStore()
const sfx = useSfxStore()
const painting = usePaintingStore()
const guide = useGuideStore()
const { isVisible } = storeToRefs(guide)

// Responds to changes in visible cubes: triggers SFX and updates ambience.
// Triggers SFX for newly visible cubes, stops SFX for labels that are no longer visible,
// and updates the ambience zone based on the first visible cube's zone.
function handleVisibleCubes(newVisible: number[], oldVisible: number[]) {
  const newlyVisible = newVisible.filter((id) => !oldVisible.includes(id))
  const newlyHidden = oldVisible.filter((id) => !newVisible.includes(id))

  // --- HANDLE NEWLY VISIBLE ---
  newlyVisible.forEach((id) => {
    const cube = painting.cubeById(id)
    if (cube) {
      sfx.onCubeVisible(cube)
    }
  })

  // --- HANDLE NEWLY HIDDEN ---
  newlyHidden.forEach((id) => {
    const cube = painting.cubeById(id)
    if (!cube) return

    // Only stop the label SFX if no other visible cube shares the same label
    const stillVisible = newVisible.some((vId) => {
      const other = painting.cubeById(vId)
      return other?.label === cube.label
    })

    if (!stillVisible && cube.label !== null) {
      sfx.onLabelHidden(cube.label)
    }
  })

  // --- HANDLE AMBIENCE ---
  // Collect all zones from currently visible cubes and play the first one
  const visibleZones = newVisible
    .map((id) => painting.cubeById(id)?.zone)
    .filter((z): z is AmbienceZone => !!z)

  if (visibleZones.length > 0) {
    // Zones are spatially clustered, so the first visible zone is always the dominant one
    ambience.playZone(visibleZones[0])
  }
}

// Watch the list of visible cube IDs and react to changes,
// but skip processing while the guide overlay is open.
watch(
  () => grid.list,
  (newVisible, oldVisible) => {
    if (guide.isVisible) return

    handleVisibleCubes(newVisible, oldVisible)
  },
  { deep: true },
)

// When the guide closes, treat all currently visible cubes as freshly visible
// so SFX and ambience are triggered as if entering the scene for the first time.
watch(isVisible, (visible) => {
  if (!visible) {
    handleVisibleCubes(grid.list, [])
  }
})
</script>

<template>
  <!-- No UI needed -->
  <div />
</template>
