<template>
    <div class="music-header">
      <div class="music-logo">
        <span class="icon-logo"></span>
        <strong>网抑云音乐</strong>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="scss">
  @import "@/styles/variables.scss";
  .music-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 60px;
    padding: 0 20px;
    background-color: $theme-color;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    color: $--color-white;
    .music-logo .icon-logo {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 50%;
      text-align: center;
      background-color: $--color-white;
      color: $theme-color;
      margin-right: 6px;
      font-size: 16px;
    }
  }
</style>
