export function detectScrollEdge(container: HTMLElement, callback: (edge: string) => void) {
  let last = { top: false, bottom: false, left: false, right: false }
  // Tolarance to account for scaling and minor pixel differance
  const tolerance = 2

  container.addEventListener('scroll', () => {
    const atTop = container.scrollTop === 0

    const atBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - tolerance

    const atLeft = container.scrollLeft === 0
    const atRight =
      container.scrollLeft + container.clientWidth >= container.scrollWidth -tolerance

    if (atTop && !last.top) callback('top')
    if (atBottom && !last.bottom) callback('bottom')
    if (atLeft && !last.left) callback('left')
    if (atRight && !last.right) callback('right')

    last = { top: atTop, bottom: atBottom, left: atLeft, right: atRight }
  })
}

export function applyTouchScroll(container: HTMLElement, speed: number = 1) {
  let startX = 0
  let startY = 0
  let scrollLeft = 0
  let scrollTop = 0

  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
    scrollLeft = container.scrollLeft
    scrollTop = container.scrollTop
  }, { passive: true })

  container.addEventListener('touchmove', (e) => {
    e.preventDefault()
    const dx = (startX - e.touches[0].clientX) * speed
    const dy = (startY - e.touches[0].clientY) * speed
    container.scrollLeft = scrollLeft + dx
    container.scrollTop = scrollTop + dy
  }, { passive: false })
}
