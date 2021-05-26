import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    isLoading: false
  },
  mutations: {
    login (state, payload) {
      state.login = payload
    },
    loading (state, payload) {
      // state的isLoading true/false 互轉
      state.isLoading = payload
    },
    logout (state, payload) {
      state.login = payload
    }
  },
  actions: {
    LOGIN (context, payload) {
      context.commit('login', payload)
    },
    LOADING (context, payload) {
      context.commit('loading', payload)
    },
    LOGOUT (context, payload) {
      context.commit('logout', payload)
    }
  }
})
