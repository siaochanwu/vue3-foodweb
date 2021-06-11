import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    favorites: []
  },
  mutations: {
    LOADING (state, payload) {
      // state的isLoading true/false 互轉
      state.isLoading = payload
    },
    FAVORITES (state, payload) {
      state.favorites = payload
    },
    FAVORITES_LENGTH (state, payload) {
      state.favoritesLength = payload
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
    }
  },
  actions: {
    loading (context, payload) {
      context.commit('LOADING', payload)
    },
    getFavorite (context) {
      const favoriteData = JSON.parse(localStorage.getItem('favoriteData')) || []
      context.commit('FAVORITES', favoriteData)
      // context.commit('FAVORITES_LENGTH', favoriteData.length)
      // context.dispatch('productsModules/getProducts', { isPagination: false }, { root: true })
    },
    addToFavorite (context, product) {
      const favoriteData = {
        id: product.id,
        title: product.title
      }
      context.commit('PUSH_FAVORITE', favoriteData)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
      context.dispatch('getFavorite')
      // context.dispatch('alertMessageModules/updateMessage', { message: '已加入我的最愛', status: 'success' }, { root: true })
    },
    removeFavorite (context, favoriteItem) {
      context.commit('REMOVE_FAVORITE', favoriteItem)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
      context.dispatch('getFavorite')
      // context.dispatch('alertMessageModules/updateMessage', { message: '已刪除我的最愛', status: 'warning' }, { root: true })
    }

  },
  getters: {
    favorites: state => state.favorites
  }
})
