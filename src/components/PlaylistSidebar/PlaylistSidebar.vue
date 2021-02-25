<template>
    <div class="playlist-sidebar--wrapper" v-show="isShow">
      <div class="sidebar-container">
        <div class="sidebar__header">
          <div class="tab">
            <span class="active">播放列表</span>
            <span>历史记录</span>
          </div>
          <div class="sidebar__main--handle">
            <span>总{{songList.length}}首</span>
            <div class="handle-wrapper">
              <span><i class="el-icon-folder-add"></i>收藏全部</span>
              <span><i class="el-icon-delete"></i>清空</span>
            </div>
          </div>
        </div>
        <div class="sidebar__main--wrapper">
          <div class="sidebar__main--list">
            <ul class="playlist-wrapper">
              <li v-for="item in songList"
                  :key="item.id"
                  :class="getters.currentSong.id === item.id && getters.playing ? 'playing' : ''"
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
import { useStore } from 'vuex'
import { computed } from 'vue'
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
    const store = useStore()
    const getters = computed(() => {
      return {
        currentSong: store.getters['songs/currentSong'],
        playing: store.getters['songs/playing']
      }
    })
    return {
      getters
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
      background-color: $--color-white;
      box-shadow: -4px -1px 8px rgba(0,0,0,.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .sidebar__header{
        height: 110px;
        .tab {
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
        .sidebar__main--handle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 36px;
          margin: 0 24px;
          border-bottom: 1px solid $--border-color-base;
          > span {
            font-size: $--font-size-extra-small;
            color: $--color-text-secondary;
          }
          .handle-wrapper {
            display: flex;
            justify-content: flex-start;
            span {
              display: block;
              padding: 0 12px;
              font-size: $--font-size-medium;
              color: $--color-text-base;
              cursor: pointer;
              &:hover {
                color: $theme-color;
              }
              i {
                margin-right: 4px;
              }
            }
          }
        }
      }
      .sidebar__main--wrapper {
        flex:1;
        height: calc(100% - 110px);
        overflow-y: scroll;
        @include scrollBar;
        .sidebar__main--list {
          .playlist-wrapper li {
            display: flex;
            justify-content: flex-start;
            height: 34px;
            line-height: 34px;
            font-size: $--font-size-base;
            color: #656565;
            &.playing span{
              color: $theme-color;
            }
            &:nth-child(odd) {
              background-color: #ffffff;
            }
            &:nth-child(even) {
              background-color: #f9f9f9;
            }
            &:hover {
              background-color: #f0f1f2;
            }
            span {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              cursor: default;
              line-height: 34px;
            }
            .song-name {
              flex: 1;
              color: $--color-text-base;
              @include itemBox;
              cursor: pointer;
              padding-left: 24px;
            }
            .singer-name {
              width: 30%;
              @include itemBox
            }
            .album-name {
              width: 10%;
              cursor: pointer;
              @include itemBox
            }
            .song-time {
              width: 20%;
              @include itemBox
            }
          }
        }
      }
    }
  }
</style>
