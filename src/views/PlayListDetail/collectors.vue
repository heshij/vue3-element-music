<template>
    <div class="collectors-module">
      <collectors-list :collectors-list="collectorsList" v-if="collectorsList.length>0"></collectors-list>
      <pagination :total="pageTotal" :limit="limit" @pagination="handlePlayListSubscribers"></pagination>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { getPlayListSubscribers } from '../../api'
import CollectorsList from '../../components/CollectorsList/CollectorsList'
import Pagination from '../../components/Pagination/Pagination'
export default {
  name: 'collectors',
  components: {
    Pagination,
    CollectorsList
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      collectorsList: [],
      pageTotal: 0,
      limit: 40,
      offset: 0,
      currentPage: 0
    })
    const handlePlayListSubscribers = async (query) => {
      const params = {
        id: route.query.id,
        limit: query !== undefined ? query.limit : state.limit,
        offset: query !== undefined ? query.offset : state.offset
      }
      const collectorsListData = await getPlayListSubscribers(params)
      state.collectorsList = collectorsListData.subscribers
      state.pageTotal = collectorsListData.total
      console.log('collectorsListData', collectorsListData)
      console.log('collectorsList', collectorsListData.subscribers)
    }
    onMounted(async () => {
      await handlePlayListSubscribers()
    })
    return {
      handlePlayListSubscribers,
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
