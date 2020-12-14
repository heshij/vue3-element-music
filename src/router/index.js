import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import About from '../views/about.vue'

const router = createRouter({
  // hash模式：createWebHashHistory，history模式：createWebHistory
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: Home
  }, {
    path: '/about',
    name: 'about',
    component: About
  }]
})

export default router
