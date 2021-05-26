import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/admin',
      name: 'dash',
      component: () => import('./views/Dash.vue'),
      children: [
        {
          path: 'products',
          name: 'Products',
          meta: { requiresAuth: true },
          component: () => import('./views/Products.vue')
        },
        {
          path: 'orders',
          name: 'Orders',
          meta: { requiresAuth: true },
          component: () => import('./views/Orders.vue')
        },
        {
          path: 'coupons',
          name: 'Coupons',
          meta: { requiresAuth: true },
          component: () => import('./views/Coupons.vue')
        }
      ]
    }
  ]
})
