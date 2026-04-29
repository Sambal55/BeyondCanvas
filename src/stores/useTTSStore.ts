import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTTSStore = defineStore('tts', () => {
  const enabled = ref(true)

  function toggle() {
    enabled.value = !enabled.value
    if (!enabled.value) speechSynthesis.cancel()
  }

  return { enabled, toggle }
})
