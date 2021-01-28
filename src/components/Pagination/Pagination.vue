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
import { defineComponent, reactive, toRefs } from 'vue'
import { scrollTo } from '@/utils/scroll-to'
export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    currentPage: {
      type: Number,
      default: 0
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
    const { limit } = toRefs(props)
    const state = reactive({
      currentPage: 0
    })
    const handleSizeChange = (val) => {
      // ctx.emit('pagination', { offset: props.limit * props.currentPage, limit: val })
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
      // limit.value = val
      // state.offset = props.limit * state.currentPage
      ctx.emit('pagination', { offset: props.limit * state.currentPage, limit: val })
    }
    const handleCurrentChange = (val) => {
      // ctx.emit('pagination', { page: val, offset: (val - 1) * props.limit })
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
      state.currentPage = val
      // state.offset = (val - 1) * limit.value
      ctx.emit('pagination', { offset: (val - 1) * limit.value, limit: val })
    }
    return {
      props,
      handleSizeChange,
      handleCurrentChange,
      ...toRefs(state)
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
