<template lang="">
<div class="Menu">
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
    <div class="row mt-3">
      <div class="col-2 mt-5 pt-2">
        <div class="list-group" style="width:100%">
          <a
            href="#"
            class="list-group-item list-group-item-action active list-group-item-light"
            aria-current="true"
          >
            ALL
          </a>
          <a
            href="#"
            class="list-group-item list-group-item-action list-group-item-light"
            @click="category = 'main'"
            >主餐</a
          >
          <a
            href="#"
            class="list-group-item list-group-item-action list-group-item-light"
            @click="category = 'light'"
            >輕食</a
          >
          <a
            href="#"
            class="list-group-item list-group-item-action list-group-item-light"
            @click="category = 'sweet'"
            >甜點</a
          >
          <a
            href="#"
            class="list-group-item list-group-item-action list-group-item-light"
            @click="category = 'drink'"
            >飲品</a
          >
          <a
            href="#"
            class="list-group-item list-group-item-action list-group-item-light"
            @click="category = 'alcohol'"
            >酒精</a
          >
        </div>
      </div>
      <div class="col-10">
        <!-- 資料篩選 -->
        <div class="dropdown container mb-3">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            排序依據
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button class="dropdown-item" @click="category = 'decending'">
                價格 : 由低到高
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="category = 'ascending'">
                價格 : 由高到低
              </button>
            </li>
          </ul>
        </div>

        <div class="container marketing" id="menu">
          <!-- Three columns of text below the carousel -->
          <div class="row">
            <div
              class="col-lg-4 col-md-6 col-sm-12"
              v-for="item in filterData"
              :key="item.id"
            >
              <div class="card">
                <div class="card-body">
                  <router-link :to="`/menu/${item.id}`">
                  <div
                    style="height: 150px; background-size: cover; background-position: center"
                    :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  ></div>
                  </router-link>
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary float-right ml-2">{{
                    item.category
                  }}</span>
                  <h5 class="card-title">
                    <a
                      href="#"
                      class="text-dark fw-bold text-decoration-none"
                      >{{ item.title }}</a
                    >
                  </h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <div class="h5" v-if="!item.price">
                      {{ item.origin_price }} 元
                    </div>
                    <del class="h6" v-if="item.price">
                      原價 {{ item.origin_price }} 元
                    </del>
                    <div class="h5" v-if="item.price">
                      現在只要 {{ item.price }} 元
                    </div>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                  <!-- <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#productModal" @click="getProduct(item.id)">
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem === item.id"
              ></i>
              查看更多
            </button> -->
                  <i
                    class="far fa-heart fs-3"
                    :class="{ none: item.isFollow }"
                    @click="follow(item)"
                  ></i>
                  <i
                    class="fas fa-heart fs-3"
                    :class="{ none: !item.isFollow }"
                    @click="unfollow(item)"
                  ></i>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addtoCart(item.id)"
                  >
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.loadingItem === item.id"
                    ></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- modal -->
            <div
              class="modal fade"
              id="productModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {{ product.title }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid" alt="" />
                    <blockquote class="blockquote mt-3">
                      <p class="mb-0">{{ product.content }}</p>
                      <footer class="blockquote-footer text-right">
                        {{ product.description }}
                      </footer>
                    </blockquote>
                    <div
                      class="d-flex justify-content-between align-items-baseline"
                    >
                      <div class="h4" v-if="!product.price">
                        {{ product.origin_price }} 元
                      </div>
                      <del class="h6" v-if="product.price"
                        >原價 {{ product.origin_price }} 元</del
                      >
                      <div class="h4" v-if="product.price">
                        現在只要 {{ product.price }} 元
                      </div>
                    </div>
                    <select
                      name=""
                      class="form-control mt-3"
                      v-model="product.num"
                    >
                      <option :value="num" v-for="num in 10" :key="num">
                        選購 {{ num }} {{ product.unit }}
                      </option>
                    </select>
                  </div>
                  <div class="modal-footer">
                    <div class="text-muted text-nowrap mr-3">
                      小計
                      <strong>{{ product.num * product.price }}</strong> 元
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addtoCart(product.id, product.num)"
                    >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="product.id === status.loadingItem"
                      ></i>
                      加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import $ from "jquery"
import { mapGetters } from "vuex"
import { mapState } from 'vuex'

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      cart: {},
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      category: ""
      // isFollow: false
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/products/all`
      this.$store.dispatch("loading", true)
      this.$http.get(api).then(response => {
        vm.products = response.data.products
        for (let i = 0; i < vm.products.length; i++) {
          vm.$set(vm.products[i], "isFollow", false)
          vm.favorites.forEach(item => {
            if (vm.products[i].id === item.id) {
              console.log(item)
              vm.isFollow = true
            }
          });
        }
        console.log(response)
        this.$store.dispatch("loading", false)
      });
    },
    getProduct(id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/product/${id}`
      vm.status.loadingItem = id
      this.$http.get(api).then(response => {
        vm.product = response.data.product
        vm.status.loadingItem = ""
      })
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const vm = this;
      this.$store.dispatch("loading", true);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart`;
      this.$http.get(api).then(response => {
        console.log(response);
        vm.cart = response.data.data;
        this.$store.dispatch("loading", false);
      });
    },
    removeItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/cart/${id}`;
      this.$store.dispatch("loading", true);
      this.$http.delete(api).then(response => {
        console.log(response);
        vm.getCart();
        this.$store.dispatch("loading", false);
      });
    },
    follow(product) {
      this.$store.dispatch("addToFavorite", product)
      product.isFollow = true
    },
    unfollow(product) {
      this.$store.dispatch("removeFavorite", product)
      product.isFollow = false
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  computed: {
    filterData: function() {
      if (this.category === "main") {
        var main = [];
        this.products.forEach(function(item) {
          if (item.category === "主餐") {
            main.push(item);
          }
        });
        return main;
      } else if (this.category === "light") {
        var light = [];
        this.products.forEach(function(item) {
          if (item.category === "輕食") {
            light.push(item);
          }
        });
        return light;
      } else if (this.category === "sweet") {
        var sweet = [];
        this.products.forEach(function(item) {
          if (item.category === "甜點") {
            sweet.push(item);
          }
        });
        return sweet;
      } else if (this.category === "drink") {
        var drink = [];
        this.products.forEach(function(item) {
          if (item.category === "飲品") {
            drink.push(item);
          }
        });
        return drink;
      } else if (this.category === "alcohol") {
        var alcohol = [];
        this.products.forEach(function(item) {
          if (item.category === "酒精") {
            alcohol.push(item);
          }
        });
        return alcohol;
      } else if (this.category === "decending") {
        return this.products.sort((a, b) => {
          a = a.price;
          b = b.price;
          return a - b;
        });
      } else if (this.category === "ascending") {
        return this.products.sort((a, b) => {
          a = a.price;
          b = b.price;
          return b - a;
        });
      } else {
        return this.products;
      }
    },
    ...mapGetters(["favorites"]),
    ...mapState(["isLoading"])

  }
};
</script>
