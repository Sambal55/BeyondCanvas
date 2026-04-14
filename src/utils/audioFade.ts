export function fadeVolume(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration = 200,
  onComplete?: () => void
) {
  const start = audio.volume
  const diff = targetVolume - start
  const steps = 20
  const stepTime = duration / steps

  let i = 0
  const interval = setInterval(() => {
    i++
    audio.volume = start + diff * (i / steps)

    if (i >= steps) {
      clearInterval(interval)
      if (onComplete) onComplete()
    }
  }, stepTime)
}

export function fadeOutAndStop(
  audio: HTMLAudioElement,
  duration = 300,
  onComplete?: () => void
) {
  const start = audio.volume
  const steps = 20
  const stepTime = duration / steps

  let i = 0
  const interval = setInterval(() => {
    i++
    audio.volume = start * (1 - i / steps)

    if (i >= steps) {
      clearInterval(interval)
      audio.pause()
      audio.currentTime = 0
      if (onComplete) onComplete()
    }
  }, stepTime)
}

