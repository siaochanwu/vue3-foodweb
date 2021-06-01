<template>
  <div class="CustomerOrder container mt-5">
    <div class="position-relative m-4">
    <div class="progress" style="height: 2px;">
      <div class="progress-bar bg-success" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-success rounded-pill" style="width: 7rem; height:2rem;">加入購物車</button>
      <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-success rounded-pill" style="width: 7rem; height:2rem;">填寫基本資料</button>
      <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 7rem; height:2rem;">確認訂單</button>
    </div>
    <div class="my-5 row justify-content-center" v-show="cart.total > 0">
      <div class="col-lg-6">
        <span class="title fw-bold fs-3 border border-top-0 border-start-0 border-end-0 border-success border-5">購物車</span>
          <table class="table mt-4">
            <thead>
              <th class="ps-3 fs-5">商品名稱</th>
              <th class="ps-3 fs-5">數量</th>
              <th class="ps-3 fs-5">單價</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle">
                  {{ item.qty }}/{{ item.product.unit }}
                </td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeItem(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">${{ cart.total }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-success"
                type="button"
                @click="addCouponCode"
              >
                套用優惠碼
              </button>
            </div>
          </div>
      </div>
      <div class="col-lg-6">
        <span class="title fw-bold fs-3 border border-top-0 border-start-0 border-end-0 border-success border-5">個人資料</span>
        <ValidationObserver ref="form">
          <form class="mt-3" @submit.prevent="createOrder">
            <ValidationProvider class="form-group" rules="required|email" v-slot="{errors, classes}">
              <label for="useremail" class="fs-5 fw-bold">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                id="useremail"
                :class="classes"
                v-model="form.user.email"
                placeholder="請輸入 Email"
              />
              <span class="text-danger" >
                {{errors[0]}}
              </span>
            </ValidationProvider>
            <br>
            <ValidationProvider class="form-group" rules="required" v-slot="{errors}">
              <label for="username" class="fs-5 fw-bold">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                name="name"
                id="username"
                v-model="form.user.name"
                placeholder="輸入姓名"
              />
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <br>
            <ValidationProvider class="form-group" rules="numeric|min:7" v-slot="{errors}">
              <label for="usertel" class="fs-5 fw-bold">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                id="usertel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              />
              <span class="text-danger">{{errors[0]}}</span>
            </ValidationProvider>
            <br>
            <ValidationProvider class="form-group" rules="required" v-slot="{errors}">
              <label for="useraddress" class="fs-5 fw-bold">收件人地址</label>
              <input
                type="address"
                class="form-control"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                placeholder="請輸入地址"
              />
              <span class="text-danger"> {{errors[0]}} </span>
            </ValidationProvider>
            <br>
            <div class="form-group">
              <label for="useraddress" class="fs-5 fw-bold">備註</label>
              <textarea
                name=""
                id=""
                class="form-control"
                cols="30"
                rows="3"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right mt-2">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      cart: {},
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      category: ''
    }
  },
  methods: {
    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/coupon`
      const coupon = {
        code: vm.coupon_code
      };
      this.$store.dispatch('LOADING', true)
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response)
        vm.getCart()
        this.$store.dispatch('LOADING', false)
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/order`
      const order = vm.form
      this.$store.dispatch('LOADING', true)
      vm.$refs.form.validate().then((success) => {
        if (success) {
          vm.$http.post(api, { data: order }).then((response) => {
            console.log('訂單已建立', response)
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
            this.$store.dispatch('LOADING', false)
          })
        } else {
          console.log('欄位不完整')
        }
      })
    },
    getCart () {
      const vm = this
      this.$store.dispatch('LOADING', true)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      this.$http.get(api).then((response) => {
        console.log(response)
        vm.cart = response.data.data
        this.$store.dispatch('LOADING', false)
      })
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`
      vm.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, { data: cart }).then((response) => {
        console.log(response)
        vm.status.loadingItem = ''
        vm.getCart()
        $('#productModal').modal('hide')
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
