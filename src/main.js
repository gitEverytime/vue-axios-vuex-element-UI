// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex';
import ElementUI from 'element-ui'
import IEcharts from 'vue-echarts-v3/src/full.vue';
// import {cookieUtil} from './cookies/cookie'
import 'element-ui/lib/theme-default/index.css'


Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  IEcharts,
  store,
  template: '<App/>',
  components: { App }
})
