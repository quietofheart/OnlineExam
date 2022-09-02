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
    children: [
      {
        path: 'new',
        component: () => import('@/views/home/children/new.vue')
      },
      {
        path: 'test',
        component: () => import('@/views/home/children/test.vue')
      },
      {
        path: 'person',
        component: () => import('@/views/home/children/person.vue')
      },
      {
        path: 'user',
        component: () => import('@/views/home/children/user.vue'),
      },
      {
        path: 'problem',
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
    redirect: '/help/cannotlogin',
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
        path: 'text',
        component: () => import('@/views/help/children/text.vue')
      }
    ]
  },
  {
    path: '/exam',
    component: () => import('@/views/exam/userExam.vue')
  },
  {
    path: '*',
    component: () => import('@/views/notFind/notFind.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 定义一个需要守卫的导航链接正则
  let isNext = /^\/home/.test(to.path)
  // 检查导航的地址是否包含在paths数组内
  if (isNext) {
    // 获取客户端的token
    const token = sessionStorage.getItem('token')
    Vue.prototype.$http({
      url: '/api/home',
      baseURL: 'http://127.0.0.1:80',
      method: 'POST',
      headers: { 'Authorization': token, }
    }).then((res) => {
      if (res.data.status == '200') {
        // token验证成功 直接放行
        next()
      } else {
        // token验证失败 跳转到登录页面
        if (from.path !== '/login') {
          next('/login')
        } else {
          alert('请重新登录')
        }
      }
    })
  } else{
    // 不包含 直接跳转
    next()
  }
})

export default router
