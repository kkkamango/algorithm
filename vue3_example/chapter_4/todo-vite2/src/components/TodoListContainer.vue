<template>
    
</template>

<script>
import {ref, readonly, provide} from 'vue'

export default{
  name : 'TodoListContainer',
  setup(props, context) {
    const todos = ref([]);
    
    const initTotos = (init_todos) => {
      todos.value = init_todos;
    };
    const addTodo = (todo, date) => {};
    const removeTodo = (id) => {};
    const completeTodo = (id) => {};

    provide('todos', readonly(todos));
    provide('addTodo', addTodo);
    provide('removeTodo', removeTodo);
    provide('completeTodo', completeTodo);
  }
}
</script>
