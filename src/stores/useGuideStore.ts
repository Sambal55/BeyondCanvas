import { defineStore } from 'pinia'

export const useGuideStore = defineStore('guide', {
  state: () => ({
    isVisible: false,
  }),

  actions: {
    openGuide() {
      if (localStorage.getItem('guideSeenBefore')) return
      this.isVisible = true
    },
    closeGuide() {
      this.isVisible = false
      localStorage.setItem('guideSeenBefore', 'true')
    },
  },
})
