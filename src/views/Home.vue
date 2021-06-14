<template>
<div class="home container">
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
      ]
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
    }
  }
}
</script>
