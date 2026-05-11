/**
 * @author Lisa Welling
 * TTS helper in the Dutch language. Speaks text which has been passed along.
 *
 * @param text which needs to be spoken out loud.
 */
export function speak(text: string) {
  const spokenText = new SpeechSynthesisUtterance(text)
  spokenText.lang = 'nl-NL'
  speechSynthesis.cancel()
  speechSynthesis.speak(spokenText)
}
