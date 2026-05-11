import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { useImportantStore } from '@/stores/useImportantStore'
import { usePaintingStore } from '@/stores/usePaintingStore'

/**
 * @author Lisa Welling
 *
 * Function which has multiple observer which each serve a different purpose.
 * visibilityObserver --> observes all visible cubes in the scrollRoot
 * centerObserver --> observer which is used for setting importantCubes if they are slightly in the center of the scrollRoot
 * * edgeObserver --> also used for importantCubes, but uses a lower threshold for cubes
 *  *                  at the edges of the painting where the center threshold is never reached
 */
export function observeGridCubes() {
  const visibilityStore = useGridVisibilityStore()
  const importantStore = useImportantStore()
  const paintingStore = usePaintingStore()

  const scrollRoot = document.querySelector('.scroll-container') as HTMLElement

  function getCubeFromEntry(entry: IntersectionObserverEntry) {
    const el = entry.target as HTMLElement
    const id = Number(el.dataset.id)
    if (!id) return null
    return paintingStore.cubeById(id)
  }

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        const id = Number(el.dataset.id)
        if (!id) return

        if (entry.isIntersecting) {
          visibilityStore.add(id)
        } else {
          visibilityStore.remove(id)
          if (importantStore.activeCube?.id === id) {
            importantStore.clearImportantCube()
          }
        }
      })
    },
    { root: scrollRoot, threshold: 0.5 },
  )

  let hasScrolled = false

  scrollRoot.addEventListener(
    'scroll',
    () => {
      hasScrolled = true
    },
    { once: true },
  )
  const centerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        // User needs to start scrolling before important cube can be shown
        if (!hasScrolled) return
        const cube = getCubeFromEntry(entry)
        if (!cube?.importantCubeInfo?.description?.trim()) return

        const { x, y } = cube.position
        if (x === 0 || x === 19 || y === 0 || y === 13) return

        importantStore.setImportantCube(cube)
      })
    },
    { root: scrollRoot, threshold: 0.1, rootMargin: '-45% 0px -45% 0px' },
  )

  const edgeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const cube = getCubeFromEntry(entry)
        if (!cube?.importantCubeInfo?.description?.trim()) return

        const { x, y } = cube.position
        // if cube is not at the edge, return and use centerObserver
        if (x !== 0 && x !== 19 && y !== 0 && y !== 13) return

        // set importantCube if cube IS at the edge
        importantStore.setImportantCube(cube)
      })
    },
    { root: scrollRoot, threshold: 0.5 },
  )

  document.querySelectorAll('.cube').forEach((cube) => {
    visibilityObserver.observe(cube)
    centerObserver.observe(cube)
    edgeObserver.observe(cube)
  })
}
