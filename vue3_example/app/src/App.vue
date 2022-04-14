<script>
import NavBar from '/@components/NavBar.vue'
// import Profile from '/@components/Profile.vue'

export default {
  name : 'App',
  components : {
    NavBar,
    // Profile,
  }
}
</script>

<template>
  <nav-bar />
  <!-- 라우터 추가 -->
  <router-view></router-view>
  <!-- <Profile /> -->
</template>
