import Vue from 'vue';
import Vuex from 'vuex';
import {state} from "./state";           //基本状态管理
import {mutations} from "./mutations";   //对数据进行更新
import {getters} from "./getters";       //获取仓库里面的数据状态
import {actions} from "./actions";       //异步更新数据状态
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store;
