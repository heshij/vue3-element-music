<template>
    <div class="song-list-wrap">
      <el-skeleton :loading="loading" animated :count="6" :throttle="500">
        <template #template>
          <div class="el-skeleton-wrapper">
            <el-skeleton-item variant="h3" style="width: 80%;margin-bottom: 12px"/>
            <el-skeleton-item variant="h3"/>
          </div>
        </template>
        <template #default>
          <ul class="list-con">
            <li>
              <span class="sort-num"></span>
              <div class="icon-wrapper"></div>
              <span class="song-name">音乐标题</span>
              <span class="singer-name">歌手</span>
              <span class="album-name">专辑</span>
              <span class="song-time">时长</span>
            </li>
            <li v-for="(item, index) in songList"
                :key="item.id"
                :class="index == currentIndex && currentSong.id == item.id && playing ? 'playing' : ''"
            >
              <span class="sort-num">{{index + 1}}</span>
              <div class="icon-wrapper">
                <i class="icon-like"></i>
                <i class="icon-download"></i>
              </div>
              <span class="song-name" :title="item.name" @click="playSong(item, index)">{{item.name}}</span>
              <span class="singer-name" :title="item.singer">{{item.singer}}</span>
              <span class="album-name" :title="item.album">{{item.album}}</span>
              <span class="song-time">{{$filters.formatSecondTime(item.duration)}}</span>
            </li>
          </ul>
        </template>
      </el-skeleton>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore, createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('songs')

export default {
  name: 'SongItem',
  props: {
    songList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const store = useStore()
    const getters = mapGetters(['playing', 'currentIndex', 'currentSong'])
    const playing = computed(getters.playing.bind({ $store: store }))
    const currentIndex = computed(getters.currentIndex.bind({ $store: store }))
    const currentSong = computed(getters.currentSong.bind({ $store: store }))
    const actions = mapActions(['selectPlay', 'saveHistoryList'])
    const selectPlay = actions.selectPlay.bind({ $store: store })
    const playSong = (item, index) => {
      // console.log('currentSong:', currentSong.value)
      selectPlay({
        list: props.songList,
        index
      })
    }
    return {
      props,
      playSong,
      playing,
      currentIndex,
      currentSong
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  @mixin itemBox {
    display: block;
    padding: 0 12px;
    @include multiline($num: 1);
  }
  .list-con li {
    display: flex;
    justify-content: flex-start;
    height: 34px;
    line-height: 34px;
    font-size: $--font-size-base;
    color: #656565;
    &.playing span{
      color: $theme-color;
    }
    &:first-child:hover {
      background-color: $--color-white;
    }
    &:nth-child(odd) {
      background-color: #ffffff;
    }
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    &:first-child, &:first-child .song-name {
      color: $--color-text-secondary !important;
    }
    &:hover {
      background-color: #f0f1f2;
    }
    span {
      cursor: default;
    }
    .sort-num {
      display: block;
      width: 40px;
      text-align: center;
      color: #cfcfcf;
      font-size: $--font-size-small;
    }
    .icon-wrapper {
      width: 60px;
      display: flex;
      justify-content: space-around;
      color: #b3b3b3;
      margin: 0 12px;
    }
    .song-name {
      flex: 1;
      color: $--color-text-base;
      @include itemBox;
      cursor: pointer;
    }
    .singer-name {
      width: 30%;
      @include itemBox
    }
    .album-name {
      width: 20%;
      @include itemBox
    }
    .song-time {
      width: 10%;
      @include itemBox
    }
  }
</style>
