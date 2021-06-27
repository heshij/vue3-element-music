<template>
  <div class="recommend-songs-module">
    <h3>推荐歌单 <i class="el-icon-arrow-right"></i></h3>
    <div class="song-sheet-wrapper">
      <el-skeleton :loading="loading" animated :count="3" :throttle="500">
        <template #template>
          <div class="el-skeleton-wrapper">
            <el-skeleton-item
              variant="image"
              style="width: 90%;height: 200px"
            />
            <div style="padding: 14px 0;width: 90%;">
              <el-skeleton-item variant="h3"/>
              <el-skeleton-item variant="text" style="width: 40%;" />
            </div>
          </div>
        </template>
        <template #default>
          <ul class="song-sheet-container">
            <li v-for="item in songSheet" :key="item.id" @click="selectItem(item)">
              <div class="img-wrap">
                <el-image :src="item.picUrl + '?param=300y300'" lazy></el-image>
              </div>
              <p>{{item.name}}</p>
              <span class="count"><i class="icon-play"></i> {{ $filters.tranNumber(item.playCount,1) }}</span>
            </li>
          </ul>
        </template>
      </el-skeleton>
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
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
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
.recommend-songs-module {
  max-width: 1100px;
  min-width: 760px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 20px;
  h3 {
    color: $--color-text-base;
    font-size: $--font-size-large;
    margin-bottom: 16px;
  }
  .el-skeleton {
    display: flex;
    justify-content: space-between;
    .el-skeleton-wrapper {
      width: 33.3%;
    }
  }
  .song-sheet-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    > li {
      position: relative;
      width: 19%;
      margin-bottom: 12px;
      overflow: hidden;
      cursor: pointer;
      .img-wrap {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        ::v-deep .el-image{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: 1px solid #e1e1e1;
        }
      }
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
