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
      default: true
    }
  },
  emits: ['pagination'],
  setup (props, ctx) {
    const { limit } = toRefs(props)
    const state = reactive({
      currentPage: 0
    })
    const handleSizeChange = (val) => {
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
      limit.value = val
      const offset = state.offset = props.limit * state.currentPage
      ctx.emit('pagination', { offset, limit: limit.value })
    }
    const handleCurrentChange = (val) => {
      if (props.autoScroll) {
        scrollTo(0, 800)
      }
      state.currentPage = val
      const offset = (val - 1) * limit.value
      ctx.emit('pagination', { offset, limit: limit.value })
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

<style scoped lang="scss">
  .pagination-container {
    background: #fff;
    padding: 16px 0 36px 0;
    position: relative;
    ::v-deep .el-pagination {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99;
    }
  }
</style>
