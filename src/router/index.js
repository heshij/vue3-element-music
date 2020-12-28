import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import Home from '../views/Home/home.vue'
import Video from '../views/Video/video.vue'

const router = createRouter({
  // hash模式：createWebHashHistory，history模式：createWebHistory
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'Home',
        component: Home
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/video',
      children: [{
        path: 'video',
        name: 'video',
        component: Video
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/friend',
      children: [{
        path: 'friend',
        name: 'friend',
        component: Video
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/fm',
      children: [{
        path: 'fm',
        name: 'fm',
        component: Video
      }]
    }
  ]
})

export default router
