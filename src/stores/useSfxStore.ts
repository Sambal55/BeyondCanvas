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
      // console.log(sound + " cube position x: " + cube.position.x + " cube.position y: " + cube.position.y)
      const audio = new Audio(`public/assets/audio/${sound}`)
      audio.volume = 1
      // console.log(audio.src)
      this.playedOnce.add(cube.id)
    },

    onCubeHidden(id: number) {
      // allow replay next time it enters
      this.playedOnce.delete(id)
    },
  },
})
