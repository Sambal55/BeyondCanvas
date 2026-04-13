import { defineStore } from 'pinia'
import type { Grid } from '@/types/grid'

export const usePaintingStore = defineStore('painting', {
  state: () => ({
    grid: null as Grid | null,
  }),

  actions: {
    load(grid: Grid) {
      this.grid = grid
    },
  },

  getters: {
    cubes: (state) => state.grid?.cubes ?? [],
    painting: (state) => state.grid?.painting ?? null,
  },
})
