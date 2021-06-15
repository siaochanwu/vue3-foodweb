<template>
  <div class="Message" :class="{ open : msgModal }">
    <div class="section shadow-lg bg-body rounded">
      <div class="warpper">
        <div class="title">Message</div>
        <div class="content">
          {{ msg }}
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">Close</button> -->
          <button type="button" class="btn btn-warning" @click="closeModal()">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  methods: {
    // cancel () {
    //   this.$store.dispatch('msg', {
    //     Boolean: false,
    //     msgState: ''
    //   })
    // },
    closeModal () {
      this.$store.dispatch('msg', false)
    }
  },
  computed: {
    ...mapState(["msgModal", "msg", "msgState"])
  }
}
</script>
