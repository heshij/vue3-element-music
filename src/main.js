import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import installElementPlus from './plugins/element.js'
import router from './router'

const app = createApp(App)
installElementPlus(app)
app.use(router)
app.mount('#app')
