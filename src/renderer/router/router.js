import Home from '@/pages/home.vue'

export const LOGIN = {
  path: '/',
  name: 'login',
  meta: {
    title: '登录',
    icon: 'icon-tongzhizhongxin-moren'
  },
  component: () => import('@/pages/login.vue')
}

const OTHER_PAGES = [{
  path: '/api',
  name: 'api',
  meta: {
    title: '接口文档',
    icon: 'iconfont icon-tixing'
  },
  component: () => import('@/pages/api.vue')
}, {
  path: '/aboutus',
  name: 'aboutUs',
  meta: {
    title: '关于软件',
    icon: 'iconfont icon-tixing'
  },
  component: () => import('@/pages/aboutUs.vue')
}, {
  path: '/message/:id',
  name: 'message',
  meta: {
    title: '推送详情',
    icon: 'iconfont icon-tixing'
  },
  component: () => import('@/pages/notification/message.vue')
}, {
  path: '/subscribe/my',
  name: 'mySubscribe',
  meta: {
    title: '我的订阅号',
    icon: 'iconfont icon-tixing'
  },
  component: () => import('@/pages/subscribe/my.vue')
}, {
  path: '/subscribe/add',
  name: 'addSubscribe',
  meta: {
    title: '创建订阅号',
    icon: 'iconfont icon-tixing'
  },
  component: () => import('@/pages/subscribe/add.vue')
}]

export const MENUS = [{
  path: '/notification',
  name: 'notification',
  meta: {
    title: '通知中心',
    icon: 'iconfont icon-tixing'
  },
  component: () => import('@/pages/notification/notification.vue')
}, {
  path: '/relate',
  name: 'relate',
  meta: {
    title: '授权应用',
    icon: 'iconfont icon-app_mw_instance_port'
  },
  component: () => import('@/pages/relate/relate.vue')
}, {
  path: '/push-way',
  name: 'pushWay',
  meta: {
    title: '推送管理',
    icon: 'iconfont icon-bangdingiconx'
  },
  component: () => import('@/pages/pushWay/pushWay.vue')
}, {
  path: '/subscribe',
  name: 'subscribe',
  meta: {
    title: '订阅服务',
    icon: 'iconfont icon-subscription-success'
  },
  component: () => import('@/pages/subscribe/subscribe.vue')
}, {
  path: '/jpoint',
  name: 'jpoint',
  meta: {
    title: '奇点兑换',
    icon: 'iconfont icon-jifen'
  },
  component: () => import('@/pages/jpoint/jpoint.vue')
}]

export const HOME_PAGES = [{
  path: '/home',
  name: 'home',
  meta: {
    title: 'Bark助手'
  },
  component: Home,
  children: [...MENUS]
}, LOGIN, ...OTHER_PAGES]

export const routers = HOME_PAGES
