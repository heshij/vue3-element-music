<template>
    <div class="player-bar-wrapper" v-if="getters.currentSong.id !== undefined">
      <div class="song-info">
        <div class="img-wrap">
          <el-image :src="getters.currentSong.image" lazy>
            <template #placeholder>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
        </div>
        <div class="text-wrap">
          <h4>{{ getters.currentSong.name }}<span class="icon-like"></span></h4>
          <span>{{ getters.currentSong.singer }}</span>
        </div>
      </div>
      <div class="song-handel">
        <div class="icon-wrap">
          <span class="icon-loop"></span>
          <span class="icon-upper"></span>
          <span :class="playIcon" @click="togglePlaying"></span>
          <span class="icon-lower"></span>
          <span class="font-ci">词</span>
        </div>
      </div>
      <div class="song-list">
        <span class="icon-list"></span>
      </div>
      <audio
        ref="audio"
        :src="getters.currentSong.url"
        @playing="audioReady"
        @error="audioError"
        @ended="audioEnd"
        @pause="audioPaused"
      ></audio>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, onMounted, computed, nextTick, reactive, toRefs, watch } from 'vue'
// eslint-disable-next-line no-unused-vars
import { createNamespacedHelpers, useStore } from 'vuex'
// eslint-disable-next-line no-unused-vars
const { mapGetters, mapState, mapActions } = createNamespacedHelpers('songs')
export default {
  name: 'PlayerBar',
  setup () {
    const state = reactive({
      songReady: false,
      id: ''
    })
    const store = useStore()
    const getters = computed(() => {
      return {
        currentIndex: store.getters['songs/currentIndex'],
        currentSong: store.getters['songs/currentSong'],
        mode: store.getters['songs/mode'],
        playList: store.getters['songs/playList'],
        playing: store.getters['songs/playing'],
        sequenceList: store.getters['songs/sequenceList'],
        historyList: store.getters['songs/historyList']
      }
    })
    const playIcon = computed(() => getters.value.playing ? 'icon-stop' : 'icon-play')
    // 点击播放暂停
    const togglePlaying = () => {
      if (!state.songReady) {
        return
      }
      store.commit('songs/SET_PLAYING_STATE', !getters.value.playing)
    }
    // 播放准备完成
    const audioReady = () => {
      state.songReady = true
    }
    // 歌曲暂停
    const audioPaused = () => {
      store.commit('songs/SET_PLAYING_STATE', false)
    }
    // 歌曲错误
    const audioError = () => {
      state.songReady = true
    }
    // 歌曲播放完成
    const audioEnd = () => {}
    const audio = ref(null)
    onMounted(() => audio)
    watch(() => getters.value.currentSong, (newSong, oldSong) => {
      console.log(`原值为${newSong}`)
      console.log(`新值为${oldSong}`)
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      state.songReady = false
      nextTick(() => {
        const _audio = audio.value
        console.log(_audio)
        if (_audio) {
          _audio.src = newSong.url
          _audio.play()
          state.id = newSong.id
        }
      })
    })
    return {
      ...toRefs(state),
      getters,
      playIcon,
      audio,
      togglePlaying,
      audioReady,
      audioError,
      audioEnd,
      audioPaused
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
      .img-wrap {
        width: 50px;
        height: 50px;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid $--border-color-base;
        cursor: pointer;
      }
      .text-wrap {
        min-width: 200px;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-content: space-around;
        flex-wrap: wrap;
        padding-left: 12px;
        h4 {
          width: 100%;
          font-size: $--font-size-base;
          color: $--color-text-base;
          .icon-like {
            margin-left: 12px;
          }
        }
        span {
          font-size: $--font-size-small;
          color: $--color-text-secondary;
        }
      }
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
