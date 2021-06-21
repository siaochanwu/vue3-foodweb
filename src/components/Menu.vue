<template lang="">
<div class="Menu">
  <loading :active.sync="isLoading">
    <!-- 客製樣式 -->
    <div class="load-wrapp">
      <div class="load-3">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </loading>
  <div class="container">
    <div class="row mt-3">
      <div class="col-2 mt-5 pt-2">
        <div class="list-group" style="width:100%">
          <a
            href="#" v-for="(item, index) in categories" :key="index" @click="getCategory(item.title)"
            class="list-group-item list-group-item-action list-group-item-light"
            >{{ item.title }}
          </a>
        </div>
      </div>
      <div class="col-10">
        <!-- 資料篩選 -->
        <div class="dropdown container mb-3">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            排序依據
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button class="dropdown-item" @click="category = 'decending'">
                價格 : 由低到高
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="category = 'ascending'">
                價格 : 由高到低
              </button>
            </li>
          </ul>
        </div>

        <div class="container marketing" id="menu">
          <!-- Three columns of text below the carousel -->
          <div class="row">
            <div
              class="col-lg-4 col-md-6 col-sm-12"
              v-for="item in filterProducts"
              :key="item.id"
            >
              <div class="card">
                <div class="card-body">
                  <router-link :to="`/menu/${item.id}`">
                  <div
                    style="height: 150px; background-size: cover; background-position: center"
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  ></div>
                  </router-link>
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{
                    item.category
                  }}</span>
                  <h5 class="card-title">
                    <a
                      href="#"
                      class="text-dark fw-bold text-decoration-none"
                      >{{ item.title }}</a
                    >
                  </h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <div class="h5" v-if="!item.price">
                      {{ item.origin_price }} 元
                    </div>
                    <del class="h6" v-if="item.price">
                      原價 {{ item.origin_price }} 元
                    </del>
                    <div class="h5" v-if="item.price">
                      現在只要 {{ item.price }} 元
                    </div>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <i
                    class="far fa-heart fs-3"
                    :class="{ none: item.isFollow }"
                    @click="follow(item)"
                  ></i>
                  <i
                    class="fas fa-heart fs-3"
                    :class="{ none: !item.isFollow }"
                    @click="unfollow(item)"
                  ></i>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addtoCart(item)"
                  >
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.loadingItem === item.id"
                    ></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      cart: {},
      carts: JSON.parse(localStorage.getItem('cartData')) || [],
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      categories: [
        { name: 'all', title: 'ALL' },
        { name: 'main', title: '主餐' },
        { name: 'light', title: '輕食' },
        { name: 'sweet', title: '甜點' },
        { name: 'drink', title: '飲品' },
        { name: 'alcohol', title: '酒精' }
      ],
      select: 'ALL',
      isFollow: false
    };
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/products/all`
      this.$store.dispatch("loading", true)
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        const favoriteData = JSON.parse(localStorage.getItem('favoriteData'))
        console.log(favoriteData)
        for (let i = 0; i < vm.products.length; i++) {
          this.$set(this.products[i], "isFollow", false)
          favoriteData.forEach(item => {
            if (item.id === this.products[i].id) {
              this.products[i].isFollow = true
            }
          })
        }
        console.log(response)
        this.$store.dispatch("loading", false)
      })
    },
    getProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`
      vm.status.loadingItem = id
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.status.loadingItem = ""
      })
    },
    addtoCart (data) {
      console.log(this.carts)
      this.$store.dispatch('addToCart', { data, qty: 1 })
    },
    getCart () {
      const vm = this;
      this.$store.dispatch("loading", true);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.cart = response.data.data;
        this.$store.dispatch("loading", false);
      });
    },
    removeItem (id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart/${id}`;
      this.$store.dispatch("loading", true);
      this.$http.delete(api).then(response => {
        console.log(response);
        vm.getCart();
        this.$store.dispatch("loading", false);
      });
    },
    follow (product) {
      this.$store.dispatch("addToFavorite", product)
      product.isFollow = true
    },
    unfollow (product) {
      this.$store.dispatch("removeFavorite", product)
      product.isFollow = false
    },
    getParams () {
      if (this.$route.query.category) {
        this.select = this.$route.query.category
      }
    },
    getCategory (category) {
      this.select = category
      if (this.$route.query.category) {
        this.$router.push('/menu')
      }
    }
  },
  created () {
    this.getProducts()
    this.getCart()
    this.getParams()
  },
  computed: {
    filterProducts () {
      if (this.searchText) {
        return this.products.filter(item => item.title.indexOf(this.searchText) !== -1)
      }
      if (this.select !== 'ALL') {
        return this.products.filter(item => item.category === this.select)
      }
      return this.products
    },
    ...mapState(['isLoading', 'cartData', 'searchText'])

  }
};
</script>
