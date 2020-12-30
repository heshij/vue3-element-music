<template>
    <div class="home-wrapper" v-if="bannerList.length>0">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.imageUrl">
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
      console.log('bannerList:', data.banners)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
.home-wrapper {
  width: 100%;
  padding-top: 20px;
}
</style>
