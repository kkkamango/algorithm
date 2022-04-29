<script>
import NavBar from '/@components/NavBar.vue'
import Toast from '/@components/Toast.vue'
import { ref, provide } from 'vue'
// import Profile from '/@components/Profile.vue'

export default {
  name : 'App',
  setup(props) {
    const toast = ref('');
    // provide 하위 모든 컴포넌트에게 같은 값 제공
    provide('toast', toast);
  },
  components : {
    NavBar,
    Toast,
    // Profile,
  }
}
</script>

<template>
  <toast />
  <nav-bar />
  <!-- 알림이 그려질 영역
  NavBar에서 알림을 받아 옴
  1. provide, inject
  2. vuex
  3. teleport를 이용하여 App의 특정 위치에 그림
   -->
  <div id="notification"></div>
  <!-- 라우터 추가 -->
  <router-view></router-view>
  <!-- <Profile /> -->
</template>
