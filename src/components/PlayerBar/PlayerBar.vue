<template>
  <div class="player-bar-wrapper" v-if="getters.currentSong.id !== undefined">
    <div class="song-info">
      <div class="img-wrap">
        <el-image :src="getters.currentSong.image + '?param=60y60'" lazy>
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
        <span :class="modeIcon" @click="changeMode"></span>
        <span class="icon-upper" @click="prevSong"></span>
        <span class="big-icon" :class="playIcon" @click="togglePlaying"></span>
        <span class="icon-lower" @click="nextSong"></span>
        <span class="font-ci icon-ci"></span>
      </div>
      <div class="progress-wrap">
        <span class="current-time">{{$filters.formatSecondTime(currentTime)}}</span>
        <div class="progress-bar">
          <el-slider v-model="percent" @change="onPercentBarChange" :show-tooltip="false"></el-slider>
        </div>
        <span class="duration-time">{{$filters.formatSecondTime(getters.currentSong.duration)}}</span>
      </div>
    </div>
    <div class="song-list">
      <div class="volume-wrap">
        <span :class="muteIcon" @click="changeMuted"></span>
        <el-slider v-model="volumeNum" @change="changeVolume" :show-tooltip="false"></el-slider>
      </div>
      <span class="icon-list" @click="handleShowPlaylist"></span>
    </div>
    <audio
      ref="audio"
      :src="getters.currentSong.url"
      @playing="audioReady"
      @pause="audioPaused"
      @error="audioError"
      @ended="audioEnd"
      @timeupdate="updateTime"
      :muted="isMuted"
    ></audio>
  </div>
  <playlist-sidebar :is-show="showSidebar" :song-list="getters.playList" :history-list="getters.historyList"></playlist-sidebar>
</template>

<script>
import { ref, onMounted, computed, nextTick, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { playMode } from '../../utils/playConfig'
import { shuffle } from '../../utils/utils'
import PlaylistSidebar from '../PlaylistSidebar/PlaylistSidebar'

export default {
  name: 'PlayerBar',
  components: { PlaylistSidebar },
  setup () {
    const state = reactive({
      songReady: false,
      currentTime: 0,
      percent: 0,
      id: '',
      isMuted: false,
      volume: 0.5,
      volumeNum: 50,
      showSidebar: false
    })
    const audio = ref(null)
    onMounted(() => audio)
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
    // 播放暂停按钮
    const playIcon = computed(() => getters.value.playing ? 'icon-stop' : 'icon-play')
    // 播放模式按钮
    const modeIcon = computed(() => getters.value.mode === playMode.sequence
      ? 'icon-loop'
      : getters.value.mode === playMode.loop
        ? 'icon-singles'
        : 'icon-random')
    // 音量按钮
    const muteIcon = computed(() => state.isMuted ? 'icon-mute' : 'icon-voice')
    // 点击播放暂停
    const togglePlaying = () => {
      if (!state.songReady) {
        return
      }
      store.commit('songs/SET_PLAYING_STATE', !getters.value.playing)
    }
    // 改变播放模式
    const changeMode = () => {
      const mode = (getters.value.mode + 1) % 3
      store.commit('songs/SET_PLAY_MODE', mode)
      let list
      mode === playMode.random ? list = shuffle(getters.value.sequenceList) : list = getters.value.sequenceList
      resetCurrentIndex(list)
      store.commit('songs/SET_PLAYLIST', list)
    }
    // 重置播放索引
    const resetCurrentIndex = (list) => {
      const index = list.findIndex(item => {
        return item.id === getters.value.currentSong.id
      })
      store.commit('songs/SET_CURRENT_INDEX', index)
    }
    // 上一首
    const prevSong = () => {
      if (!state.songReady) {
        return
      }
      if (getters.value.playList.length === 1) {
        singlesLoop()
      } else {
        let index = getters.value.currentIndex - 1
        if (index === -1) {
          index = getters.value.playList.length - 1
        }
        store.commit('songs/SET_CURRENT_INDEX', index)
        if (!getters.value.playing) {
          togglePlaying()
        }
      }
    }
    // 下一首
    const nextSong = () => {
      if (!state.songReady) {
        return
      }
      if (getters.value.playList.length === 1) {
        singlesLoop()
      } else {
        let index = getters.value.currentIndex + 1
        if (index === getters.value.playList.length) {
          index = 0
        }
        store.commit('songs/SET_CURRENT_INDEX', index)
        if (!getters.value.playing) {
          togglePlaying()
        }
      }
    }
    // 单曲循环
    const singlesLoop = () => {
      audio.value.currentTime = 0
      audio.value.play()
      store.commit('songs/SET_PLAYING_STATE', true)
    }
    // 播放准备完成
    const audioReady = () => {
      state.songReady = true
    }
    // 监听播放时间改变
    const updateTime = (e) => {
      state.currentTime = e.target.currentTime
      state.percent = state.currentTime / getters.value.currentSong.duration * 100
      // console.log('state.currentTime:', state.currentTime)
      // console.log('getters.value.currentSong.duration:', getters.value.currentSong.duration)
      // console.log('state.percent:', state.percent)
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
    const audioEnd = () => {
      state.currentTime = 0
      getters.value.mode === playMode.loop ? singlesLoop() : nextSong()
    }
    // 进度条拖动改变播放进度
    const onPercentBarChange = (percent) => {
      const currentTime = getters.value.currentSong.duration * (percent / 100)
      state.currentTime = audio.value.currentTime = currentTime
      if (!getters.value.playing) {
        togglePlaying()
      }
    }
    // 控制静音
    const changeMuted = () => {
      if (state.isMuted) {
        state.isMuted = false
        audio.value.muted = false
      } else {
        state.isMuted = true
        audio.value.muted = true
      }
    }
    // 改变音量
    const changeVolume = (volume) => {
      state.volumeNum = volume
      // audio.value.volume 取值 [0,1]
      audio.value.volume = volume / 100
    }
    // 播放列表显示隐藏
    const handleShowPlaylist = () => {
      state.showSidebar = !state.showSidebar
    }
    watch([() => getters.value.currentSong, () => getters.value.playing], ([newSong, newPlaying], [oldSong, oldPlaying]) => {
      const watchCurrentSong = () => {
        if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
          return
        }
        state.songReady = false
        nextTick(() => {
          const _audio = audio.value
          if (_audio) {
            console.log('newCurrentSong:', newSong)
            console.log('oldCurrentSong:', oldSong)
            _audio.src = newSong.url
            _audio.volume = state.volume
            _audio.play()
            store.dispatch('songs/saveHistoryList', newSong)
            console.log(getters.value.historyList)
            state.id = newSong.id
          }
        })
      }
      const watchPlaying = () => {
        if (!state.songReady) {
          return
        }
        nextTick(() => {
          const _audio = audio.value
          if (_audio) {
            console.log('newPlaying:', newPlaying)
            console.log('oldPlaying:', oldPlaying)
            newPlaying ? _audio.play() : _audio.pause()
          }
        })
      }
      watchCurrentSong()
      watchPlaying()
    })
    return {
      ...toRefs(state),
      getters,
      playIcon,
      modeIcon,
      muteIcon,
      audio,
      togglePlaying,
      changeMode,
      prevSong,
      nextSong,
      singlesLoop,
      audioReady,
      updateTime,
      audioError,
      audioEnd,
      audioPaused,
      onPercentBarChange,
      changeMuted,
      changeVolume,
      handleShowPlaylist
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
      width: 30%;
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
    .song-handel {
      max-width: 420px;
      min-width: 420px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      .icon-wrap {
        width: 100%;
        display: flex;
        justify-content: center;
        span {
          font-size: $--font-size-extra-large;
          color: $--color-text-base;
          margin: 0 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
          &.font-ci {
            font-size: 20px;
            font-weight: lighter;
          }
          &.big-icon {
            font-size: 32px;
          }
          &:hover {
            color: $theme-color;
          }
        }
      }
      .progress-wrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $--font-size-extra-small;
        color: $--color-text-base;
        .progress-bar {
          flex: 1;
          padding: 0 16px;
          ::v-deep .el-slider__runway {
            margin: 2px 0;
            .el-slider__bar {
              background-color: $theme-color;
            }
          }
          ::v-deep .el-slider__button {
            width: 14px;
            height: 14px;
            border-color: $theme-color;
          }
        }
      }
    }
    .song-list {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 20px;
      span {
        cursor: pointer;
      }
      .volume-wrap {
        width: 150px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-right: 12px;
        .el-slider {
          width: 100%;
          margin: 0 4px;
          ::v-deep .el-slider__runway {
            margin: 2px 0;
            .el-slider__bar {
              background-color: $theme-color;
            }
          }
          ::v-deep .el-slider__button {
            width: 14px;
            height: 14px;
            border-color: $theme-color;
          }
        }
      }
    }
  }
</style>
