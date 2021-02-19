<template>
    <div class="playlist-sidebar--wrapper">
      <div class="sidebar-container">
        <div class="sidebar__header">
          <span>播放列表</span>
          <span>历史记录</span>
        </div>
        <div class="sidebar__main--wrapper">
          <div class="sidebar__main--handle">
            <span>总120首</span>
            <div class="handle-wrapper">
              <span><i class="el-icon-folder-add"></i>收藏全部</span>
              <span><i class="el-icon-delete"></i>清空</span>
            </div>
          </div>
          <div class="sidebar__main--list">
            <ul class="playlist-wrapper">
              <li>
                <span class="song-name">音乐标题</span>
                <span class="singer-name">歌手</span>
                <span class="album-name el-icon-link">专辑</span>
                <span class="song-time">时长</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'PlaylistSidebar'
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
    }
  }
</style>
