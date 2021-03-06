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
        name: 'Video',
        component: () => import('../views/Video/Video.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/friends',
      children: [{
        path: 'friends',
        name: 'Friends',
        component: () => import('../views/Friends/Friends.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/fm',
      children: [{
        path: 'fm',
        name: 'FM',
        component: () => import('../views/FM/FM.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/playlistDetail',
      children: [{
        path: 'playlistDetail',
        name: 'playlistDetail',
        component: () => import('../views/PlayListDetail/index.vue'),
        redirect: '/playlistDetail/songs',
        children: [
          {
            path: 'songs',
            name: 'songs',
            component: () => import('../views/PlayListDetail/songs')
          },
          {
            path: 'comment',
            name: 'comment',
            component: () => import('../views/PlayListDetail/comment')
          },
          {
            path: 'collectors',
            name: 'collectors',
            component: () => import('../views/PlayListDetail/collectors')
          }
        ]
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
    },
    {
      path: '/',
      component: Layout,
      redirect: '/radioDetail',
      children: [{
        path: 'radioDetail',
        name: 'radioDetail',
        component: () => import('../views/RadioDetail/index.vue')
      }]
    }
  ]
})

export default router
