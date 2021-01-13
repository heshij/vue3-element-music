<template>
  <div class="main-wrapper">
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListDetail } from '../../api'
export default {
  name: 'index',
  setup () {
    const route = useRoute()
    const state = reactive({
      detail: {}
    })
    onMounted(async () => {
      const id = route.query.id
      const data = await getPlayListDetail(id, 8)
      console.log(data)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
  .main-wrapper {
    width: 100%;
    min-height: calc(100vh - 60px);
    padding-top: 20px;
  }
</style>
