export function fadeVolume(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration = 200,
  onComplete?: () => void,
) {
  // Cancel previous fade
  if ((audio as any)._fadeInterval) {
    clearInterval((audio as any)._fadeInterval)
  }

  let start = audio.volume
  if (!Number.isFinite(start)) start = 0

  const end = Math.min(1, Math.max(0, Number.isFinite(targetVolume) ? targetVolume : 0))
  const diff = end - start

  const steps = 20
  const stepTime = duration / steps

  let i = 0
  const interval = setInterval(() => {
    i++

    const next = start + diff * (i / steps)
    audio.volume = Math.min(1, Math.max(0, next))

    if (i >= steps) {
      clearInterval(interval)
      audio.volume = end
      onComplete?.()
    }
  }, stepTime)

  ;(audio as any)._fadeInterval = interval
}

export function fadeOutAndStop(audio: HTMLAudioElement, duration = 300, onComplete?: () => void) {
  // Cancel previous fade if it exists
  if ((audio as any)._fadeInterval) {
    clearInterval((audio as any)._fadeInterval)
  }

  let start = Math.min(1, Math.max(0, Number.isFinite(audio.volume) ? audio.volume : 0))

  const steps = 20
  const stepTime = duration / steps

  let i = 0
  const interval = setInterval(() => {
    i++

    const next = start * (1 - i / steps)
    audio.volume = Math.min(1, Math.max(0, next))

    if (i >= steps) {
      clearInterval(interval)
      audio.volume = 0
      audio.pause()
      audio.currentTime = 0
      onComplete?.()
    }
  }, stepTime)

  ;(audio as any)._fadeInterval = interval
}
