/**
 * @author Lisa Welling
 * TTS helper in the Dutch language. Speaks text which has been passed along.
 *
 * @param text which needs to be spoken out loud.
 */
let unlocked = false

function unlockSpeech() {
  if (unlocked) return
  const utterance = new SpeechSynthesisUtterance('')
  speechSynthesis.speak(utterance)
  unlocked = true
  document.removeEventListener('touchstart', unlockSpeech)
}

// Unlock speech TTS for Safari
document.addEventListener('touchstart', unlockSpeech, { once: true })

export function speak(text: string) {
  const spokenText = new SpeechSynthesisUtterance(text)
  spokenText.lang = 'nl-NL'
  speechSynthesis.cancel()

  if (speechSynthesis.paused) {
    speechSynthesis.resume()
  }

  speechSynthesis.speak(spokenText)
}
