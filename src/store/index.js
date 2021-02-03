import { createStore, createLogger } from 'vuex'
import getters from './getters'
// import songs from './modules/songs'
// const files = require.context('./modules', false, /\.js$/)
// const modules = {}
// files.keys().forEach((key) => {
//   modules[key.replace(/\.\/|\.js/g, '')] = files(key).default
// })
// // 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
// Object.keys(modules).forEach(key => {
//   // eslint-disable-next-line
//   modules[key]['namespaced'] = true
// })

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  getters,
  modules,
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})
