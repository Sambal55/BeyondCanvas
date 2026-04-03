import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/rowers',
      name: 'Luncheon of the Boating Party',
      component: () => import('../views/RowersView.vue'),
    },
    {
      path: '/seine',
      name: 'La Grenouillère',
      component: () => import('../views/SeineView.vue'),
    },
  ],
})

export default router
