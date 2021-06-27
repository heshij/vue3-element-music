import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import '@/styles/music-iconfont.css'
import '@/styles/index.scss'
import installElementPlus from './plugins/element.js'
import router from './router'
import store from './store'
import { tranNumber, dateFormat, formatSecondTime, formatTime } from './utils/utils'
const app = createApp(App)
installElementPlus(app)
app.use(router)
app.use(store)
// 全局过滤器
app.config.globalProperties.$filters = {
  tranNumber,
  dateFormat,
  formatSecondTime,
  formatTime
}
app.mount('#app')
