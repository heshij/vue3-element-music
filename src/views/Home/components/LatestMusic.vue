<template>
  <div class="latest-music-module">
    <h3>最新音乐 <i class="el-icon-arrow-right"></i></h3>
    <div class="latest-music-wrapper">
      <ul class="latest-music-container" v-if="latestMusicList.length>0">
        <li v-for="item in latestMusicList" :key="item.id">
          <div class="img-wrap">
            <el-image :src="item.image+ '?param=50y50'" lazy></el-image>
            <i class="icon-play"></i>
          </div>
          <div class="text-wrap">
            <h3>{{item.name}}</h3>
            <span>{{item.singer}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LatestMusic',
  props: {
    latestMusicList: {
      type: Array,
      default: () => []
    }
  },
  setup () {
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";

  .latest-music-module {
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

    .latest-music-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;

      > li {
        width: 32.5%;
        height: 50px;
        margin-bottom: 12px;
        border-radius: 4px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        justify-content: flex-start;

        .img-wrap {
          position: relative;
          width: 50px;
          height: 50px;
          border: 1px solid $--border-color-base;
          border-radius: 4px;

          .icon-play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            color: $--color-white;
            font-size: $--font-size-extra-large;
          }
        }

        ::v-deep .el-image {
          border-radius: 4px;
        }

        .text-wrap {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          align-content: space-around;
          flex-wrap: wrap;
          flex: 1;
          padding: 0 12px;

          h3 {
            width: 100%;
            font-size: $--font-size-base;
            color: #373737;
            line-height: 1.5;
            text-align: justify;
            @include multiline($num: 1);
            margin-bottom: 0;
          }

          &:hover h3 {
            color: $--color-text-active;
          }

          span {
            font-size: $--font-size-extra-small;
            color: $--color-text-secondary;
          }
        }

        &:hover {
          background-color: $--bg-color-hover;
        }
      }
    }
  }
</style>
