// about-me를 컴포지션 API를 이용한 모듈
import {reactive, computed} from 'vue'

export const useProfile = () => {

  const state = reactive({
    name : null,
    email : null,
    resume : []
  })
  
  // getter를 computed 컴포지션 API로 변경
  // state 객체가 반응성(reactive)을 가지므로 computed 사용하지 않아도 상관 없음
  // const user_data = computed(() => state)
  
  // action 은 commit 함수 대신 SET_DATA 함수를 불러주면 된다.
  const SET_DATA = (data) => {
    state[data.key] = data.value;
  }

  const setAboutMeData = (data) => {
    Object.keys(data).forEach(key => {
      if (Object.keys(state).find(sKey => sKey === key)){
        SET_DATA({key : key, value : data[key]});
      }
    });
  }

  return {
    user_data : state,
    setAboutMeData,
  }
}

