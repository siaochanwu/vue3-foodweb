<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">login</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
    const api = `${process.env.VUE_APP_API}/${process.env.VUE_APP_CUSTOMER}/products`
    console.log(api)
    this.$http
      .get(api)
      .then(res => {
        console.log(res)
      })
  }
}
</script>
<style lang="scss">
@import "./assets/all.scss";

</style>
