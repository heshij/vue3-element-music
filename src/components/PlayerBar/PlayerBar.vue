<template>
    <div class="player-bar-wrapper">
      <div class="song-info">
        <div class="img-wrap">
          <el-image src="" lazy>
            <template #placeholder>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
        </div>
        <div class="text-wrap">
          <h4><span class="icon-like"></span></h4>
          <span></span>
        </div>
      </div>
      <div class="song-handel">
        <div class="icon-wrap">
          <span class="icon-loop"></span>
          <span class="icon-upper"></span>
          <span class="icon-play" @click="playing"></span>
          <span class="icon-lower"></span>
          <span class="font-ci">词</span>
        </div>
      </div>
      <div class="song-list">
        <span class="icon-list"></span>
      </div>
    </div>
</template>

<script>
// import { computed } from 'vue'
// eslint-disable-next-line no-unused-vars
import { createNamespacedHelpers, useStore } from 'vuex'
// eslint-disable-next-line no-unused-vars
const { mapState, mapActions } = createNamespacedHelpers('songs')
export default {
  name: 'PlayerBar',
  setup () {
    const store = useStore()
    const playing = () => {
      store.commit('songs/setPlayingState', true)
    }
    console.log('store.state:', store.state)
    console.log('store.state.songs:', store.state.songs)
    console.log('store.state.songs.playing:', store.state.songs.playing)
    console.log('store.getters[\'songs/playing\']:', store.getters['songs/playing'])
    return {
      playing
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .player-bar-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    height: 72px;
    padding: 0 20px;
    background-color: #f6f6f8;
    border-top: 1px solid $--border-color-base;
    .song-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .icon-wrap {
      display: flex;
      justify-content: flex-start;
      span {
        font-size: $--font-size-extra-large;
        color: $--color-text-base;
        margin: 0 12px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &.font-ci {
          font-size: 15px;
        }
      }
    }
  }
</style>
