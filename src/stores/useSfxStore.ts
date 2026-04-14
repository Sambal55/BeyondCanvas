import { defineStore } from 'pinia'
import { eventSoundMap } from '@/data/mappings/eventSoundMap'
import {GridCube} from '@/types/grid'

export const useSfxStore = defineStore('sfx', {
  state: () => ({
    playedOnce: new Set<number>(), // cube IDs already played
  }),

  actions: {
    onCubeVisible(cube: GridCube) {
      if (this.playedOnce.has(cube.id)) return

      const sound = eventSoundMap[cube.label]
      if (!sound) return

      const src = `public/assets/audio/${sound}` // FIXED PATH
      const audio = new Audio(src)
      audio.volume = 1

      audio.play().catch(err => {
        console.warn("SFX failed to play:", err)
      })

      this.playedOnce.add(cube.id)
    },


    onCubeHidden(id: number) {
      // allow replay next time it enters
      this.playedOnce.delete(id)
    },
  },
})
