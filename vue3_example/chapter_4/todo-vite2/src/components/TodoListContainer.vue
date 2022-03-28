<template>
  <todo-list-new/>
  <section class="container">
    <div class="row justify-content-center m-2">
      <todo-list-main/>
    </div>
  </section>
</template>
<script>
export default{
  name : 'TodoListContainer',
}
</script>

<script setup>
import {ref, readonly, provide} from 'vue'
import {useStorage} from '../compositions/storage'

import TodoListNew from './TodoListNew.vue'
import TodoListMain from './TodoListMain.vue'

// export default{
//   name : 'TodoListContainer',
//   setup(props, context) {
    const todos = ref([]);
    const {loadTodos, saveTodos, storage_id} = useStorage();
    
    const initTotos = (init_todos) => {
      todos.value = init_todos;
    };
    const addTodo = (job, date) => {
      todos.value.push({
        // id는 지금까지 입력된 id의 제일 큰 값 보다 1 큼 == storage_id
        id : storage_id.value++, // storage_id 1 증가
        job : job,
        date : date,
        completed : false
      });
      saveTodos(todos);
    };
    const removeTodo = (id) => {
      todos.value.splice(id, 1);
      todos.value.forEach((todo, idx) => {
        // 삭제 후 id 재정렬
        todo.id = idx;
      });
      saveTodos(todos);
    };
    const completeTodo = (id) => {
      todos.value.find((todo) => todo.id === id).completed = true;
      saveTodos(todos);
    };

    provide('todos', readonly(todos));
    provide('addTodo', addTodo);
    provide('removeTodo', removeTodo);
    provide('completeTodo', completeTodo);

    loadTodos(initTotos);
//   },
//   components : {
//     TodoListNew, TodoListMain
//   }
// }
</script>
