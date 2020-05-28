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
import Stu from '@/views/student/Index'
import StuHome from '@/views/student/Home'
import HistoryRoom from '@/views/student/HistoryRoom'
import Mine from '@/views/student/Mine'
import Setting from '@/views/Setting'
import Teacher from '@/views/teacher/Index'
import TeacherHome from '@/views/teacher/Home'

Vue.use(VueRouter)

/**
 * 路由的集合
 * label 导航名称，如果有，则有导航，否则没有导航
 * permission 角色权限的数组，里面含有的角色才能跳转，如果没有则表示所有角色均可跳转
 * 0：老师 1：助教 2：学员 4：巡课 5：课程管理员 12：管理员 99：超级管理员
 */
export const routes = [
  {
    path: '/',
    component: Login,
    beforeEnter (to, from, next) {
      // 如果存在token，则跳转到首页
      // localStorage.setItem('role', 2)
      // localStorage.setItem('token', 'sahdflsadfoiu121212')
      // localStorage.setItem('name', '测试专用名')
      // next('/classroom/522315608')
      if (localStorage.getItem('token') && localStorage.getItem('role')) {
        // eslint-disable-next-line eqeqeq
        if (localStorage.getItem('role') == 2) {
          next('/stu')
        } else {
          next('/teacher')
        }
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
    permission: [0, 2],
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
    path: '/stu',
    label: '学生',
    component: Stu,
    redirect: '/stu/home',
    children: [{
      path: '/stu/home',
      label: '学生主页',
      component: StuHome
    }, {
      path: '/stu/historyRoom',
      label: '学生历史课程',
      component: HistoryRoom
    }, {
      path: '/stu/mine',
      label: '学生个人中心',
      component: Mine
    }]
  },
  {
    path: '/teacher',
    label: '教师',
    component: Teacher,
    redirect: '/teacher/home',
    children: [{
      path: '/teacher/home',
      label: '教师主页',
      component: TeacherHome
    }]
  },
  {
    path: '/setting',
    component: Setting
  },
  {
    path: '/classroom/:serial',
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
      const role = +localStorage.getItem('role')
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