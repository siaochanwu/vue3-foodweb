<template>
  <div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      productId: '',
      product: {}
    }
  },
  methods: {
    getProduct () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productId}`
      this.$store.dispatch('loading', true)
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          this.product = response.data.product
          // 若已在 vm.favorites 中則 vm.isFavorite = true
          for (let i = 0; i < this.products.length; i++) {
            this.$set(this.products[i], 'isFollow', false)
            this.favorites.forEach((item) => {
              if (this.products[i].id === item.id) {
                console.log(item)
                this.isFollow = true
              }
            })
          }
        }
        this.$store.dispatch('loading', false);
      })
    }
  },
  created () {
    this.productId = this.$route.params.productId
    console.log(this.productId)
    this.getProduct()
  }
}
</script>
