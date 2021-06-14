import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    favorites: [],
    msg: '',
    msgModal: false,
    msgMask: false,
  },
  mutations: {
    LOADING (state, payload) {
      // state的isLoading true/false 互轉
      state.isLoading = payload
    },
    FAVORITES (state, payload) {
      state.favorites = payload
    },
    PUSH_FAVORITE (state, favorite) {
      state.favorites.push(favorite)
    },
    REMOVE_FAVORITE (state, favorite) {
      state.favorites.forEach((item, index) => {
        if (item.id === favorite.id) {
          state.favorites.splice(index, 1)
        }
      })
    },
    MSG (state, payload) {
      // state.msgMask = payload.Boolean
      state.msgState = payload.msgState
      state.msg = payload.msg
    },
  },
  actions: {
    loading (context, payload) {
      context.commit('LOADING', payload)
    },
    getFavorite (context) {
      const favoriteData = JSON.parse(localStorage.getItem('favoriteData')) || []
      context.commit('FAVORITES', favoriteData)
    },
    addToFavorite (context, product) {
      const favoriteData = {
        id: product.id,
        title: product.title
      }
      context.commit('PUSH_FAVORITE', favoriteData)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
      context.dispatch('getFavorite')
    },
    removeFavorite (context, favoriteItem) {
      context.commit('REMOVE_FAVORITE', favoriteItem)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
      context.dispatch('getFavorite')
    },
    msg (context, payload) {
      context.commit('MSG', payload)
    }
  },
  getters: {
    favorites: state => state.favorites
  }
})
