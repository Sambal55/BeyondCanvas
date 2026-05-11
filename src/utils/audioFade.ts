/**
 * @author Lisa Welling
 * Function which is used to fade from one ambience or SFX to another.
 *
 * @param audio HTML element which stores audio
 * @param targetVolume speaks for itself, volume that needs to be reached
 * @param duration time in which targetvolume needs to be achieved
 * @param onComplete optional callback called when the fade has finished
 */
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

/**
 * @author Lisa Welling
 * Function which is used to fade out and stop SFX sounds and ambience sounds, when a user returns to main menu.
 *
 * @param audio HTML element which stores audio
 * @param duration time in milliseconds over which the audio fades out
 * @param onComplete optional callback called when the fade has finished
 */
export function fadeOutAndStop(audio: HTMLAudioElement, duration = 300, onComplete?: () => void) {
  // Cancel any ongoing fade before starting a new one
  if ((audio as any)._fadeInterval) {
    clearInterval((audio as any)._fadeInterval)
  }

  // Clamp the starting volume to a valid range in case of unexpected values
  let start = Math.min(1, Math.max(0, Number.isFinite(audio.volume) ? audio.volume : 0))

  const steps = 20
  const stepTime = duration / steps

  let i = 0
  const interval = setInterval(() => {
    i++

    // Linearly interpolate volume from start to 0
    const next = start * (1 - i / steps)
    audio.volume = Math.min(1, Math.max(0, next))

    if (i >= steps) {
      clearInterval(interval)
      // Ensure volume is exactly 0, pause, and reset playback position
      audio.volume = 0
      audio.pause()
      audio.currentTime = 0
      onComplete?.()
    }
  }, stepTime)

  // Store interval reference so it can be cancelled if needed
  ;(audio as any)._fadeInterval = interval
}
