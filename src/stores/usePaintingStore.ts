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
    // You can call cubes, with index starting at 0 and increments by 1
    cubeById: (state) => {
      if (!state.grid) return () => null
      const map = Object.fromEntries(state.grid.cubes.map(c => [c.id, c]))
      return (id: number) => map[id] ?? null
    }
  },
})
