import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    loading (state, payload) {
      // state的isLoading true/false 互轉
      state.isLoading = payload
    }
  },
  actions: {
    LOADING (context, payload) {
      context.commit('loading', payload)
    }

  }
})
