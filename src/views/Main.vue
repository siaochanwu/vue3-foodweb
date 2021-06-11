<template>
  <div class="">
    <navbar />
    <router-view></router-view>
    <footer2></footer2>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer2 from '../components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer2
  }
}
</script>
