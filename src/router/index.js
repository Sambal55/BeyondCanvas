import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'fallback page',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/painting/:id',
      name: 'painting',
      component: () => import('@/views/PaintingView.vue'),
    },
    {
      path: '/rowersHome',
      name: 'Home rowers AI and audio-experience',
      component: () => import('@/views/RowersHomeView.vue'),
    },
    {
      path: '/seineHome',
      name: 'Home seine AI and audio-experience',
      component: () => import('@/views/SeineHomeView.vue'),
    },
  ],
})

export default router
