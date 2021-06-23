<template lang="">
<div class="container">
  <br class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading mb-5 mt-5">向醫護人員們致敬</h2>
        <p class="lead">醫護及軍警消人員即日起至2021/6/30，至本店外帶餐點即享5折優惠。</p>
        <p class="lead">除了大力支援醫院餐食，並提供防疫旅館外送服務外，即日起至6月30日至全台門市外帶不限消費金額，醫護人員出示執業執照、防疫人員出示疾管署工作證，可享蒸餃子免費兌換1籠。</p>
        <p class="fs-3">折扣碼 :
          <span id="coupon" class="badge bg-light text-dark fs-3">FIGHTCOVID</span>
          <input type="button" class="btn btn-warning" @click="copycoupon" value="複製折扣碼" />
        </p>

      </div>
      <div class="col-md-5 overflow-hidden">
        <img src="../assets/img1.jpg" alt="">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading mt-5 mb-5">2021草莓季回歸 !</h2>
        <p class="lead">眾人期待的草莓季強勢回歸啦!去年在網路上爆紅的草莓蛋糕就在5/15再度回歸</p>
        <p class="lead">即日起至2021/8/30，速度不快就要再等一年啦。</p>

      </div>
      <div class="col-md-5 order-md-1">
        <img src="../assets/img4.jpg" style="width:90%" alt="">
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading mt-4 mb-5">健人們 ! 有口福啦 !</h2>
        <p class="lead">眾所期待的好消息!本店與花椰菜健身房聯名推出健身餐盒，
          讓健身的你不用擔心蛋白質補充不足、營養不均衡，這次的聯名餐盒都是由合格營養師把關核可。</p>
        <p>**凡出示花椰菜健身房會員卡即可享八折優惠。</p>
        <p class="fs-3">折扣碼 :
          <span id="coupongym" class="badge bg-light text-dark fs-3">BROCCOLIGYM</span>
          <input type="button" class="btn btn-warning" @click="copycoupongym" value="複製折扣碼" />
        </p>
      </div>
      <div class="col-md-5">
        <img src="../assets/img5.jpg" style="width:100%" alt="">
      </div>
    </div>
</div>
</template>

<script>
export default {
  methods: {
    copycoupon () {
      const range = document.createRange()
      range.selectNode(document.getElementById('coupon'))
      const selection = window.getSelection()
      if (selection.rangeCount > 0) selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      this.$store.dispatch('msg', { msg: '複製折扣碼成功', Boolean: true })
    },
    copycoupongym () {
      const range = document.createRange()
      range.selectNode(document.getElementById('coupongym'))
      const selection = window.getSelection()
      if (selection.rangeCount > 0) selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      this.$store.dispatch('msg', { msg: '複製折扣碼成功', Boolean: true })
    }
  }
}
</script>
