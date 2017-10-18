import {state} from "./state";

export const getters = {
  getUserInfo(state){
    return state.userInfo;
  },
  getUserPage(state){
    return state.userPage;
  },
  getActiveIndex(state){
    return state.activeIndex;
  },
  getCheckStatus(state){
    return state.checkStatus;
  },
  getChangeColor(state){
    return state.changeColor;
  },
  getTimeflows(state){
    return state.timeflows;
  },
  getStatistics(){
    return state.statistics;
  }
}
