<template>
    <div class="home-wrapper">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item) in bannerList" v-bind:key="item.encodeId">
          <img :src="item.imgUrl">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { getBanner } from '../../api'

export default {
  name: 'home',
  setup () {
    const state = reactive({
      bannerList: []
    })
    onMounted(async () => {
      const data = await getBanner()
      state.bannerList = data.banners
      console.log(data)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.home-wrapper {
  width: 100%;
}
</style>
