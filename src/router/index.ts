import { routes } from './routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/mastermind/'),
  routes,
})

export default router
