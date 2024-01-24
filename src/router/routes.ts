import type { RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/Home.vue'
const ProductPage = () => import('@/pages/Product.vue')

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/product',
    component: ProductPage,
  },
]
