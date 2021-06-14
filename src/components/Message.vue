<template>
  <div class="Message" :class="{ open : msgModal }">
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Message</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ msg }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">Close</button>
            <button type="button" class="btn btn-primary" @click="closeModal()">OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  methods: {
    cancel () {
      this.$store.dispatch('msg', {
        Boolean: false,
        msgState: ''
      })
    },
    closeModal () {
      this.$store.dispatch('msg', false)
    }
  },
  computed: {
    ...mapState(["msgModal", "msg", "msgState"])
  }
}
</script>
