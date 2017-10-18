export const mutations = {
  SET_USERINFO(state,userInfo){
    state.userInfo.name=userInfo.name;
    state.userInfo.age=userInfo.age;
    state.userInfo.id=userInfo.id;
  },
  USER_PAGE(state,userPage){
    state.userPage.isEntering = userPage.isEntering;
    state.userPage.isExamine = userPage.isExamine;
  },
  ACT_INDEX(state,activeIndex){
    state.activeIndex = activeIndex;
  },
  CHECK_STATUS(state,checkStatus){
    state.checkStatus = checkStatus;
  },
  CHANGE_COLOR(state,changeColor){
    state.changeColor = changeColor;
  },
  SET_TOTal(state,statistics){
    state.statistics = statistics;
  },
  SET_FLOW(state,timeflows){
    state.timeflows = timeflows;
  }
}
