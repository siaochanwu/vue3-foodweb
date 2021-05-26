<template lang="">
  <div class="">
    <navbar />
    <div class="container-fluid">
      <div class="row">
        <sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Sidebar,
    Navbar
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common['Authorization'] = myCookie
  }
}
</script>
