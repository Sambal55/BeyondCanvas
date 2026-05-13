import { defineStore } from 'pinia'
import { ambienceMap } from '@/data/mappings/ambienceMap'
import { fadeOutAndStop, fadeVolume } from '@/utils/audioFade'
import { audioConfig } from '@/config/audioConfig'
import { AmbienceZone } from '@/types/grid'

export const useAmbienceStore = defineStore('ambience', {
  actions: {
    playZone(zone: AmbienceZone) {
      if (this.currentZone === zone) return
      const targetVolume = audioConfig.ambienceVolume[zone]
      this.currentVolume = targetVolume

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
          // Pause old audio when volume levels reach 0
          oldAudio.pause()
        })
      }

      let cancelled = false
      ;(newAudio as any)._cancelPending = () => {
        cancelled = true
      }

      // Dan pas de listener, zodat hij cancelled kent via closure
      newAudio.addEventListener(
        'canplay',
        () => {
          if (!cancelled) {
            fadeVolume(newAudio, targetVolume, audioConfig.fadeDuration.crossfade)
          }
        },
        { once: true },
      )

      this.audio = newAudio
      this.currentZone = zone
    },

    // Reduce and fade ambience volume for SFX
    duck() {
      if (!this.audio) return
      fadeVolume(
        this.audio,
        audioConfig.ambienceDuckedVolume,
        audioConfig.fadeDuration.duckDuration,
      )
    },

    // Restore and unfade ambience volume after SFX
    restore() {
      if (!this.audio) return
      fadeVolume(this.audio, this.currentVolume, audioConfig.fadeDuration.duckDuration)
    },

    stop() {
      if (!this.audio) return

      if ((this.audio as any)._cancelPending) {
        ;(this.audio as any)._cancelPending()
      }

      fadeOutAndStop(this.audio, audioConfig.fadeDuration.crossfade, () => {
        this.audio = null
        this.currentZone = null
      })
    },
  },

  state: () => ({
    audio: null as HTMLAudioElement | null,
    currentZone: null as AmbienceZone | null, // So we can use zone specific volume also in restore function
    currentVolume: 0 as number,
  }),
})
