import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { useImportantStore } from '@/stores/useImportantStore'
import { usePaintingStore } from '@/stores/usePaintingStore'

export function observeGridCubes() {
  const visibilityStore = useGridVisibilityStore()
  const importantStore = useImportantStore()
  const paintingStore = usePaintingStore()

  // Root which is necessary because images are scaled up
  const scrollRoot = document.querySelector('.scroll-container')

  // Observer which has all the cubes which are visible on screen
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

          // Close popup if active cube exits screen
          if (importantStore.activeCube?.id === id) {
            importantStore.clearImportantCube()
          }
        }
      })
    },
    {
      root: scrollRoot,
      threshold: 0.5,
    },
  )

  // Center observer which detects which cube is in center
  const centerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const el = entry.target as HTMLElement
        const id = Number(el.dataset.id)
        if (!id) return

        const cube = paintingStore.cubeById(id)
        if (!cube?.importantCubeInfo?.description?.trim()) return

        importantStore.setImportantCube(cube)
      })
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "-45% 0px -45% 0px",
    },
  )


  // Observe all cubes with both observers
  document.querySelectorAll('.cube').forEach((cube) => {
    visibilityObserver.observe(cube)
    centerObserver.observe(cube)
  })
}
