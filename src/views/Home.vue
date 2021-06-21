<template>
<div class="home position-relative">
  <div class="container">
    <div class="position-relative">
    <img src="../assets/img7.jpg" alt="" class="container-fluid" style="height:500px;">
    <div class="imgtext position-absolute top-50 start-0 p-3">
      <h3 class="text-white">新鮮 | 美味 | 健康 | 無負擔</h3>
      <h5 class="text-white">品嘗食物的原味</h5>
    </div>
  </div>

  <div class="mt-3">
    <h1 class="fs-2 text-warning mb-3">熱門分類</h1>
    <div class="row">
      <div class="hot col-lg-3 col-md-6 col-sm-12 position-relative mb-3" v-for="(item, index) in categories" :key="index" @click.prevent="categoryBtn(item.title)">
        <img class="img" :src="require(`../assets/${item.img}`)" alt="" style="width:100%;height:200px">
        <h3 class="text position-absolute top-50 start-50 translate-middle">{{ item.title }}</h3>
      </div>
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-lg-5 col-md-12 m-0 p-0">
      <img src="../assets/img11.jpg" alt="" style="width:100%">
    </div>
    <div class="col-lg-7 col-md-12 bg-light p-4 pt-5">
      <div class="d-flex justify-content-around mb-3">
        <h3 class="text-center text-warning fw-bold">Healthy</h3>
        <h3 class="text-center text-warning fw-bold">Real</h3>
        <h3 class="text-center text-warning fw-bold">Natural</h3>
      </div>

      <div class="d-flex justify-content-around">
        <i class="fas fa-running fs-1 text-warning"></i>
        <i class="fas fa-fish fs-1 text-warning"></i>
        <i class="fas fa-seedling fs-1 text-warning"></i>
      </div>
      <ul class="mt-3 ms-5">
        <li>挑選當季在地新鮮蔬菜，使用國產肉類</li>
        <li>選用大量天然食材；吃食物圓型，不吃加工食品</li>
        <li>烹煮使用水煮、水炒、清蒸等；不添加過多的調味料，保留食物原始的味道</li>
      </ul>
    </div>
  </div>
  </div>
  <div class="position-relative">
    <img src="../assets/img12.jpg" alt="" class="mt-5" style="width:100%; height:300px">
    <div class="subscribe position-absolute top-50 start-50 translate-middle border border-5 border-dark p-3 mt-3">
      <div class="text-dark bg-white p-3">
        <h3 class="">S u b s c r i b e</h3>
        <h5 class="">訂閱我們，隨時收到最新優惠通知！</h5>
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <div class="d-flex">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
          <button class="input-group-text btn bg-light" id="inputGroupPrepend" @click="subscribe">訂閱</button>
        </div>

      </div>
    </div>

  </div>
  <div class="coupons position-fixed top-50 start-50 translate-middle" :class="{ close: !modalOpen}">
    <i class="close fas fa-times-circle fs-3 text-dark" @click="modal"></i>
    <div class="coupon">
      <div class="coupon-intro text-dark">
        <h4>首次登入即可領取折扣碼</h4>
        <ul class="text-dark">
          <li>滿300即可使用</li>
          <li>限 2021-05-01-2021-12-31 使用</li>
          <li>折扣碼 : <span id="coupon">FIRSTLOGIN</span>
            <button class="btn btn-warning btn-sm ms-3" @click="copycoupon">複製折扣碼</button>
          </li>
        </ul>
      </div>
      <div class="coupon-value">
        8折
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { mapState } from "vuex"

export default {
  data () {
    return {
      categories: [
        { name: 'main', title: '主餐', img: 'main.jpg' },
        { name: 'light', title: '輕食', img: 'light.jpg' },
        { name: 'sweet', title: '甜點', img: 'sweet.jpg' },
        { name: 'drink', title: '飲品', img: 'drink.jpg' }
      ],
      email: '',
      modalOpen: true
    }
  },
  methods: {
    
    categoryBtn (categoryTitle) {
      this.$router.push({ path: '/menu', query: { category: categoryTitle } })
    },
    subscribe () {
      if (this.email === '') {
        this.$store.dispatch('msg', {
          Boolean: true,
          msg: '請輸入正確EMAIL格式',
          msgState: 'error'
        })
      } else {
        this.$store.dispatch('msg', {
          Boolean: true,
          msg: '訂閱成功'
        })
      }
    },
    modal () {
      this.modalOpen = !this.modalOpen
      this.$store.dispatch('mask', false)
    },
    copycoupon () {
      this.modalOpen = false
      const range = document.createRange()
      range.selectNode(document.getElementById('coupon'))
      const selection = window.getSelection()
      if (selection.rangeCount > 0) selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      this.$store.dispatch('msg', { msg: '複製折扣碼成功', Boolean: true })
    }
  },
  mounted () {
    this.$store.dispatch('mask', true)
  },
  computed: {
    ...mapState(["msgMask"])
  }
}
</script>
