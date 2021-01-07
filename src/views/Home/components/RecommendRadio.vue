<template>
  <div class="recommend-radio-module">
    <h3>主播电台 <i class="el-icon-arrow-right"></i></h3>
    <div class="recommend-radio-wrapper">
      <ul class="recommend-radio-container" v-if="recommendRadioList.length>0">
        <li v-for="item in recommendRadioList" :key="item.id" @click="selectItem(item)">
          <div class="img-wrap">
            <el-image :src="item.picUrl + '?param=300y300'" lazy></el-image>
            <span>{{item.name}}</span>
          </div>
          <p>{{item.copywriter}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'RecommendRadio',
  props: {
    recommendRadioList: {
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
        name: 'radioDetail',
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
  .recommend-radio-module {
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
    .recommend-radio-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
      > li {
        width: 16%;
        margin-bottom: 12px;
        position: relative;
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
        ::v-deep .el-image{
          border-radius: 4px;
          border: 1px solid #e1e1e1;
        }
        .img-wrap {
          position: relative;
          span {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 12px;
            position: absolute;
            bottom: 5px;
            left: 0;
            z-index: 10;
            font-size: $--font-size-base;
            color: $--color-white;
            background-color: rgba(0,0,0,.1);
            @include multiline($num: 1);
          }
        }
      }
    }
  }
</style>
