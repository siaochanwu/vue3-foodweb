<template>
  <div class="MsgMask" :class="{ open: msgMask }"></div>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState(["msgMask"])
  }
}
</script>

<style lang="scss">
.MsgMask {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.664);
  z-index: 99;
  cursor: pointer;
  &.open {
    display: block;
  }
}
</style>
