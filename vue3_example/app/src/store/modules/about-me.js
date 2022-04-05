/**
 * 사용자 프로필 관련 store
 */
export const about_me = {
  namespaced : true, // namespaced : 변수명 about_me 로 네임스페이스를 가짐
  state : () => ({ // state : 저장할 데이터 객체 반환
    name : null,
    email : null,
    resume : [],
  }),
  getters : { // getters : state의 데이터를 필요한 형식으로 전처리 해주는 반응형 속성
    user_data : (state)=>{
      return {
        name : state.name,
        email : state.email,
        resume : state.resume,
      }
    }
    // name : (state) => {
    //   return state.name;
    // },
    // email : (state) => {
    //   return state.email;
    // }, 
  },
  mutations : { // mutations : state 내 데이터 변형할 수 있는 속성
    SET_DATA(state, data) {
      state[data.key] = data.value;
    }
  },
  actions : { // actions : 외부 컴포넌트에서 호출하는 함수의 집합
    // 외부 컴포넌트에서 state의 데이터 변형이 필요할 경우, actions 내 함수들을 호출 -> mutations 호출
    setAboutMeData : ({commit, state}, data) => {
      Object.keys(data).forEach(key => {
        if (Object.keys(state).find(sKey => sKey === key)){
          commit('SET_DATA', {key : key, value : data[key]});
        }
      });
    }
  },
}
