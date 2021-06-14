<template>
<div class="home">
  <div class="container">
    <div class="position-relative">
    <img src="../assets/img7.jpg" alt="" class="container-fluid" style="height:500px;">
    <div class="imgtext position-absolute top-50 start-0 p-3">
      <h3 class="text-white">新鮮 | 美味 | 健康 | 無負擔</h3>
      <h5 class="text-white">品嘗食物的原味</h5>
    </div>
  </div>

  <div class="mt-3">
    <h1 class="fs-2 text-warning mb-3">熱門分類</h1>
    <div class="row">
      <div class="hot col-3 position-relative" v-for="(item, index) in categories" :key="index" @click.prevent="categoryBtn(item.title)">
        <img class="img" :src="require(`../assets/${item.img}`)" alt="" style="width:100%;height:200px">
        <h3 class="text position-absolute top-50 start-50 translate-middle">{{ item.title }}</h3>
      </div>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-5 m-0 p-0">
      <img src="../assets/img11.jpg" alt="" style="width:100%">
    </div>
    <div class="col-7 bg-light p-4 pt-5">
      <div class="d-flex justify-content-around mb-3">
        <h3 class="text-center text-warning fw-bold">Healthy</h3>
        <h3 class="text-center text-warning fw-bold">Real</h3>
        <h3 class="text-center text-warning fw-bold">Natural</h3>
      </div>

      <div class="d-flex justify-content-around">
        <i class="fas fa-running fs-1 text-warning"></i>
        <i class="fas fa-fish fs-1 text-warning"></i>
        <i class="fas fa-seedling fs-1 text-warning"></i>
      </div>
      <ul class="mt-3 ms-5">
        <li>挑選當季在地新鮮蔬菜，使用國產肉類</li>
        <li>選用大量天然食材；吃食物圓型，不吃加工食品</li>
        <li>烹煮使用水煮、水炒、清蒸等；不添加過多的調味料，保留食物原始的味道</li>
      </ul>
    </div>
  </div>
  </div>
  <div class="position-relative">
    <img src="../assets/img12.jpg" alt="" class="mt-5" style="width:100%; height:300px">
    <div class="position-absolute top-50 start-50 translate-middle border border-5 border-dark p-3">
      <div class="text-dark bg-white p-3">
        <h3 class="">S u b s c r i b e</h3>
        <h5 class="">訂閱我們，隨時收到最新優惠通知！</h5>
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <div class="d-flex">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
          <button class="input-group-text" id="inputGroupPrepend" @click="subscribe">訂閱</button>
        </div>

      </div>


    </div>

  </div>
</div>

</template>

<script>
export default {
  data () {
    return {
      categories: [
        { name: 'main', title: '主餐', img: 'main.jpg' },
        { name: 'light', title: '輕食', img: 'light.jpg' },
        { name: 'sweet', title: '甜點', img: 'sweet.jpg' },
        { name: 'drink', title: '飲品', img: 'drink.jpg' }
      ],
      email: ''
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/products/all`
      // this.$store.dispatch("loading", true)
      this.$http.get(api).then(response => {
        this.products = response.data.products
        for (let i = 0; i < this.products.length; i++) {
          this.$set(this.products[i], "isFollow", false)
          this.favorites.forEach(item => {
            if (this.products[i].id === item.id) {
              console.log(item)
              this.isFollow = true
            }
          })
        }
        console.log(response)
        // this.$store.dispatch("loading", false)
      })
    },
    categoryBtn (categoryTitle) {
      this.$router.push({ path: '/menu', query: { category: categoryTitle } })
    },
    subscribe () {
      if (this.email === '') {
        this.$store.dispatch('msg', {
          Boolean: true,
          msg: '請輸入正確EMAIL格式',
          msgStatus: 'error'
        })
      } else {
        this.$store.dispatch('msg', {
          Boolean: true,
          msg: '訂閱成功'
        })
      }
    }
  }
}
</script>
