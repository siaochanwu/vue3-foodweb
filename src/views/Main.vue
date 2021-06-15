<template>
  <div class="">
    <navbar />
    <Message />
    <MsgMask />
    <router-view></router-view>
    <footer2></footer2>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer2 from '../components/Footer.vue'
import Message from '../components/Message.vue'
import MsgMask from "../components/MsgMask.vue"

export default {
  components: {
    Navbar,
    Footer2,
    Message,
    MsgMask
  }
}
</script>
