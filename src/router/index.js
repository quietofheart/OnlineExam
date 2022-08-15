import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/home/new',
    component: () => import('@/views/home/home.vue'),
    children:[
      {
        path:'new',
        component: () => import('@/views/home/children/new.vue')
      },
      {
        path:'test',
        component: () => import('@/views/home/children/test.vue')
      },
      {
        path:'person',
        component: () => import('@/views/home/children/person.vue')
      },
      {
        path:'user',
        component: () => import('@/views/home/children/user.vue')
      },
      {
        path:'problem',
        component: () => import('@/views/home/children/problem.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/help',
    redirect:'/help/cannotlogin',
    component: () => import('@/views/help/help.vue'),
    children: [
      {
        path: 'reset',
        component: () => import('@/views/help/children/reset.vue')
      },
      {
        path: 'cannotlogin',
        component: () => import('@/views/help/children/cannotLogin.vue')
      },
      {
        path: 'feedback',
        component: () => import('@/views/help/children/feedback.vue')
      },
      {
        path:'text',
        component: () => import('@/views/help/children/text.vue')
      }
    ]
  },
  {
    path:'*',
    component:() => import('@/views/notFind/notFind.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 定义一个需要守卫的导航链接
  let paths = ['/home','/home/new','/home/test','/home/person','/home/user']
  // 检查导航的地址是否包含在paths数组内
  if (paths.indexOf(to.path) !== -1) {
    // 获取客户端的token
    const token = localStorage.getItem('token')
    if (token === 'Bearer 9767a61a606ddfe2c3d8d02d351c74ea') {
      // 如果token正确 直接放行
      next()
    } else {
      // 没有则跳转到登录页面
      next('/login')
    }
  } else {
    //如访问的不需要限制，直接跳转。
    next()
  }
})

export default router
