import type { RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/Home.vue'
const ProductPage = () => import('@/pages/Product.vue')
const OrderPage = () => import('@/pages/Order.vue')

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
    path: '/order/:orderId',
    component: OrderPage,
  },
]
