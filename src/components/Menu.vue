<template lang="">
  <div>
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="bd-placeholder-img" width="100%" height="100%" src="../assets/img3.jpg" aria-hidden="true">
        <div class="container">
          <div class="carousel-caption text-start ">
            <h1 class="p-2 fw-bold">今晚 我想來點......</h1>
            <p class="px-3">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            <p class="px-3"><a class="btn btn-lg btn-danger" href="#menu" role="button">查看菜單</a></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img class="bd-placeholder-img" width="100%" height="100%" src="../assets/img1.jpg" aria-hidden="true">
        <div class="container">
          <div class="carousel-caption">
            <h1 class="text-warning fw-bold">向醫護人員致敬</h1>
            <p class="px-3 text-warning">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            <p class="px-3"><a class="btn btn-lg btn-warning fw-bold" href="#menu" role="button">查看菜單</a></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img class="bd-placeholder-img" width="100%" height="100%" src="../assets/img2.jpg" aria-hidden="true">
        <div class="container">
          <div class="carousel-caption text-end">
            <h1 class="p-3">立即下單 外送到家</h1>
            <p class="px-3">防疫期間 外送提供您最多的選擇 只需一通電話 立即送到家</p>
            <p class="px-3"><a class="btn btn-lg btn-danger" href="#menu" role="button">查看菜單</a></p>
          </div>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
  <div class="container marketing" id="menu">
    <!-- Three columns of text below the carousel -->
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-12" v-for="item in products" :key="item.id">
        <div class="card">
          <img src="" class="card-img-top" alt="">
          <div class="card-body">
            <div
                style="height: 150px; background-size: cover; background-position: center"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{
                    item.category
                    }}</span>
                    <h5 class="card-title">
                    <a href="#" class="text-dark fw-bold text-decoration-none">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">
                        {{ item.origin_price }} 元
                    </div>
                    <del class="h6" v-if="item.price"
                        >原價 {{ item.origin_price }} 元</del
                    >
                    <div class="h5" v-if="item.price">
                        現在只要 {{ item.price }} 元
                    </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#productModal" @click="getProduct(item.id)">
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                      ></i>
                      查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.loadingItem === item.id"
                    ></i>
                    加到購物車
                    </button>
                  </div>
              </div>
          </div>
          <!-- modal -->
          <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                  {{ product.title }}
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <img :src="product.imageUrl" class="img-fluid" alt="" />
                  <blockquote class="blockquote mt-3">
                  <p class="mb-0">{{ product.content }}</p>
                  <footer class="blockquote-footer text-right">
                      {{ product.description }}
                  </footer>
                  </blockquote>
                  <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h4" v-if="!product.price">
                      {{ product.origin_price }} 元
                  </div>
                  <del class="h6" v-if="product.price"
                      >原價 {{ product.origin_price }} 元</del
                  >
                  <div class="h4" v-if="product.price">
                      現在只要 {{ product.price }} 元
                  </div>
                  </div>
                  <select name="" class="form-control mt-3" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num">
                      選購 {{ num }} {{ product.unit }}
                  </option>
                  </select>
              </div>
              <div class="modal-footer">
                <div class="text-muted text-nowrap mr-3">
                小計 <strong>{{ product.num * product.price }}</strong> 元
                </div>
                <button
                type="button"
                class="btn btn-primary"
                @click="addtoCart(product.id, product.num)"
                >
                <i
                    class="fas fa-spinner fa-spin"
                    v-if="product.id === status.loadingItem"
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
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      cart: {},
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      category: ''
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `https://vue-course-api.hexschool.io/api/wendywu007/products/all`
      this.$store.dispatch('LOADING', true)
      this.$http.get(api).then((response) => {
        vm.products = response.data.products
        console.log(response)
        this.$store.dispatch('LOADING', false)
      })
    },
    getProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`
      vm.status.loadingItem = id
      this.$http.get(api).then((response) => {
        vm.product = response.data.product
        $('#productModal').modal('show')
        console.log(response)
        vm.status.loadingItem = ''
      })
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then((response) => {
        console.log(response)
        vm.status.loadingItem = ''
        vm.getCart()
        $('#productModal').modal('hide')
      })
    },
    getCart () {
      const vm = this
      this.$store.dispatch('LOADING', true)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      this.$http.get(api).then((response) => {
        console.log(response)
        vm.cart = response.data.data
        this.$store.dispatch('LOADING', false)
      })
    },
    removeItem (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart/${id}`
      this.$store.dispatch('LOADING', true)
      this.$http.delete(api).then((response) => {
        console.log(response)
        vm.getCart()
        this.$store.dispatch('LOADING', false)
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
