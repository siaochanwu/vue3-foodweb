<template>
  <div class="login">
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center mt-5">
            <div id="login-column" class="col-md-6 bg-light py-5 shadow-sm p-3 mb-5 bg-light rounded">
                <div id="login-box" class="col-md-12">
                    <form id="login-form" class="form" action="" method="post">
                        <h3 class="text-center text-info">Login</h3>
                        <div class="form-group">
                            <label for="username" class="text-info">Email:</label><br>
                            <input type="text" name="username" id="username" class="form-control" v-model="user.username">
                        </div>
                        <div class="form-group">
                            <label for="password" class="text-info">Password:</label><br>
                            <input type="password" name="password" id="password" class="form-control" v-model="user.password">
                        </div>
                        <div class="form-group mt-3">
                            <button type="submit" name="submit" class="btn btn-info btn-md" @click.prevent="login">LOG IN</button>
                        </div>
                        <div id="register-link" class="text-right mt-2">
                            <a href="#" class="text-info">Register here</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  created () {
  },
  methods: {
    login () {
      const api = `${process.env.VUE_APP_API}/admin/signin`
      console.log(this.user)
      this.axios
        .post(api, this.user)
        .then(res => {
          console.log(res)
          if (res.data.success) {
            const token = res.data.token
            const expired = res.data.expired
            document.cookie = `hexToken=${token};expires=${new Date(expired)};`
            this.$router.push('/admin/produts')
          }
        })
    }
  }
}
</script>
