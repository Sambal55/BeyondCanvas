import { defineStore } from 'pinia'

export const useGridVisibilityStore = defineStore('gridVisibility', {
  state: () => ({
    visibleCubes: new Set<number>()
  }),

  actions: {
    add(id: number) {
      this.visibleCubes.add(id)
    },
    remove(id: number) {
      this.visibleCubes.delete(id)
    }
  },

  getters: {
    list: (state) => Array.from(state.visibleCubes)
  }
})
