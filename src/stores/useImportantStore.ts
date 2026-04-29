import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GridCube } from '@/types/grid'
import { speak } from '@/utils/TTShelper'
import { useTTSStore } from './useTTSStore'
import { usePaintingStore } from './usePaintingStore'

export const useImportantStore = defineStore('importantStore', () => {
  const activeCube = ref<GridCube | null>(null)
  const isVisible = ref(false)

  const lastSpokenAt = new Map<number, number>()
  // When you go over it again, you will not start it for another 10 seconds
  const COOLDOWN_MS = 10_000

  function setImportantCube(cube: GridCube) {
    if (!cube) return clearImportantCube()

    const paintingStore = usePaintingStore()
    const fullCube = paintingStore.cubeById(cube.id)
    if (!fullCube?.importantCubeInfo) return

    const lastTime = lastSpokenAt.get(cube.id) ?? 0
    const isNew = Date.now() - lastTime > COOLDOWN_MS
    if (isNew) {
      lastSpokenAt.set(cube.id, Date.now())

      const tts = useTTSStore()
      if (tts.enabled) {
        const parts = [
          fullCube.importantCubeInfo.title,
          fullCube.importantCubeInfo.description,
        ].filter(Boolean)
        if (parts.length) speak(parts.join('. '))
      }

      triggerHaptics()
    }

    activeCube.value = cube
    isVisible.value = true
  }

  function clearImportantCube() {
    activeCube.value = null
    isVisible.value = false
    speechSynthesis.cancel()
  }

  function triggerHaptics() {
    if (navigator.vibrate) {
      navigator.vibrate(500)
    }
  }

  return {
    activeCube,
    isVisible,
    setImportantCube,
    clearImportantCube,
  }
})
