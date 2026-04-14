import { useGridVisibilityStore } from '@/stores/useGridVisibilityStore'

export function observeGridCubes() {
  const store = useGridVisibilityStore()

  const root = document.querySelector('.scroll-container')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        const id = Number(el.dataset.id)

        if (!id) return

        if (entry.isIntersecting){
          store.add(id)
        }
        else store.remove(id)
      })
    },
    {
      root,
      threshold: 0.5,
    }

  )

  document.querySelectorAll('.cube').forEach((cube) => observer.observe(cube))
}
