import Vue from 'vue';
import Router from 'vue-router';
import {cookieUtil} from '../js/cookie';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        //meta元素
        requireAuth: true,
      },
      redirect: '/entering'
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/login.vue'], resolve),         //登录
    },
    {
      path: '/error',
      component: resolve => require(['../components/page/error.vue'], resolve),         //404
    },
    {
      path: '/entering',
      meta: {
        //meta元素
        requireAuth: true,
      },
      component: resolve => require(['../components/common/Main.vue'], resolve),
      children: [
        {
          path: '/',
          meta: {
            //meta元素
            requireAuth: true,
          },
          component: resolve => require(['../components/page/entering.vue'], resolve)    //录入
        },
        {
          path: '/examine',
          meta: {
            //meta元素
            requireAuth: true,
          },
          component: resolve => require(['../components/page/examine.vue'], resolve)     //查看
        },
      ]
    },
  ]
})
export default router;
// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if(cookieUtil.get("token")) {
      next();
    }
    else {
      next({
        path: '/login'
      })
    }
  }
  else {
    next();
  }
})

