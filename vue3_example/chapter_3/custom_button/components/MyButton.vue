<template>
  <!-- 
    v-bind="$attrs"
    Non-prop 모든 속성을 그대로 button element에 넘겨줌
    $attrs = props에 정의되지 않은 속성
    :type, :class = props에 정의된 속성
   -->
  <button v-bind="$attrs" :type="type" :class="classes" ref="button"
    v-on="type === 'switch' ? {click : onClick} : {}">
    <!-- slot = 시작태그와ㅏ 종료태그 사이에 들어가는 내용이 위치하는 곳 -->
    <slot></slot>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  props : {
    type : {
      default : 'button',
      validator : (value) => {
        const allowed = ['button', 'submit', 'reset', 'switch'];
        return allowed.includes(value);
      }
    },
    sm : Boolean,
    md : {
      type : Boolean,
      default : true
    },
    lg : Boolean,
    pill : Boolean,
    active : {
      type : Boolean,
      default : true
    }
  },
  emits : ['update:active'],
  setup(props, context){
    // context 는 slot, attrs, emits 가지고 있다.
    // attrs 는 Non-prop 가리킨다.

    const active = ref(props.active);
    const classes = ref([]);
    const button = ref(null); // 양방향 결합이 가능한 프록시 변수
    // ref="button" 변수명이 동일하면 해당 변수는 그 html 엘리먼트를 가리킨다. 
    // 엘리먼트 본연의 기능르 바로 접근할 수 있다.

    // prop로 처리되는 변수
    if (props.sm) classes.value.push('sm');
    else if (props.lg) classes.value.push('lg');
    else classes.value.push('md');

    if (props.pill) classes.value.push('pill');

    const toggleBrightness = () =>{
      if (props.type === 'switch'){
        if (!active.value) {
          classes.value.push('deactive');
        } else {
          classes.value = classes.value.filter((d) => d !== 'deactive');
        }
      }
    };
    toggleBrightness();

    const onClick = () => {
      active.value = !active.value;
      toggleBrightness();
      context.emit('update:active', active.value);
    };
    onMounted(() => {
      // Non-prop로 처리되는 변수
      // 컴포넌트가 마운트 되어야 엘리먼트 정보를 가지게 된다.
      Object.keys(context.attrs).forEach((attr) => {
        if (attr.startsWith('text-')){
          button.value.style.color = attr.substring(5);
        } else if (attr.startsWith('background-')){
          button.value.style.backgroundColor = attr.substring(1);
        }
      });
    });

    return {
      active, classes, button, onClick
    }
  }
}
</script>

<style scoped>
button {outline: none;}
.sm {height: 20px; font-size: 13px;}
.md {height: 30px; font-size: 22px;}
.lg {height: 40px; font-size: 31px;}
.pill{border-radius: 16px;}
.deactive{filter: brightness(50%);}
</style>
