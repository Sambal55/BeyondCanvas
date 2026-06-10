import { defineStore } from 'pinia'

export const useGuideStore = defineStore('guide', {
  state: () => ({
    isVisible: true, // Always visible
  }),

  actions: {
    openGuide() {
      this.isVisible = true
    },
    closeGuide() {
      this.isVisible = false
    },
  },
})
