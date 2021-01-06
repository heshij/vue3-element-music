import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

const router = createRouter({
  // hash模式：createWebHashHistory，history模式：createWebHistory
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/Home/index.vue'),
          redirect: '/home/recommend',
          children: [
            {
              path: 'recommend',
              name: 'Recommend',
              component: () => import('@/views/Home/recommend.vue')
            },
            {
              path: 'playlist',
              name: 'Playlist',
              component: () => import('@/views/PlayList/index.vue')
            },
            {
              path: 'rank',
              name: 'Rank',
              component: () => import('@/views/Rank/index.vue')
            },
            {
              path: 'singer',
              name: 'Singer',
              component: () => import('@/views/Singer/index.vue')
            },
            {
              path: 'latestmusic',
              name: 'LatestMusic',
              component: () => import('@/views/LatestMusic/index.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/video',
      children: [{
        path: 'video',
        name: 'video',
        component: () => import('../views/Video/video.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/friend',
      children: [{
        path: 'friend',
        name: 'friend',
        component: () => import('../views/Video/video.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/fm',
      children: [{
        path: 'fm',
        name: 'fm',
        component: () => import('../views/Video/video.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/playlistDetail',
      children: [{
        path: 'playlistDetail',
        name: 'playlistDetail',
        component: () => import('../views/PlayListDetail/index.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/mvDetail',
      children: [{
        path: 'mvDetail',
        name: 'mvDetail',
        component: () => import('../views/MvDetail/index.vue')
      }]
    }
  ]
})

export default router
