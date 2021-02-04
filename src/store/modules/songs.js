import { playMode } from '../../utils/playConfig'
import { shuffle } from '../../utils/utils'
import { saveHistory, clearHistory, deleteHistory } from '../../utils/cache'

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
  currentIndex: -1,
  // 历史播放列表
  historyList: []
}

const getters = {
  playing: state => state.playing,
  playList: state => state.playList,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong: state => {
    return state.playList[state.currentIndex] || {}
  },
  historyList: state => state.historyList
}

const mutations = {
  // 播放状态
  SET_PLAYING_STATE: (state, flag) => {
    state.playing = flag
  },
  // 播放列表
  SET_PLAYLIST: (state, list) => {
    state.playList = list
  },
  // 顺序播放列表
  SET_SEQUENCE_LIST: (state, list) => {
    state.sequenceList = list
  },
  // 播放模式
  SET_PLAY_MODE: (state, mode) => {
    state.mode = mode
  },
  // 播放索引
  SET_CURRENT_INDEX: (state, index) => {
    state.currentIndex = index
  },
  // 历史播放列表
  SET_HISTORY_LIST: (state, list) => {
    state.historyList = list
  }
}

const actions = {
  // 选择播放
  selectPlay ({ commit, state }, { list, index }) {
    commit('SET_SEQUENCE_LIST', list)
    if (state.mode === playMode.random) {
      const randomList = shuffle(list)
      commit('SET_PLAYLIST', randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit('SET_PLAYLIST', list)
    }
    commit('SET_CURRENT_INDEX', index)
    commit('SET_PLAYING_STATE', true)
  },
  // 暂停播放
  pausePlay ({ commit }) {
    commit('SET_PLAYING_STATE', false)
  },
  // 设置最近播放歌曲
  saveHistoryList ({ commit }, song) {
    commit('SET_HISTORY_LIST', saveHistory(song))
  },
  // 移除最近播放歌曲单个
  deleteHistoryList ({ commit }, song) {
    commit('SET_HISTORY_LIST', deleteHistory(song))
  },
  // 移除全部最近播放
  clearHistoryList ({ commit }) {
    commit('SET_HISTORY_LIST', clearHistory())
  }
}

function findIndex (list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
