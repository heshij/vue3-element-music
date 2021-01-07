<template>
  <div class="recommend-mv-module">
    <h3>推荐MV <i class="el-icon-arrow-right"></i></h3>
    <div class="recommend-mv-wrapper">
      <ul class="recommend-mv-container" v-if="recommendMvList.length>0">
        <li v-for="item in recommendMvList" :key="item.id" @click="selectItem(item)">
          <span class="count"><i class="icon-play"></i> {{$filters.tranNumber(item.playCount, 0)}}</span>
          <el-image :src="item.picUrl+ '?param=356y200'" lazy></el-image>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'RecommendMv',
  props: {
    recommendMvList: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const router = useRouter()
    const selectItem = (item) => {
      const query = {
        id: item.id
      }
      router.push({
        name: 'mvDetail',
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
  .recommend-mv-module {
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
    .recommend-mv-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      > li {
        width: 24%;
        margin-bottom: 12px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        ::v-deep .el-image{
          border-radius: 4px;
          border: 1px solid $--border-color-base;
        }
        p {
          width: 100%;
          font-size: $--font-size-base;
          color: #373737;
          line-height: 1.5;
          text-align: justify;
          @include multiline($num: 2);
        }
        &:hover p {
          color: $--color-text-active;
        }
        .count {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 10;
          color: $--color-white;
          font-size: $--font-size-small;
          .icon-play {
          }
        }
      }
    }
  }
</style>
