import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import './styles/music-iconfont.css'
import './styles/index.scss'
import installElementPlus from './plugins/element.js'
import router from './router'
import { tranNumber } from './utils/utils'
const app = createApp(App)
installElementPlus(app)
app.use(router)
// 全局过滤器
app.config.globalProperties.$filters = {
  tranNumber
}
app.mount('#app')
