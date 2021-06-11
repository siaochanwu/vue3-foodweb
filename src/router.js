import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'menu'
    },
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue'),
      children: [
        {
          path: 'story',
          name: 'story',
          component: () => import('./views/Story.vue')
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('./components/Menu.vue')
        },
        {
          path: 'activity',
          name: 'activity',
          component: () => import('./views/Activity.vue')
        },
        {
          path: 'customer_order',
          name: 'customerOrder',
          component: () => import('./views/CustomerOrder.vue')
        }
      ]
    }
  ]
})
