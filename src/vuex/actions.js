export const actions = {
  setUserInfo({commit},userInfo){
    commit('SET_USERINFO',userInfo); //commit触发你要mutations里面的函数
  },
  setUserPage({commit},userPage){
    commit('USER_PAGE',userPage);
  },
  setActiveIndex({commit},activeIndex){
    commit('ACT_INDEX',activeIndex);
  },
  setCheckStatus({commit},checkStatus){
    commit('CHECK_STATUS',checkStatus)
  },
  setChangeColor({commit},changeColor){
    commit('CHANGE_COLOR',changeColor)
  },
  setTotal({commit},statistics){
    commit('SET_TOTal',statistics)
  },
  setFlow({commit},timeflows){
    commit('SET_FLOW',timeflows)
  }
}
