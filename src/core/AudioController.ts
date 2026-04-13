class AudioController {
  ambience: HTMLAudioElement
  sfxVolume = 1
  ambienceBaseVolume = 0.6
  ambienceDuckedVolume = 0.25

  constructor() {
    this.ambience = new Audio('/audio/ambience.mp3')
    this.ambience.loop = true
    this.ambience.volume = this.ambienceBaseVolume
    this.ambience.play()
  }

  playSFX(src: string) {
    const sfx = new Audio(src)
    sfx.volume = this.sfxVolume

    // Duck ambience
    this.duckAmbience()

    sfx.onended = () => {
      this.restoreAmbience()
    }

    sfx.play()
  }

  fadeVolume(audio: HTMLAudioElement, target: number, duration = 200) {
    const start = audio.volume
    const diff = target - start
    const steps = 20
    const stepTime = duration / steps

    let i = 0
    const interval = setInterval(() => {
      i++
      audio.volume = start + (diff * (i / steps))
      if (i >= steps) clearInterval(interval)
    }, stepTime)
  }

  duckAmbience() {
    this.fadeVolume(this.ambience, this.ambienceDuckedVolume, 150)
  }

  restoreAmbience() {
    this.fadeVolume(this.ambience, this.ambienceBaseVolume, 300)
  }

}

export const audioController = new AudioController()
