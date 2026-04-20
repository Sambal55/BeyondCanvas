export function isCubeCentered(el: HTMLElement) {
  const rect = el.getBoundingClientRect()

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2

  // Hoe groot is de "center zone"?
  const toleranceX = window.innerWidth * 0.2 // 20% links/rechts
  const toleranceY = window.innerHeight * 0.2 // 20% boven/onder

  const withinX = Math.abs(rect.left + rect.width / 2 - screenCenterX) < toleranceX
  const withinY = Math.abs(rect.top + rect.height / 2 - screenCenterY) < toleranceY

  return withinX && withinY
}
