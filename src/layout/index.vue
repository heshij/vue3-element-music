<template>
    <div class="app-wrapper">
      <app-header />
      <sidebar class="sidebar-container"/>
      <div class="main-container">
        <app-main/>
      </div>
      <player-bar></player-bar>
    </div>
</template>

<script>
import { AppHeader, Sidebar, AppMain } from './components'
import PlayerBar from '../components/PlayerBar/PlayerBar'
export default {
  name: 'layout',
  components: {
    PlayerBar,
    AppMain,
    AppHeader,
    Sidebar
  }
}
</script>

<style scoped lang="scss">
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .main-container {
      min-height: 100%;
      -webkit-transition: margin-left 0.28s;
      transition: margin-left 0.28s;
      margin-left: 200px;
      position: relative;
      padding: 60px 20px 72px;
    }
  }
</style>
