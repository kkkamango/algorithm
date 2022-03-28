<template>
  <div class="row">
    <div class="col">
      <span class="bgblue">&nbsp;</span>&nbsp;
      <strong>{{state}}</strong>
    </div>
    <div class="col">
      <div class="btn-group float-end">
        <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown">리스트 필터</button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="key in Object.keys(filters)" :key="key">
            <a @click="filter = key" class="dropdown-item">
              {{filters[key].str}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name : 'TodoListMenu',
}
</script>

<script setup>
import {ref, inject, watch, computed} from 'vue'

// export default{
//   name : 'TodoListMenu',
  // emits : ['change-filter'], // emit을 사용하기 위해,  이벤트명 선언
  // setup(props, context) {
    // <script setup> emits 옵션 대신 defineEmits 함수를 사용하여 emit 설정
    const emit = defineEmits(['change-filter']);
    const filters = inject('filters');
    const filter = ref(0);
    const state = computed(() => filters[filter.value].str) // 계산된 속성
    watch( // filter 변경되면 emit을 이용해 부모 컴포넌트(TodoListMain)에게 전달
      // () => filter.value, (filter) => context.emit('change-filter', filter)
      () => filter.value, (filter) => emit('change-filter', filter)
    )

    // return {
    //   state,
    //   filters,
    //   filter
    // }
  // }
// }
</script>
<style scoped>
  .bgblue{background-color: blue;}
</style>
