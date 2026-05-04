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

function handleVisibleCubes(newVisible: number[], oldVisible: number[]) {
  const newlyVisible = newVisible.filter((id) => !oldVisible.includes(id))
  const newlyHidden = oldVisible.filter((id) => !newVisible.includes(id))

  // --- HANDLE NEWLY VISIBLE ---
  newlyVisible.forEach((id) => {
    const cube = painting.cubeById(id)
    if (cube) sfx.onCubeVisible(cube)
  })

  // --- HANDLE NEWLY HIDDEN ---
  newlyHidden.forEach((id) => {
    const cube = painting.cubeById(id)
    if (!cube) return

    const stillVisible = newVisible.some((vId) => {
      const other = painting.cubeById(vId)
      return other?.label === cube.label
    })

    if (!stillVisible && cube.label !== null) {
      // ← null guard
      sfx.onLabelHidden(cube.label)
    }
  })

  // --- HANDLE AMBIENCE ---
  const visibleZones = newVisible
    .map((id) => painting.cubeById(Number(id))?.zone)
    .filter((z): z is AmbienceZone => !!z)

  if (visibleZones.length > 0) {
    ambience.playZone(visibleZones[0])
  }
}

watch(
  () => grid.list,
  (newVisible, oldVisible) => {
    if (guide.isVisible) return

    handleVisibleCubes(newVisible, oldVisible)
  },
  { deep: true },
)

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
