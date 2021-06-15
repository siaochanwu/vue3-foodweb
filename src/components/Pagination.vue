<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getData(current_page-1)">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in total_pages" :key="page"
                    :class="{'active': current_page == page}">
                    <a class="page-link" href="#" @click.prevent="getData(page)">
                        {{page}}
                    </a>
                </li>
                <li class="page-item" :class="{'disabled': !has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getData(current_page+1)">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  props: ['has_pre', 'has_next', 'current_page', 'total_pages'],
  methods: {
    getData (current_page) {
      // console.log(current_page)
      this.$emit('getData', current_page)
    }
  }
}
</script>
