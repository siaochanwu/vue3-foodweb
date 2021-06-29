import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

localize('zh_TW', TW)

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
