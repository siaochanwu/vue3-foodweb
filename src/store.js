import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    favorites: [],
    msg: '',
    msgModal: false,
    msgMask: false,
    msgState: '',
    cartData: []
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
      state.msgMask = payload.Boolean
      state.msgModal = payload.Boolean
      state.msgState = payload.msgState
      state.msg = payload.msg
    },
    CART (state, payload) {
      state.cartData = payload
    }
  },
  actions: {
    loading (context, payload) {
      context.commit('LOADING', payload)
    },
    addToFavorite (context, product) {
      const favoriteData = {
        id: product.id,
        title: product.title
      }
      context.commit('PUSH_FAVORITE', favoriteData)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
    },
    removeFavorite (context, favoriteItem) {
      context.commit('REMOVE_FAVORITE', favoriteItem)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
    },
    msg (context, payload) {
      context.commit('MSG', payload)
    },
    getCart (context) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      axios.get(url).then((response) => {
        context.commit('CART', response.data.data.carts)
      })
    },
    addToCart (context, { id, qty }) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      const cart = {
        product_id: id,
        qty
      }
      axios.post(url, { data: cart }).then((response) => {
        context.dispatch('getCart')
        if (response.data.success) {
          context.dispatch('msg', { msg: response.data.message, Boolean: true })
        } else {
          context.dispatch('msg', { msg: response.data.message, Boolean: true })
        }
      })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart/${id}`
      axios.delete(url).then((response) => {
        context.dispatch('getCart')
        context.dispatch('msg', { msg: response.data.message, Boolean: true })
      })
    }
  },
  getters: {
    favorites: state => state.favorites
  }
})
