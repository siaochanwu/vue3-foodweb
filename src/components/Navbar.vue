<template lang="">
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>
</template>

<!-- <script>
export default {
  data () {
    return {
      cart: {},
      active: false,
      cartData: {}
    }
  },
  methods: {
    signOut () {
      const api = `${process.env.VUE_APP_API}/logout`
      this.axios
        .post(api)
        .then((res) => {
          console.log(res);
          this.$store.dispatch('LOGOUT', false);
          this.$router.push('login')
        }).catch((err) => {
          console.log(err)
        });
    },
    getCart() {
      const vm = this;
      const api = "https://vue-course-api.hexschool.io/api/wendywu007/cart";
      this.$http.get(api).then((response) => {
        console.log(response.data.data.carts);
        vm.cartData = response.data.data.carts;
      });
    },
    addtoCart(id, qty = 1) {
      console.log(id,qty)
      const vm = this;
      const api = "https://vue-course-api.hexschool.io/api/wendywu007/cart";
      // vm.status.loadingItem = id;
      const cart = {
          product_id: id,
          qty
      };
      console.log(cart);
      this.$http.post(api, cart).then((response) => {
          console.log("123",response);
          // vm.status.loadingItem = "";
          vm.getCart();
          console.log(this.cartData)
      });
    },
    removeItem(id) {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/wendywu007/cart/${id}`;
      this.$http.delete(api).then(res => {
        console.log(res.data);
        vm.getCart();
      })
    },
    seecart () {
      this.active = !this.active;
    }
  },
  created () {
    this.getCart()
  },
  computed: {
    hasData () {
      return this.cartData.length > 0 ? true : false
    }
  }
}
</script> -->
