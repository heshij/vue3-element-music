<template>
    <div class="exclusive-broadcast-module">
      <h3>独家放送 <i class="el-icon-arrow-right"></i></h3>
      <div class="exclusive-broadcast-wrapper">
        <ul class="exclusive-broadcast-container" v-if="personalizedList.length>0">
          <li v-for="item in personalizedList" :key="item.id" @click="selectItem(item)">
            <i class="icon-play"></i>
            <el-image :src="item.sPicUrl+ '?param=356y200'" lazy></el-image>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'ExclusiveBroadcast',
  props: {
    personalizedList: {
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
  .exclusive-broadcast-module {
    max-width: 1100px;
    min-width: 760px;
    margin: 0 auto;
    overflow: hidden;
    h3 {
      color: $--color-text-base;
      font-size: $--font-size-large;
      margin-bottom: 16px;
    }
    .exclusive-broadcast-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      > li {
        width: 32.5%;
        margin-bottom: 12px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        ::v-deep .el-image{
          border-radius: 4px;
          border: 1px solid #e1e1e1;
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
        .icon-play {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 10;
          color: $--color-white;
          font-size: $--font-size-extra-large;
        }
      }
    }
  }
</style>
