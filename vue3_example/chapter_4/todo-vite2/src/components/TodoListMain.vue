<template>
    <todo-list-menu @change-filter="onChangeFilter" class="p-0" />
    <div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
      <div v-if="use_category"><em>{{key}}</em></div>
      <todo-list :data="filtered_todos[key]" />
    </div>
    <div class="my-2 mt-5">
      <span class="bgred">&nbsp;</span>&nbsp;
      <strong>처리하지 못한 작업들</strong>
    </div>
    <todo-list :data="pending_todos"/>
</template>

<script>
// TodoListMenu로 부터 filters 값을 전달 받아 연계된 함수를 호출하여 TodoList에 전달
import {ref, provide, inject, watch} from 'vue';
import {useFilter} from '../compositions/filters'

import TodoListMenu from './TodoListMenu.vue'
import TodoList from './TodoList.vue'

export default {
  name : 'TodoListMain',
  setup(props, context) {
    const {
      getPendingTodos,
      getActiveTodayTodos,
      getCompletedTodayTodos,
      getAllTodayTodos,
      getAllTodos
    } = useFilter();
    const filter = ref(0);
    const filtered_todos = ref([]);
    const pending_todos = ref([]); // 날짜가 지났지만 완료하지 않은 작업
    const use_category = ref(false);
    const todos = inject('todos');

    const filters = {
      0 : {
        str : '해야 할 작업들',
        func : getActiveTodayTodos,
        category : false
      },
      1 : {
        str : '완료한 작업들',
        func : getCompletedTodayTodos,
        category : false
      },
      2 : {
        str : '오늘의 모든 기록',
        func : getAllTodayTodos,
        category : false
      },
      3 : {
        str : '모든 작업',
        func : getAllTodos,
        category : true
      }
    };

    provide('filters', filters);

    const groupBy = (todos) => {
      // groupBy = filter 모듈로부터 받은 배열은 날짜별로 분리
      // date를 키값으로 배열을 분리
      return todos.reduce((acc, cur) => {
        acc[cur['date']] = acc[cur['date']] || [];
        acc[cur['date']].push(cur);
        return acc;
      }, {});
    };

    const onChangeFilter = (filter_idx) => {
      // change-filter 이벤트를 리스닝
      filter.value = Number(filter_idx);
    }

    watch(
      [() => filter.value, todos.value],
    // 변화된 값 인지
    // filter=사용자가 선택한 메뉴 값, todos 원본 배열 감시
    ([new_filter, new_todos], [old_filter, old_todos]) => {
      pending_todos.value = getPendingTodos(todos);
      if (typeof new_filter != 'undefined'){
        // 필터 함수 호출
        let temp_todos = filters[new_filter].func(todos);
        filtered_todos.value = groupBy(temp_todos);
        use_category.value = filters[new_filter].category;
      }
    }, 
    {
      immediate : true // TodoListMain 생성 되었을 때 첫 변화도 즉시 감시
    })

    return {
      filter,
      pending_todos,
      filtered_todos,
      use_category,
      onChangeFilter
    }
  },
  components : {
    TodoListMenu, TodoList
  }
}
</script>
<style scoped>
  .bgred{background-color: red;}
</style>
