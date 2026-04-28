export function speak(text: string) {
  const spokenText = new SpeechSynthesisUtterance(text)
  spokenText.lang = 'nl-NL'
  speechSynthesis.cancel()
  speechSynthesis.speak(spokenText)
}
