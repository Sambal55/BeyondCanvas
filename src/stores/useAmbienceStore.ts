import { defineStore } from 'pinia'
import { ambienceMap } from '@/data/mappings/ambienceMap'


export const useAmbienceStore = defineStore('ambience', {
  state: () => ({
    audio: null as HTMLAudioElement | null,
    currentZone: null as string | null,
    baseVolume: 0.6,
    duckedVolume: 0.25,
  }),

  actions: {
    playZone(zone: string) {
      if (this.currentZone === zone) return
      this.currentZone = zone

      if (this.audio) {
        this.audio.pause()
        this.audio = null
      }

      const src = `public/assets/audio/${ambienceMap[zone]}`
      const audio = new Audio(src)
      audio.loop = true
      audio.volume = this.baseVolume
      audio.play()

      this.audio = audio
    },

    duck() {
      if (!this.audio) return
      this.fadeVolume(this.audio, this.duckedVolume, 150)
    },

    restore() {
      if (!this.audio) return
      this.fadeVolume(this.audio, this.baseVolume, 300)
    },

    fadeVolume(audio: HTMLAudioElement, target: number, duration = 200) {
      const start = audio.volume
      const diff = target - start
      const steps = 20
      const stepTime = duration / steps

      let i = 0
      const interval = setInterval(() => {
        i++
        audio.volume = start + diff * (i / steps)
        if (i >= steps) clearInterval(interval)
      }, stepTime)
    },
  },
})
