<template>
  <div class="home-wrapper">
    <div class="second-level-nav">
      <ul>
        <li><router-link to="/home/recommend" tag="a">个性推荐</router-link></li>
        <li><router-link to="/home/playlist" tag="a">歌单</router-link></li>
        <li><router-link to="/home/rank" tag="a">排行榜</router-link></li>
        <li><router-link to="/home/singer" tag="a">歌手</router-link></li>
        <li><router-link to="/home/latestmusic" tag="a">最新音乐</router-link></li>
      </ul>
    </div>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="scss">
  .home-wrapper {
    width: 100%;
    min-height: calc(100vh - 60px);
    padding-top: 20px;
    .second-level-nav ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      margin: 0;
      padding: 0;
      > li {
        list-style: none;
        padding: 4px 0;
        position: relative;
        margin-right: 12px;
        >a {
          position: relative;
          display: block;
          width: 100%;
          height: 34px;
          padding: 0 8px;
          line-height: 34px;
          border-radius: 4px;
          color: $--color-text-base;
          text-align: center;
          transition: all .28s;
          &:after {
            display: block;
            content: '';
            width: 40px;
            height: 4px;
            border-radius: 2px;
            background-color: $theme-color;
            margin: 0 auto;
            opacity: 0;
            transition: opacity .28s;
          }
          &.router-link-active {
            color: $--color-text-active;
            font-size: $--font-size-large;
            font-weight: 700;
          }
          &:hover::after,&.router-link-active::after {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
