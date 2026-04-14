import { defineStore } from 'pinia'
import { ambienceMap } from '@/data/mappings/ambienceMap'
import { fadeOutAndStop, fadeVolume } from '@/utils/audioFade'
import { audioConfig } from '@/config/audioConfig'

export const useAmbienceStore = defineStore('ambience', {
  state: () => ({
    audio: null as HTMLAudioElement | null,
    currentZone: null as string | null,
  }),

  actions: {
    playZone(zone: string) {
      if (this.currentZone === zone) return

      const newSrc = `${import.meta.env.BASE_URL}assets/audio/${ambienceMap[zone]}`
      const newAudio = new Audio(newSrc)
      newAudio.loop = true
      // Volume fades in later
      newAudio.volume = 0
      newAudio.play()

      // If an old ambience is playing, fade it out
      if (this.audio) {
        const oldAudio = this.audio

        fadeVolume(oldAudio, 0, audioConfig.fadeDuration.crossfade, () => {
          oldAudio.pause()
        })
      }

      // Fade in the new ambience
      fadeVolume(newAudio, audioConfig.ambienceBaseVolume, audioConfig.fadeDuration.crossfade)

      // Replace reference
      this.audio = newAudio
      this.currentZone = zone
    },

    // Reduce and fade ambience volume for SFX
    duck() {
      if (!this.audio) return
      fadeVolume(this.audio, audioConfig.ambienceDuckedVolume, audioConfig.fadeDuration.duckDuration)
    },

    // Restore and unfade ambience volume after SFX
    restore() {
      if (!this.audio) return
      fadeVolume(this.audio, audioConfig.ambienceBaseVolume, audioConfig.fadeDuration.duckDuration)
    },

    stop() {
      if (!this.audio) return

      fadeOutAndStop(this.audio, audioConfig.fadeDuration.crossfade, () => {
        this.audio = null
        this.currentZone = null
      })
    },
  },
})
