import { defineStore } from 'pinia'

export const useGuideStore = defineStore('guide', {
  state: () => ({
    isVisible: false,
  }),

  actions: {
    openGuide() {
      console.log('open')
      this.isVisible = true
    },
    closeGuide() {
      this.isVisible = false
    },
  },
})
