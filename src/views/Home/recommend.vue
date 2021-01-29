<template>
    <div class="main-wrapper"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="transparent">
      <banner :banner-list="bannerList" v-if="bannerList.length>0"></banner>
      <recommend-songs :song-sheet="songSheet" :loading="loading"></recommend-songs>
      <exclusive-broadcast :personalizedList="personalizedList"></exclusive-broadcast>
      <latest-music :latest-music-list="latestMusicList"></latest-music>
      <recommend-mv :recommend-mv-list="recommendMvList" ></recommend-mv>
      <recommend-radio :recommend-radio-list="recommendRadioList"></recommend-radio>
    </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { getBanner, getRecommendSongs, getExclusiveBroadcast, getNewSong, getRecommendMV, getRecommendRadio } from '../../api'
import { createSong } from '../../utils/song'
import RecommendSongs from './components/RecommendSongs'
import ExclusiveBroadcast from './components/ExclusiveBroadcast'
import LatestMusic from './components/LatestMusic'
import RecommendMv from './components/RecommendMv'
import RecommendRadio from './components/RecommendRadio'
import Banner from './components/Banner'

export default {
  name: 'home',
  components: { Banner, RecommendRadio, RecommendMv, LatestMusic, ExclusiveBroadcast, RecommendSongs },
  setup () {
    const state = reactive({
      loading: true,
      bannerList: [],
      songSheet: [],
      personalizedList: [],
      latestMusicList: [],
      recommendMvList: [],
      recommendRadioList: []
    })
    // eslint-disable-next-line no-unused-vars
    const normalizedSongs = (list) => {
      const ret = []
      list.map(item => {
        if (item.id) {
          ret.push(createSong(item.song))
        }
      })
      return ret
    }
    onMounted(async () => {
      state.loading = true
      const bannerData = await getBanner()
      const songSheetData = await getRecommendSongs()
      const personalizedData = await getExclusiveBroadcast()
      const newSongData = await getNewSong()
      const recommendMVData = await getRecommendMV()
      const recommendRadioData = await getRecommendRadio()
      state.bannerList = bannerData.banners
      state.songSheet = songSheetData.result
      state.personalizedList = personalizedData.result
      state.latestMusicList = normalizedSongs(newSongData.result)
      state.recommendMvList = recommendMVData.result
      state.recommendRadioList = recommendRadioData.result
      state.loading = false
      console.log('bannerList:', bannerData.banners)
      console.log('songSheet:', songSheetData.result)
      console.log('personalizedList:', personalizedData.result)
      console.log('latestMusicList:', normalizedSongs(newSongData.result))
      console.log('recommendMvList:', recommendMVData.result)
      console.log('recommendRadioList:', recommendRadioData.result)
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
