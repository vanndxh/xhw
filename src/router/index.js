import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Aboutxh',
    name: 'Aboutxh',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Aboutxh.vue')
  },
  {
    path: '/AboutPage',
    name: 'AboutPage',
    component: () => import('../views/AboutPage.vue')
  },
  {
    path: '/Genshin',
    name: 'Genshin',
    component: () => import('../views/Genshin.vue')
  },
  {
    path: '/AG',
    name: 'AG',
    component: () => import('../views/AG')
  },
  {
    path: '/Xian',
    name: 'Xian',
    component: () => import('../views/Xian.vue')
  },
  {
    path: '/Items',
    name: 'Items',
    component: () => import('../views/Items.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Mine',
    name: 'Mine',
    component: () => import('../views/Mine')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
