import { defineStore } from 'pinia'
import type { Grid, GridCube } from '@/types/grid'

export const usePaintingStore = defineStore('painting', {
  state: () => ({
    grid: null as Grid | null,
    seenImportantCubeIds: new Set<number>(),
  }),

  actions: {
    markCubeSeen(cube: GridCube) {
      if (!cube.importantCubeInfo) return
      this.seenImportantCubeIds.add(cube.id)
    },
    load(grid: Grid) {
      this.grid = grid
      // Reset with new painting
      this.seenImportantCubeIds.clear()
    }
  },

  getters: {
    importantCubes: (state) => state.grid?.cubes.filter(c => c.importantCubeInfo !== null) ?? [],

    cubes: (state) => state.grid?.cubes ?? [],
    painting: (state) => state.grid?.painting ?? null,
    // You can call cubes, with index starting at 0 and increments by 1
    cubeById: (state) => {
      if (!state.grid) return () => null
      const map = Object.fromEntries(state.grid.cubes.map((c) => [c.id, c]))
      return (id: number) => map[id] ?? null
    },
  },
})
