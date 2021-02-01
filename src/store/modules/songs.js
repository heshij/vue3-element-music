import { playMode } from '../../utils/playConfig'

const state = {
  // 播放状态
  playing: false,
  // 播放列表
  playList: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式(循环，单曲，随机)
  mode: playMode.sequence,
  // 播放索引
  currentIndex: -1
}

const getters = {
  playing: state => state.playing
}

const mutations = {
  setPlayingState (state, flag) {
    state.playing = flag
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
