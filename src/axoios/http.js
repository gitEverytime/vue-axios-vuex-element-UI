'use strict'

import axios from 'axios'
import qs from 'qs'   //qs组件来避开ajax信使请求，并兼容Android。
import Vue from 'vue'
import router from '../router'
import store from '../vuex';
import {cookieUtil} from '../js/cookie'
// Vue.use(store)
let vm = new Vue({
  router,
  store
});


var root = process.env.API_ROOT
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
})

function checkStatus (response) {
  if (response && (response.status === 200)) {
    return response   //拿到接口请求成功并且登录成功后的请求结果
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }else{
    return response   //网络错误，服务器错误，未登录成功
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if(!res){
    vm.$message.error("亲，您的网络出了一点小状况喔!");
  }
  if(res && (res.status === 200) && (res.data.code === 207)){
    vm.$router.push('/login');
    vm.$message.error("未登录，请先登录！");
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: '/',
      url,
      data: qs.stringify(data),
      timeout: 3000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: root,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
