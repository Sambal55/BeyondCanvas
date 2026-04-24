import { defineStore } from 'pinia'

export const useGuideStore = defineStore('guide', {
  state: () => ({
    isVisible: true,
  }),

  actions: {
    closeGuide() {
      // Once used then not show again (unless reload page)
      this.isVisible = false
    },
  },
})
