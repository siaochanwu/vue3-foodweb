import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import $ from 'jquery'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  if (to.meta.requiresAuth) {
    console.log('需驗證')

    const api = `${process.env.VUE_APP_API}/api/user/check`
    axios
      .post(api)
      .then(res => {
        console.log(res.data)
        if (res.data.success) {
          next()
        } else {
          next({
            path: '/login'
          })
        }
      })
  } else {
    next()
  }
})
