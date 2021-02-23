<template>
    <div class="playlist-sidebar--wrapper" v-show="isShow">
      <div class="sidebar-container">
        <div class="sidebar__header">
          <span class="active">播放列表</span>
          <span>历史记录</span>
        </div>
        <div class="sidebar__main--wrapper">
          <div class="sidebar__main--handle">
            <span>总{{songList.length}}首</span>
            <div class="handle-wrapper">
              <span><i class="el-icon-folder-add"></i>收藏全部</span>
              <span><i class="el-icon-delete"></i>清空</span>
            </div>
          </div>
          <div class="sidebar__main--list">
            <ul class="playlist-wrapper">
              <li v-for="item in songList"
                  :key="item.id"
              >
                <span class="song-name" :title="item.name">{{item.name}}</span>
                <span class="singer-name" :title="item.singer">{{item.singer}}</span>
                <span class="album-name el-icon-link" :title="item.album"></span>
                <span class="song-time">{{$filters.formatSecondTime(item.duration)}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PlaylistSidebar',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    songList: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    console.log(props.songList)
    return {}
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .playlist-sidebar--wrapper {
    position: fixed;
    top: 0;
    bottom: 72px;
    right: 0;
    z-index: 9998;
    width: 420px;
    height: 100%;
    padding: 60px 0 72px 0;
    .sidebar-container {
      width: 100%;
      height: 100%;
      padding: 0 18px;
      background-color: $--color-white;
      box-shadow: -4px -1px 8px rgba(0,0,0,.1);
      overflow: hidden;
      .sidebar__header {
        display: flex;
        justify-content: center;
        margin: 20px auto;
        border: 1px solid $--border-color-bbb;
        width: 70%;
        border-radius: 16px;
        span {
          display: block;
          width: 50%;
          border-radius: 16px;
          padding: 8px 0;
          font-size: $--font-size-base;
          color: $--color-text-base;
          cursor: pointer;
          text-align: center;
          &.active {
            background-color: $--border-color-bbb;
            color: $--color-white;
            font-weight: 700;
          }
        }
      }
    }
  }
</style>
