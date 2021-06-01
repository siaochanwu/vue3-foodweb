<template lang="">
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Carousel</a>
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
          <button class="btn btn-outline-success" type="submit">Search</button>
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
    <div class="cartdetail position-absolute bg-light p-2 rounded shadow-sm p-3 mb-5" :class="{ close: !active}">
      <div class="title d-flex justify-content-between">
        <span class="fw-bold fs-5">您的購物袋裡有{{ cartData.length }}件商品</span>
        <button type="button" class="btn-close" aria-label="Close" @click="seecart"></button>
      </div>
      <template v-if="cartData.length > 0">
        <hr>
        <div class="row d-flex justify-content-between align-items-center" v-for="item in cartData" :key="item.id">
          <div class="col-6">
            <img :src="item.product.imageUrl" style="width:100%">
          </div>
          <div class="col-6">
            <div class="fs-5">{{ item.product.title}}</div>
            <div class="d-flex">
              <p class="">數量:{{item.qty}}</p>
              <button v-if="status.loadingItem === item.id">123</button>
              <select name="" id="" v-model="item.product.num" v-show="status.loadingItem === item.product.id">
                <option :value="num" v-for="num in 10" :key="num">
                  {{ num }}
                </option>
              </select>
              {{ item.product.unit}}
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-0"
              @click="removeItem(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
            </div>
            <div>${{ item.product.price }}</div>
          </div>
        </div>
      </template>
      <hr>
      <div class="btn d-flex justify-content-around">
          <button type="button" class="btn btn-outline-success" @click="seecart">
          繼續購物
        </button>
        <button type="button" class="btn btn-success" v-show="hasData">
          <router-link to="/customer_order" class="text-white text-decoration-none" @click="addtoCart(item.product.id, item.product.num)">結帳</router-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      cart: {},
      active: false,
      cartData: {},
      status: {
        loadingItem: ''
      }
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
      const vm = this
      const api = `https://vue-course-api.hexschool.io/api/wendywu007/cart`
      this.$http.get(api).then((response) => {
        console.log(response.data.data.carts)
        vm.cartData = response.data.data.carts

      })
    },
    getProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`

      this.$http.get(api).then((response) => {
        vm.product = response.data.product
        console.log(response)
        vm.status.loadingItem = ''
      })
    },
    addtoCart (id, qty = 1) {
      console.log(id, qty)
      const vm = this
      const api = `https://vue-course-api.hexschool.io/api/wendywu007/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      console.log(cart)
      this.$http.post(api, cart).then((response) => {
        console.log(response)
        vm.status.loadingItem = ''
        vm.getCart()
        // vm.$router.go(0)
        console.log(this.cartData)
      })
    },
    removeItem (id) {
      const vm = this
      const api = `https://vue-course-api.hexschool.io/api/wendywu007/cart/${id}`
      this.$http.delete(api).then(res => {
        console.log(res.data)
        vm.getCart()
      })
    },
    seecart () {
      this.active = !this.active
    }
  },
  created () {
    this.getCart()
    this.getProducts()
  },
  computed: {
    hasData () {
      return this.cartData.length > 0 ? true : false
    }
  }
}
</script>
