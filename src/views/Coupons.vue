<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#couponModal"
        @click="openModal(true)"
      >
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="100">折扣</th>
          <th width="100">是否啟用</th>
          <th width="90">編輯</th>
          <th width="90">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.percent }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary"
              btn-sm
              @click="openModal(false, item)"
            >
              編輯
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-primary"
              btn-sm
              @click="deleteModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">優惠券名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempCoupon.title"
                    placeholder="請輸入優惠券名稱"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="percent">折扣</label>
                  <input
                    type="text"
                    class="form-control"
                    id="percent"
                    v-model="tempCoupon.percent"
                    placeholder="請輸入折扣"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="code">優惠券代號</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    v-model="tempCoupon.code"
                    placeholder="請輸入優惠券代號"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="due_data">到期日</label>
                  <input
                    type="text"
                    class="form-control"
                    id="due_data"
                    v-model="tempCoupon.due_data"
                    placeholder="請輸入到期日"
                  />
                </div>
              </div>
              <div class="form-group">
                  <div class="form-check ml-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addCoupon">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!--Delete Modal-->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delCouponModal">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="addCoupon">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      due_date: new Date(),
      isNew: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      this.$store.dispatch('LOADING', true)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupons?page=${page}`
      this.$http.get(api).then((response) => {
        this.$store.dispatch('LOADING', false)
        console.log(response.data)
        vm.coupons = response.data.coupons
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
        console.log('new')
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
      $('#couponModal').modal('show')
    },
    deleteModal (item) {
      const vm = this
      vm.tempCoupon = item.id
      $('#delCouponModal').modal('show')
    },
    addCoupon () {
      const vm = this
      let api =
        `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data)
        // vm.products = response.data.products;
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          console.log('新增失敗')
        }
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
