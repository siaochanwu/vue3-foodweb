<template lang="">
  <nav class="col-md-2 d-none d-md-block bg-light sidebar" style="height:100vh">
    <div class="sidebar-sticky">
      <ul class="nav flex-column m-3">
        <span class="mt-2">管理員</span>
        <li class="nav-item">
            <router-link to="/admin/products" class="nav-link">產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupons" class="nav-link">優惠券</router-link>
        </li>
        <!-- <span>模擬功能</span>
        <li class="nav-item">
          <router-link to="/menu" class="nav-link">菜單</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/customer_order" class="nav-link">結帳區</router-link>
        </li> -->
      </ul>
    </div>
  </nav>
</template>
