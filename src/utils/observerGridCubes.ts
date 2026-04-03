import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'

export function observeGridCubes() {
  const store = useGridVisibilityStore()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        const idString = el.dataset.id
        if (!idString) return

        const id = Number(idString)
        if (isNaN(id)) return

        if (entry.isIntersecting) {
          store.add(id)
        } else {
          store.remove(id)
        }
      })
    },
    {
      threshold: 0.5,
    },
  )

  const cubes = document.querySelectorAll<HTMLElement>('.cube')

  cubes.forEach((cube) => observer.observe(cube))
}
