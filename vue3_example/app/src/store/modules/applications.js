// applications store 모듈
export const applications = {
  namespaced : true,
  state : () => ({
    applications : [],
  }),
  getters : {
    applications_count : (state) => {
      return state.applications.length;
    },
    applications : (state) => (filter = null) => {
      // 검색 기능을 사용할 때 유용한 방법
      if (filter){
        return state.applications.filter(i => i.name === filter)
      }
      return state.applications;
    },
  },
  mutations : {
    SET_DATA(state, data){
      state.applications = data;
    },
  },
  actions : {
    setApplications : ({commit}, data) =>{
      if (data.length > 0){
        commit('SET_DATA', data);
      }
    }
  }
};
