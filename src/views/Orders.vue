<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="80">購買時間</th>
          <th width="150">Email</th>
          <th>購買商品</th>
          <th width="120">應付金額</th>
          <th width="100">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order" :key="item.id">
          <td>{{ item.create_at }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul>
              <li v-for="product in item.products" :key="product.id">
                {{ product.product.title }}-{{ product.qty}}
              </li>
            </ul>
          </td>
          <td class="text-left">{{ item.total | currency }}</td>
          <td>{{ item.is_paid}}</td>
        </tr>
      </tbody>
    </table>
    <pagination :has_pre="pagination.has_pre" :has_next="pagination.has_next"
    :total_pages="pagination.total_pages" :current_page="pagination.current_page" @getData="getData" />
  </div>
</template>

<script>
import pagination from '../components/Pagination'
export default {
  components: {
    pagination
  },
  data () {
    return {
      pagination: {},
      order: {}
    }
  },
  methods: {
    getData (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMER}/orders?page=${page}`
      this.axios
        .get(api)
        .then(res => {
          console.log(res)
          this.order = res.data.orders
          const date = new Date(this.order.create_at).getTime()
          console.log(date)
          this.pagination = res.data.pagination
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>
