import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'
import Home from '../views/Home/home.vue'
import About from '../views/About/about.vue'

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
      redirect: '/about',
      children: [{
        path: 'about',
        name: 'about',
        component: About
      }]
    },
    {
      path: '/test',
      component: Layout,
      redirect: '/test/a',
      children: [{
        path: 'a',
        name: 'a',
        component: About
      }]
    }
  ]
})

export default router
