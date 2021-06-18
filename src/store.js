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
    cartData: [],
    carts: JSON.parse(localStorage.getItem('cartData')) || []
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
    },
    CARTS (state, payload) {
      state.carts = payload
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
      context.dispatch('msg', { msg: '加入我的最愛', Boolean: true })
    },
    removeFavorite (context, favoriteItem) {
      context.commit('REMOVE_FAVORITE', favoriteItem)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
      context.dispatch('msg', { msg: '取消我的最愛', Boolean: true })
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
    addToCart (context, { data, qty }) {
      const cacheID = []
      context.state.cartData.forEach((item) => {
        cacheID.push(item.product_id)
      })
      console.log(cacheID)
      if (cacheID.indexOf(data.id) === -1) {
        const cacheContent = {
          product_id: data.id, // 產品 ID
          qty: 1, // 產品數量，預設一筆
          name: data.title, // 產品標題
          origin_price: data.origin_price, // 產品原始金額
          price: data.price,
          imageUrl: data.imageUrl
        }
        context.state.carts.push(cacheContent)
        localStorage.setItem('cartData', JSON.stringify(context.state.carts))
      } else {
        let cache = {}
        context.state.carts.forEach((item, keys) => {
          if (item.product_id === data.id) {
            let { qty } = item // 取出已存在 localStorage 購物車的資料並加數量增加
            cache = {
              product_id: data.product_id, // 產品 ID
              qty: qty += 1, // 產品數量，預設一筆
              name: data.title, // 產品標題
              origin_price: data.origin_price, // 產品原始金額
              price: data.price,
              imageUrl: data.imageUrl
            }
            context.state.carts.splice(keys, 1)
          }
        })
        context.state.carts.push(cache)
        localStorage.setItem('cartData', JSON.stringify(context.state.carts))
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      const cart = {
        product_id: data.id,
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
        context.state.carts.forEach((item, key) => {
          if (item.product_id === id) {
            console.log('123')
            context.state.carts.splice(key, 1)
          }

        })
      })
    }
  },
  getters: {
    favorites: state => state.favorites
  }
})
