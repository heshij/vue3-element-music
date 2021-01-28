<template>
    <div class="collectors-module">
      <collectors-list :collectors-list="collectorsList" v-if="collectorsList.length>0"></collectors-list>
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="limit"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { getPlayListSubscribers } from '../../api'
import CollectorsList from '../../components/CollectorsList/CollectorsList'
export default {
  name: 'collectors',
  components: { CollectorsList },
  setup () {
    const route = useRoute()
    const state = reactive({
      collectorsList: [],
      pageTotal: 0,
      limit: 20,
      offset: 0,
      currentPage: 0
    })
    const handleSizeChange = (val) => {
      state.limit = val
      state.offset = state.limit * state.currentPage
      _getPlayListSubscribers()
    }
    const handleCurrentChange = (val) => {
      state.currentPage = val
      state.offset = (val - 1) * state.limit
      _getPlayListSubscribers()
    }
    const _getPlayListSubscribers = async () => {
      const params = {
        id: route.query.id,
        limit: state.limit,
        offset: state.offset
      }
      const collectorsListData = await getPlayListSubscribers(params)
      state.collectorsList = collectorsListData.subscribers
      state.pageTotal = collectorsListData.total
      console.log('collectorsListData', collectorsListData)
      console.log('collectorsList', collectorsListData.subscribers)
    }
    onMounted(async () => {
      await _getPlayListSubscribers()
    })
    return {
      handleSizeChange,
      handleCurrentChange,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
.collectors-module {
  padding: 16px 0;
}
</style>
