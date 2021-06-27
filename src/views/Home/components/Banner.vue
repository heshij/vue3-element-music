<template>
  <div class="banner-wrapper">
    <el-carousel :interval="5000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <div class="img-wrap">
          <img :src="item.imageUrl">
          <span :class="item.titleColor">{{item.typeTitle}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    bannerList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>
