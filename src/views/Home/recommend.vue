<template>
    <div class="main-wrapper"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading">
      <div class="banner-wrapper" v-if="bannerList.length>0">
        <el-carousel :interval="5000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <div class="img-wrap">
              <img :src="item.imageUrl">
              <span :class="item.titleColor">{{item.typeTitle}}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <recommend-songs :song-sheet="songSheet"></recommend-songs>
      <exclusive-broadcast :personalizedList="personalizedList"></exclusive-broadcast>
    </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { getBanner, getRecommendSongs, getExclusiveBroadcast, getNewSong } from '../../api'
import RecommendSongs from './components/RecommendSongs'
import ExclusiveBroadcast from './components/ExclusiveBroadcast'

export default {
  name: 'home',
  components: { ExclusiveBroadcast, RecommendSongs },
  setup () {
    const state = reactive({
      loading: true,
      bannerList: [],
      songSheet: [],
      personalizedList: []
    })
    onMounted(async () => {
      state.loading = true
      const bannerData = await getBanner()
      const songSheetData = await getRecommendSongs()
      const personalizedData = await getExclusiveBroadcast()
      const newSongData = await getNewSong()
      state.bannerList = bannerData.banners
      state.songSheet = songSheetData.result
      state.personalizedList = personalizedData.result
      state.loading = false
      console.log('bannerList:', bannerData.banners)
      console.log('songSheet:', songSheetData.result)
      console.log('personalizedList:', personalizedData.result)
      console.log('newSongData:', newSongData.result)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.main-wrapper {
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 20px;
  .banner-wrapper {
    max-width: 1100px;
    min-width: 760px;
    margin: 0 auto;
    border-radius: 6px;
    overflow: hidden;
    .el-carousel__item .img-wrap {
      position: relative;
      width: 100%;
      height: inherit;
      z-index: 1;
      text-align: center;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2;
        object-fit: fill;
        border-radius: 6px;
      }
      span{
        display: block;
        padding: 4px 6px;
        border-bottom-right-radius: 6px;
        border-top-left-radius: 6px;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 9;
        color: white;
        font-size: $--font-size-extra-small;
      }
      .blue {
        background-color: #4A79CC;
      }
      .red {
        background-color: #CC4A4A;
      }
    }
    ::v-deep .el-carousel__button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    ::v-deep .el-carousel__indicator.is-active button {
      background-color: $theme-color;
    }
  }
  ::v-deep .el-loading-spinner i {
    font-size: 24px;
    color: $theme-color;
  }
  ::v-deep .el-loading-spinner .el-loading-text {
    font-size: 16px;
    color: #999999;
    padding: 12px 0;
  }
}
</style>
