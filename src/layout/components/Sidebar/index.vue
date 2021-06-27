<template>
    <div class="sidebar-wrapper">
      <ul class="sidebar-list">
        <li>
          <router-link to="/home" tag="a">发现音乐</router-link>
        </li>
        <li>
          <router-link to="/video" tag="a">视频</router-link>
        </li>
        <li>
          <router-link to="/friends" tag="a">朋友</router-link>
        </li>
        <li>
          <router-link to="/fm" tag="a">私人FM</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="scss">
  .sidebar-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 200px;
    height: 100%;
    padding-top: 60px;
    padding-bottom: 72px;
    background-color: $--color-white;
    border-right: 1px solid $--border-color-base;
    .sidebar-list {
      font-size: $--font-size-small;
      padding: 0 12px;
      >li {
        list-style: none;
        padding: 4px 0;
        >a {
          display: block;
          width: 100%;
          height: 34px;
          padding: 0 8px;
          line-height: 34px;
          border-radius: 4px;
          color: $--color-text-base;
          transition: all .28s;
          &.router-link-active{
            color: $--color-text-active;
            font-size: $--font-size-medium;
            font-weight: 700;
            background-color: #f6f6f7;
          }
          &:hover {
            background-color: #f6f6f7;
          }
        }
      }
    }
  }
</style>
