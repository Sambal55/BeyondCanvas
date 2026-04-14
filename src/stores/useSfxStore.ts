import { defineStore } from 'pinia'
import { eventSoundMap } from '@/data/mappings/eventSoundMap'
import { GridCube } from '@/types/grid'
import { useAmbienceStore } from '@/stores/useAmbienceStore'
import { fadeVolume, fadeOutAndStop } from '@/utils/audioFade'
import {audioConfig} from '@/config/audioConfig'

export const useSfxStore = defineStore('sfx', {
  state: () => ({
    // If label SFX is already playing, not another instance of that same label should be started
    playedLabels: new Set<string>(),
    // Keeps track of current playing SFX audio(s)
    playingAudio: new Map<string, HTMLAudioElement>(),
  }),

  actions: {
    onCubeVisible(cube: GridCube) {
      const label = cube.label
      if (this.playedLabels.has(label)) return

      const sounds = eventSoundMap[label]
      if (!sounds || sounds.length === 0) return

      // pick a random sound from the array
      const file = sounds[Math.floor(Math.random() * sounds.length)]

      const src = `${import.meta.env.BASE_URL}assets/audio/${file}`
      const audio = new Audio(src)
      audio.volume = audioConfig.sfxBaseVolume

      const ambience = useAmbienceStore()
      // Duck ambience before making SFX sound
      ambience.duck()
      audio.play().catch((err) => console.warn('SFX failed:', err))

      // store reference
      this.playingAudio.set(label, audio)

      audio.onended = () => {
        ambience.restore()
        this.playingAudio.delete(label)
      }

      this.playedLabels.add(label)
    },

    onLabelHidden(label: string) {
      const audio = this.playingAudio.get(label)
      if (!audio) return

      fadeVolume(audio, 0, audioConfig.fadeDuration.sfxFadeOut, () => {
        audio.pause()
        audio.currentTime = 0
        this.playingAudio.delete(label)
      })

      this.playedLabels.delete(label)
    },
    stopAll() {
      this.playedLabels.clear()

      // Stop all audios which are playing
      this.playingAudio.forEach((audio) => {
        fadeOutAndStop(audio)
      })

      this.playingAudio.clear()
    }
  },
})
