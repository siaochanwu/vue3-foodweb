<template lang="">
  <footer class="container-fluid mt-5 border px-5 bg-secondary text-white position-relative">
    <div class="row mx-5 px-5">
      <div class="col-6 px-5 my-5 lh-1">
        <h3 class="fw-bold">營業時間</h3>
        <p class="fs-6">11 : 00 ~ 14 : 30 ( 最後點餐時間14 : 00 )</p>
        <p class="fs-6">17 : 00 ~ 22 : 00 ( 最後點餐時間21 : 00 )</p>
        <p><i class="fas fa-phone-alt"></i> : 02-778855688</p>
        <p><i class="fas fa-map-marked-alt"></i> : 110台北市信義區信義路五段7號</p>
        <p>追蹤我們</p>
        <a href="#" class="text-white"><i class="fab fa-facebook-square fs-3 pe-3"></i></a>
        <a href="#" class="text-white"><i class="fab fa-instagram fs-3 pe-3"></i></a>
        <a href="#" class="text-white"><i class="fab fa-line fs-3 pe-3"></i></a>
      </div>
      <div class="col-6">
        <div id="map" class=" mt-5" style="width:100%; height:250px"></div>
      </div>
    </div>
    <p class="text-center">Copyright © 2021 EatWell Limited. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      map: null,
      lat: 25.0328589,
      lng: 121.565174
    }
  },
  methods: {
    // 建立地圖
    initMap () {
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.map = new google.maps.Map(document.getElementById("map"), {
        // 設定地圖的中心點經緯度位置
        center: { lat: this.lat, lng: this.lng },
        // 設定地圖縮放比例 0-20
        zoom: 15,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 10,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false
      })
    },
    setMarker () {
      // 建立一個新地標
      let marker = new google.maps.Marker({
        // 設定地標的座標
        position: { lat: this.lat, lng: this.lng },
        // 設定地標要放在哪一個地圖
        map: this.map
      })
    }
  },
  mounted () {
    this.initMap()
    this.setMarker()
  }
}
</script>
