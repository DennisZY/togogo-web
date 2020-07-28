import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/first/main'
import banner from '@/first/banner'
import user from '@/first/user'
import inner from '@/first/inner'
import more from '@/second/more'
import user_more1 from '@/second/user_more1'
import user_more2 from '@/second/user_more2'
import user_more3 from '@/second/user_more3'
import inner_more1 from '@/second/inner_more1'
import inner_more2 from '@/second/inner_more2'
import put_more from '@/second/put_more'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: '注册',
      component: resolve => void (require(['../first/register.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: false,  
      },
    },
    {
      path: '/recruit',
      name: 'recruit',
      component: resolve => void (require(['../user/recruit.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: false,  
      },
    },
    {
      path: '/postDetail',
      name: '招聘详情页',
      component: resolve => void (require(['../user/postDetail.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: false,  
      },
    },
    {
      path: '/user_info',
      name: 'user_info',
      component: resolve => void (require(['../user/user_info.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/user_info2',
      name: 'user_info2',
      component: resolve => void (require(['../user/user_info2.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },

    {
      path: '/owner_info',
      name: 'owner_info',
      component: resolve => void (require(['../user/owner_info.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/owner_info2',
      name: 'owner_info2',
      component: resolve => void (require(['../user/owner_info2.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/owner_info3',
      name: 'owner_info3',
      component: resolve => void (require(['../user/owner_info3.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: "/main",
      name: "主页",
      component: resolve => void (require(['../first/main.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: "/banner",
      name: "前台管理",
      component: resolve => void (require(['../first/banner.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/more',
      name: 'more',
      component: resolve => void (require(['../second/more.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/user',
      name: 'user',
      component: resolve => void (require(['../first/user.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/inner',
      name: 'inner',
      component: resolve => void (require(['../first/inner.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/user_more1',
      name: 'user_more1',
      component: resolve => void (require(['../second/user_more1.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/user_more2',
      name: 'user_more2',
      component: resolve => void (require(['../second/user_more2.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/user_more3',
      name: 'user_more3',
      component: resolve => void (require(['../second/user_more3.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/put_more',
      name: 'put_more',
      component: resolve => void (require(['../second/put_more.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/inner_more1',
      name: 'inner_more1',
      component: resolve => void (require(['../second/inner_more1.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
    {
      path: '/inner_more2',
      name: 'inner_more2',
      component: resolve => void (require(['../second/inner_more2.vue'], resolve)),
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录
      },
    },
  ]
})
export default router;
