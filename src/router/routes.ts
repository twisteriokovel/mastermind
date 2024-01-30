import type { RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/Home.vue'
const ProductPage = () => import('@/pages/Product.vue')
const CartPage = () => import('@/pages/Cart.vue')

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/product/:id',
    component: ProductPage,
  },
  {
    path: '/cart',
    component: CartPage,
  },
]
