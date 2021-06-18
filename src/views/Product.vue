<template>
  <div class="Product">
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
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mt-3 mb-5">
          <li class="breadcrumb-item"><router-link to="/" class="text-decoration-none text-secondary">主頁</router-link></li>
          <li class="breadcrumb-item"><router-link to="/menu" class="text-decoration-none text-secondary">菜單</router-link></li>
          <li class="breadcrumb-item active text-warning" aria-current="page">{{ product.title}}</li>
        </ol>
      </nav>
      <div class="row mb-5">
      <div class="col-6">
        <!-- <span class="badge bg-warning text-dark fs-6 mt-3">{{ product.category }}</span> -->
        <div
          style="width:100%;height: 350px; background-size: contain; background-position: center; background-repeat: no-repeat;"
          :style="{ backgroundImage: `url(${product.imageUrl})` }"
        ></div>
      </div>
      <div class="col-6">
        <h1 class="text-dark border-0 border-bottom border-3 border-warning" style="width:auto;">{{ product.title }}</h1>
        <h6 class="border-0 border-start border-4 border-warning p-2 bg-light my-3 fw-light">{{ product.description }}</h6>
        <h6 class="text-decoration-line-through">NT$ {{ product.origin_price }}</h6>
        <h4 class="mb-3">NT$ {{ product.price }}</h4>
        <!-- <p>{{product.content}}</p> -->
        <div class="d-flex mb-3">
          <button class="btn bg-light rounded-0 rounded-start fw-bold" type="button" @click="num>1 && num --"><i class="fas fa-minus"></i></button>
          <div class="d-flex justify-content-center align-items-center fs-4 text-dark" style="width:35px; height:38px">{{ num }}</div>
          <button class="btn bg-light rounded-0 rounded-end" type="button" @click="num ++"><i class="fas fa-plus"></i></button>
        </div>
        <h6 class="text-dark">產品成分 : {{ product.content }}</h6>
        <div class="d-flex">
          <button class="btn btn-danger d-flex justify-content-center align-items-center me-3" @click="addtoCart(num)"><i class="fas fa-cart-plus px-1 fs-5 text-white"></i>加入購物車</button>
          <button class="btn btn-danger d-flex justify-content-center align-items-center" @click="addtoCart(product)">立即購買</button>
        </div>
      </div>
    </div>
    <hr>
    <div>
      <h3 class="text-center text-success">購物須知</h3>
      <h5 class="title text-danger">保存期限</h5>
      <ul>
        <li>由於本公司產品為現點現做，故收到貨後，請於兩小時內食用完畢。</li>
        <li>若未立即食用，請放置於冷藏。</li>
      </ul>
      <h5 class="title text-danger">運送說明</h5>
      <ul>
        <li>本公司之商品委託物流業者配送。</li>
        <li>當確認您的訂單已經付款完成，您的訂單將於付款完成後預計「30分鐘至1小時」送出，遇熱門時段或假日，等待時間將會延長，敬請見諒。
</li>
      </ul>
      <h5 class="title text-danger">退換貨注意</h5>
      <ul>
        <li>圖片僅供參考，商品內容物以實際收到商品為主。</li>
        <li>因本公司堅持保持產品之新鮮度，若簽收商品時發現包裝遭受破壞，建議您於商品到貨24小時內，請拍照存證並立即與我們聯繫。
</li>
        <li>冷凍及冷藏食品、生鮮商品、短效期消耗性食物等，除商品本身有瑕疵或冷凍、冷藏商品於運送過程失溫導致變質外，恕將不另提供退換貨服務。</li>
      </ul>
    </div>
  </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      productId: '',
      product: {},
      products: [],
      num: 1
    }
  },
  methods: {
    getProducts () {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/products/all`
      this.$store.dispatch("loading", true)
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        const favoriteData = JSON.parse(localStorage.getItem('favoriteData'))
        console.log(favoriteData)
        // for (let i = 0; i < vm.products.length; i++) {
        //   this.$set(this.products[i], "isFollow", false)
        //   favoriteData.forEach(item => {
        //     if (item.id === this.products[i].id) {
        //       this.products[i].isFollow = true
        //     }
        //   })
        // }
        console.log(response)
        this.$store.dispatch("loading", false)
      })
    },
    getProduct () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/product/${this.productId}`
      this.$store.dispatch('loading', true)
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          console.log(response.data)
          this.product = response.data.product
          // // 若已在 vm.favorites 中則 vm.isFavorite = true
          // for (let i = 0; i < this.products.length; i++) {
          //   this.$set(this.products[i], 'isFollow', false)
          //   this.favorites.forEach((item) => {
          //     if (this.products[i].id === item.id) {
          //       console.log(item)
          //       this.isFollow = true
          //     }
          //   })
          // }
        }
        this.$store.dispatch('loading', false)
      })
    },
    addtoCart (data) {
      // const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      // const cart = {
      //   product_id: this.productId,
      //   qty
      // }
      // this.$http.post(api, { data: cart }).then(response => {
      //   console.log(response)
      //   // this.status.loadingItem = ''
      //   // this.getCart()
      // })
      this.$store.dispatch('addToCart', { data, qty: 1 })
    }
  },
  created () {
    this.productId = this.$route.params.productId
    console.log(this.productId)
    this.getProduct()
    this.getProducts()
  },
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>
