<template>
  <!-- 
    v-bind="$attrs"
    Non-prop 모든 속성을 그대로 button element에 넘겨줌
    $attrs = props에 정의되지 않은 속성
    :type, :class = props에 정의된 속성
   -->
  <button v-bind="$attrs" :type="type" :class="classes" ref="button">
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
        const allowed = ['button', 'submit', 'reset'];
        return allowed.includes(value);
      }
    },
    sm : Boolean,
    md : {
      type : Boolean,
      default : true
    },
    lg : Boolean,
    pill : Boolean
  },
  setup(props, context){
    const classes = [];
    const button = ref(null);

    // prop로 처리되는 변수
    if (props.sm) classes.push('sm');
    else if (props.lg) classes.push('lg');
    else classes.push('md');

    if (props.pill) classes.push('pill');

    onMounted(() => {
      // Non-prop로 처리되는 변수
      Object.keys(context.attrs).forEach((attr) => {
        if (attr.startsWith('text-')){
          button.value.style.color = attr.substring(5);
        } else if (attr.startsWith('background-')){
          button.value.style.backgroundColor = attr.substring(1);
        }
      });
    });

    return {
      classes, button
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
</style>
