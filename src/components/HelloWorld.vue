<template>
  <div>
    <a href="" @click.prevent="signout">sign out</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    signout () {
      const api = `${process.env.VUE_APP_API}/logout`
      console.log(api)
      this.$http
        .post(api)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
