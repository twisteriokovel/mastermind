import type { RouteRecordRaw } from 'vue-router'

import HomePage from '../pages/Home.vue'
const ProductPage = () => import('@/pages/Product.vue')
const CartPage = () => import('@/pages/Cart.vue')
const OrderPage = () => import('@/pages/Orders.vue')
const ShippingPage = () => import('@/pages/Shipping.vue')

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
    path: '/product/:id/shipping',
    component: ShippingPage,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/orders',
    component: OrderPage,
  },
]
