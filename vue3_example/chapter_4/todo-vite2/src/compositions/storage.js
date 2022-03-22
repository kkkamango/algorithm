// localStorage에 접근하여 데이터 저장, 읽기
// compositions = modules 대신 Vue 3 컴포지션 api 를 이용해 만든 모듈을 관리하는 폴더

import {reactive, toRefs} from 'vue'
// toRefs = 객체 내부 속성을 포함하여 반응성을 가진다.

export const useStorage = () => { // Named export 방식 vs Default export 방식
  // 컴포지션 api로 만들어진 모듈 이름은 일반적으로 use 를 앞에 붙인다.(prefix)

  const KEY = 'my-todo-list';
  const storage_obj = reactive({storage_id : 0});
  const loadTodos = (initTodos) => {
    // 조회
    let temp_todos = JSON.parse(localStorage.getItem(KEY) || '[]');

    temp_todos.forEach((todo, idx) => {
      todo.id = idx;
    });
    storage_obj.storage_id = temp_todos.length;
    initTodos(temp_todos);
  }
  const saveTodos = (todos) => {
    // 저장
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  };

  return{
    ...toRefs(storage_obj), 
    // spread operator(...)를 이용해 storage_obj으로 부터 storage_id(속성)를 분리 -> 반응성을 가지지 않음
    // toRefs(composition api)를 이용하여 storage_id에 반응성을 가지도록 함 ㄱ 아래 api 자세히 설명추가함
    loadTodos, 
    saveTodos
  }
}
/*
반응성 관련 api
1. reactive           반응성을 갖게 함. 기본 자료형-> ref, 객체 -> reactive
2. readonly           읽기전용 프록시로 변경
3. isProxy            reactive, readonly로 생성된 프록시 객체인지 확인
4. isReactive         reactive로 생성된 프록시 객체인지 확인
5. isReadonly         readonly로 생성된 프록시 객체인지 확인
6. toRaw              reactive, readonly로 만들어진 프록시 객체를 원래 객체로 원복
7. markRaw            markRaw로 생성된 객체는 reactive, readonly를 통해 프록시 객체로 생성되지 않음
8. swallowReactive    참조되는 객체의 직계 속성만 reactive 를 부여
9. swallowReadonly    참조되는 객체의 직계 속성만 readonly 를 부여

1. ref                반응성을 갖게 함. 기본 자료형-> ref, 객체 -> reactive
2. unref              ref를 일반 변수로 변경
3. toRef              reactive api로 생성된 프록시 객체의 속성을 ref를 이용해 반응형 객체로 생성
4. toRefs             toRef를 해당 객체의 모든 속성에 적용
5. isRef              ref 객체인지 확인
6. customRef          사용자 지정 ref 생성 (track 함수, trigger 함수를 인자로 받고, get, set 함수를 리턴)
                      (get -> do something -> call track, set -> do something -> call trigger)
7. swallowRef         참조된 객체의 value 통째로 변경될때 반응형으로 작동함
8. triggerRef         swallowRef로 참조된 객체를 강제로 업데이트함
*/
