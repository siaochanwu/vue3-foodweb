<template>
  <div class="">
    <Navbar1 />
    <Message />
    <MsgMask />
    <router-view></router-view>
    <footer2></footer2>
  </div>
</template>

<script>
import Navbar1 from '../components/Navbar.vue'
import Footer2 from '../components/Footer.vue'
import Message from '../components/Message.vue'
import MsgMask from '../components/MsgMask.vue'

export default {
  components: {
    Navbar1,
    Footer2,
    Message,
    MsgMask
  }
}
</script>
