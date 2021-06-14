<template>
  <div class="">
    <navbar />
    <Message />
    <router-view></router-view>
    <footer2></footer2>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer2 from '../components/Footer.vue'
import Message from '../components/Message.vue'

export default {
  components: {
    Navbar,
    Footer2,
    Message
  }
}
</script>
