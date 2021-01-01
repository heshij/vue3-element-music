<template>
  <div class="recommend-songs-module">
    <h3>推荐歌单 <i class="el-icon-arrow-right"></i></h3>
    <div class="song-sheet-wrapper">
      <ul class="song-sheet-container" v-if="songSheet.length>0">
        <li v-for="item in songSheet" :key="item.id" @click="selectItem(item)">
          <el-image :src="item.picUrl + '?param=300y300'" lazy></el-image>
          <p>{{item.name}}</p>
          <span class="count"><i class="icon-play"></i> {{ $filters.tranNumber(item.playCount,0) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'RecommendSongs',
  props: {
    songSheet: {
      type: Array,
      default: () => []
    }
  },
  emits: ['callback'],
  setup () {
    const router = useRouter()
    const selectItem = (item) => {
      const query = {
        id: item.id
      }
      router.push({
        name: 'playlistDetail',
        query
      })
    }
    return {
      selectItem
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.recommend-songs-module {
  max-width: 1100px;
  min-width: 760px;
  margin: 0 auto;
  overflow: hidden;
  h3 {
    color: $--color-text-base;
    font-size: $--font-size-large;
    margin-bottom: 16px;
  }
  .song-sheet-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    > li {
      width: 19%;
      margin-bottom: 12px;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      p {
        width: 100%;
        font-size: $--font-size-base;
        color: #373737;
        line-height: 1.5;
        text-align: justify;
        @include multiline($num: 2);
      }
      .count {
        position: absolute;
        top: 6px;
        right: 12px;
        z-index: 9;
        font-size: $--font-size-base;
        color: #ffffff;
      }
    }
  }
}
</style>
