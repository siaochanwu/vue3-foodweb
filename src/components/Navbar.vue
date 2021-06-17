<template lang="">
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-secondary sticky-top">
    <div class="container-fluid">
      <router-link to="/">
      <a class="navbar-brand text-decoration-none" href="#"><i class="fas fa-carrot">EatWell</i></a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse position-relative" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0 nav justify-content-end">
          <li class="nav-item active">
            <router-link to="/story" class="nav-link" aria-current="page">品牌故事</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/activity" class="nav-link" aria-current="page">活動</router-link>
          </li>
          <li class="nav-item dropdown">
          <router-link to="/menu" class="nav-link" aria-current="page">菜單</router-link>
        </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-light" type="submit">Search</button>
          <div class=" d-flex justify-content-center align-items-center mx-2">
            <i class="fas fa-heart fs-3 text-white" @click="seeFavorite">
            </i>
          </div>
          <div class="cart d-flex justify-content-center align-items-center position-relative" @click="getCart" style="width:40px">
            <i class="fas fa-cart-plus px-2" @click="seecart">
              <span class="position-absolute top-10 start-90 translate-middle badge rounded-circle bg-danger fs-6" v-show="cartData.length > 0">
                {{cartData.length}}
              </span>
            </i>
          </div>
        </form>
      </div>
    </div>

    <div class="favorite position-absolute bg-light p-2 rounded shadow-sm p-3 mb-5 overflow-auto" :class="{ close: !fav}">
      <div class="title d-flex justify-content-between mb-3">
        <span class="fw-bold fs-5 border-bottom border-3 border-warning">您的收藏有{{ cartData.length }}件商品</span>
        <button type="button" class="btn-close" aria-label="Close" @click="seeFavorite"></button>
      </div>
      <div v-for="item in favoriteData" :key="item.id">
        <router-link :to="`/menu/${item.id}`" class="text-warning text-decoration-none">
          <p class="p-0 m-0">{{ item.title }}</p>
        </router-link>
        <hr>
      </div>
    </div>

    <div class="cartdetail position-absolute bg-light p-2 rounded shadow-sm p-3 mb-5 overflow-auto" :class="{ close: !active}">
      <div class="title d-flex justify-content-between">
        <span class="fw-bold fs-5">您的購物袋裡有{{ cartData.length }}件商品</span>
        <button type="button" class="btn-close" aria-label="Close" @click="seecart"></button>
      </div>
      <template v-if="cartData.length > 0">
        <hr>
        <div class="row d-flex justify-content-between align-items-center mb-2" v-for="item in cartData" :key="item.id">
          <div class="col-5">
            <img :src="item.product.imageUrl" style="width:100%">
          </div>
          <div class="col-7">
            <div class="fs-5">{{ item.product.title}}</div>
            <div class="d-flex">
              <p class="">數量:{{item.qty}}</p>
              {{ item.product.unit}}
            </div>
            <!-- <div>
              <button type="button" class="btn btn-outline-danger rounded-0 rounded-start btn-sm" @click="addtoCart(item.product_id, item.qty-1)">-1</button>
              <button type="button" class="btn btn-outline-success btn-sm  rounded-0 rounded-end" @click="addtoCart(item.product_id, item.qty+1)">+1</button>
            </div> -->
            <div class="d-flex justify-content-between">
              <span>${{ item.product.price }}</span>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm ml-0"
                @click="removeItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
      <hr>
      <div class="btn d-flex justify-content-around">
        <button type="button" class="btn btn-outline-success" @click="seecart">
          繼續購物
        </button>
        <button type="button" class="btn btn-success" v-show="hasData">
          <router-link to="/customer_order" class="text-white text-decoration-none">結帳</router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      cart: {},
      carts: JSON.parse(localStorage.getItem('cartData')) || [],
      active: false,
      status: {
        loadingItem: ''
      },
      searchText: '',
      fav: false,
      favoriteData: JSON.parse(localStorage.getItem('favoriteData'))
    }
  },
  methods: {
    signOut () {
      const api = `${process.env.VUE_APP_API}/logout`
      this.axios
        .post(api)
        .then((res) => {
          console.log(res)
          this.$store.dispatch('LOGOUT', false)
          this.$router.push('login')
        }).catch((err) => {
          console.log(err)
        })
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    getProduct (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`
      this.$http.get(api).then((response) => {
        this.product = response.data.product
        console.log(response)
        this.status.loadingItem = ''
      })
    },
    addtoCart (id) {
      this.$store.dispatch('addToCart', { id: id, qty: 1 })
      this.active = false
    },
    removeItem (id) {
      this.$store.dispatch('removeCart', id)
      this.active = false
    },
    seecart () {
      this.active = !this.active
    },
    seeFavorite () {
      this.fav = !this.fav
    },
    search () {
      if (this.searchText === '') {
        return
      }
    }

  },
  created () {
    this.getCart()
    // this.getProducts()
  },
  computed: {
    hasData () {
      return this.cartData.length > 0 ? true : false
    },
    ...mapState(['cartData'])
  }
}
</script>
