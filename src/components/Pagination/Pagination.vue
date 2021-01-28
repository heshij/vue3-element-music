<template>
  <div class="pagination-container">
    <el-pagination
      :background="background"
      hide-on-single-page
      :layout="layout"
      :current-page="currentPage"
      :page-size="limit"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { scrollTo } from '@/utils/scroll-to'
export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    offset: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: false
    }
  },
  emits: ['pagination'],
  setup (props, ctx) {
    const currentPage = computed({
      get () {
        return props.page
      },
      set (val) {
        ctx.emit('update:page', val)
      }
    })
    const handleSizeChange = (val) => {
      ctx.emit('pagination', { offset: props.limit * currentPage.value, limit: val })
      console.log(props.limit * currentPage.value)
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
    }
    const handleCurrentChange = (val) => {
      ctx.emit('pagination', { page: val, offset: (val - 1) * props.limit })
      // console.log(val)
      // console.log((val - 1) * props.limit)
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
    }
    return {
      props,
      currentPage,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>
  .pagination-container {
    background: #fff;
    padding: 32px 16px;
  }
</style>
