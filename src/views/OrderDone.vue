<template>
  <div class="OrderDone">
    <loading :active.sync="isLoading">
    <!-- 客製樣式 -->
      <div class="load-wrapp">
        <div class="load-3">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      </div>
    </loading>
    <div class="container">
      <div class="mt-5 border p-4 border-dark border-3 mb-5">
        <i class="far fa-check-circle text-success"></i>
        <h3 class="text-dark mt-3">已經收到您的訂單</h3>
        <h2 class="text-dark mt-3">訂單標號:</h2>
        <h3 class="text-dark mt-3">{{ orderId }}</h3>
        <div class="text-start alert mt-2">恭喜您完成訂單!<br>
        確認付款後我們將會於兩小時內將餐點送到您指定的地點<br>
        *本店僅提供雙北的外送服務，其餘地區暫無提共外送服務，敬請見諒</div>
      </div>
      <router-link to="/"><button class="btn btn-outline-secondary p-2 m-2">回到首頁</button></router-link>
      <router-link to="/menu"><button class="btn btn-success p-2 m-2">繼續購物</button></router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['isLoading', 'orderId'])
  }
}
</script>
