<template lang="">
  <div>
    1233
  </div>
</template>

<script>
export default {
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.axios.defaults.headers.common['Authorization'] = myCookie;
  }
}
</script>
