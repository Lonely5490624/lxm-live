import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import AboutList from '@/views/about/List.vue'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter (to, from, next) {
      // 如果存在token，则跳转到首页
      if (localStorage.getItem('token')) {
        next('/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/about/Index.vue'),
    children: [{
      path: 'list',
      name: 'AboutList',
      component: AboutList
    }]
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  // 由于cordova打包是使用静态页面，所以这里使用默认的hash模式
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 全局路由
 * 如果存在token，则正常跳转
 * 如果不存在token，则跳转到首页，并弹出错误
 */
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    next()
  } else {
    if (to.path === '/') {
      next()
    } else {
      Message.error('请重新登录')
      next('/')
    }
  }
})

export default router