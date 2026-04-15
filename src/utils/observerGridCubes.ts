import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'
import { useImportantStore } from '@/stores/useImportantStore'
import { usePaintingStore } from '@/stores/usePaintingStore'

export function observeGridCubes() {
  const visibilityStore = useGridVisibilityStore()
  const importantStore = useImportantStore()
  const paintingStore = usePaintingStore()

  const root = document.querySelector('.scroll-container')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        const id = Number(el.dataset.id)
        if (!id) return

        const cube = paintingStore.cubeById(id)

        if (entry.isIntersecting) {
          visibilityStore.add(id)

          // Important cube logic
          if (cube?.isImportant) {
            importantStore.setImportantCube(cube)
          }
        } else {
          visibilityStore.remove(id)

          //  Only clear if THIS cube was the active important cube
          if (importantStore.activeCube?.id === id) {
            importantStore.clearImportantCube()
          }
        }
      })
    },
    {
      root,
      threshold: 0.5,
    },
  )

  document.querySelectorAll('.cube').forEach((cube) => observer.observe(cube))
}
