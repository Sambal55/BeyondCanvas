import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GridCube } from '@/types/grid'

export const useImportantStore = defineStore('importantStore', () => {
  const activeCube = ref<GridCube | null>(null)
  const isVisible = ref(false)

  function setImportantCube(cube: GridCube) {
    if (!cube) return clearImportantCube()

    // Only trigger haptics when a NEW important cube appears
    if (!activeCube.value || activeCube.value.id !== cube.id) {
      triggerHaptics()
    }

    activeCube.value = cube
    isVisible.value = true
  }

  function clearImportantCube() {
    activeCube.value = null
    isVisible.value = false
  }

  function triggerHaptics() {
    if (navigator.vibrate) {
      console.log('vibrate 500')
      navigator.vibrate(500)
    }
  }

  return {
    activeCube,
    isVisible,
    setImportantCube,
    clearImportantCube
  }
})
