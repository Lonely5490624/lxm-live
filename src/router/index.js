import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Classroom from '@/views/Classroom'
import Manage from '@/views/manage/Index'
import ClassroomList from '@/views/manage/ClassroomList'
import TeacherList from '@/views/manage/TeacherList'
import NotFound from '@/views/404'

Vue.use(VueRouter)

/**
 * 路由的集合
 * label 导航名称，如果有，则有导航，否则没有导航
 * permission 角色权限的数组，里面含有的角色才能跳转，如果没有则表示所有角色均可跳转
 */
export const routes = [
  {
    path: '/',
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
    label: '首页',
    component: Home,
    redirect: '/home/index',
    permission: ['teacher', 'student'],
    children: [
      {
        path: '/home/index',
        label: '管理',
        component: Manage
      },
      {
        path: '/home/classroom-list',
        label: '教室管理',
        component: ClassroomList
      },
      {
        path: '/home/teacher-list',
        label: '老师管理',
        component: TeacherList
      }
    ]
  },
  {
    path: '/classroom',
    component: Classroom
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
  if (to.path === '/') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      // 判断路由的权限
      const role = localStorage.getItem('role')
      const { permission } = to
      if (!permission || permission.includes(role)) {
        next()
      } else {
        next('/')
      }
    } else {
        Message.error('请重新登录')
        next('/')
    }
  }
})

export default router