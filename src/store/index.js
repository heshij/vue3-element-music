import { createStore } from 'vuex'
import getters from './getters'
// import songs from './modules/songs'
const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach((key) => {
  modules[key.replace(/\.\/|\.js/g, '')] = files(key).default
})
// 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
Object.keys(modules).forEach(key => {
  // eslint-disable-next-line
  modules[key]['namespaced'] = true
})
export default createStore({
  getters,
  modules
})
