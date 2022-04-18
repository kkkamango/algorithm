<script>
import {ref, reactive, computed, onMounted} from 'vue'
import useAxios from '/@app_modules/axios.js'
import {setCookie, getCookie} from '/@app_modules/cookie.js'

export default {
  name : 'NavVar',
  setup(){
    // const menu = ref('profile');
    // 라우터 추가
    const menus = [
      {key : 'home', value : '홈', URL : '/home', position : 'left'},
      {key : 'app', value : '애플리케이션', URL : '/application', position : 'left'},
      {key : 'profile', value : 'Profile', URL : '/profile', position : 'right'},
    ];
    // const menus = [
    //   {key : 'home', value : '홈', URL : '#', position : 'left'},
    //   {key : 'app', value : '애플리케이션', URL : '#', position : 'left'},
    //   {key : 'me', value : 'Profile', URL : '#', position : 'right'},
    // ];
    
    const left_menu = computed(() => menus.filter(d => d.position === 'left'));
    const right_menu = computed(() => menus.filter(d => d.position === 'right'));

    // const onMovePage = (e, menu_object) => {
    //   if (e){
    //     e.preventDefault();
    //   }
    //   menu.value = menu_object.key;
    // };

    // 알림 관련
    let notification = reactive({id : 0});
    let show_notification = ref(false);

    const onOpenNotification = (e) => {
      if (e){
        e.preventDefault();
      }
      show_notification.value = true;
    }

    const onCloseNotification = (e) => {
      if (e){
        e.preventDefault();
      }
      setCookie('notification', notification.id, 1);
      notification.id = 0;
      show_notification.value = false;
    }

    onMounted(() => {
      const block_noti_id = getCookie('notification') || 0;
      const {axiosGet} = useAxios();
      axiosGet(`/db/notification/${block_noti_id}`, (data) => {
        Object.assign(notification, data.data);
      })
    });

    return {
      // menu,
      menu_category : [
        {id : 1, me_auto : true, value : left_menu.value},
        {id : 2, me_auto : false, value : right_menu.value},
      ],
      // onMovePage,
      notification,
      show_notification,
      onOpenNotification,
      onCloseNotification,
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">TripleK</a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- ul : left_menu and right_menu -->
        <ul v-for="menu in menu_category" :key="menu.id"
          :class="{'navbar-nav' : true, 'me-auto' : menu.me_auto}">
          <!-- li : left > home, app, 
                    right > me -->
          <li v-for="menu_object in menu.value" :key="menu_object.key" class="nav-item">
            <!-- 라우터 추가 -->
            <router-link :to="menu_object.URL" class="nav-link">{{ menu_object.value }}</router-link>
            <!-- <a @click="onMovePage($event, menu_object)" href="#"
              :class="{'nav-link' : true, 'active' : menu === menu_object.key}">
              {{menu_object.value}}
            </a> -->
          </li>
        </ul>
        <!-- 알림 -->
        <ul v-show="notification.id > 0" class="navbar-nav">
          <li class="nav-item">
            <button @click="onOpenNotification" class="btn btn-danger">&#128226;</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- teleport는 to라는 속성을 받아 어느 태그애 그림을 그릴지(append) 결정 -->
  <teleport to='#notification' v-if="show_notification">
    <div :class="'bg-' + notification.type" class="container notification border border-dark rounded-3 mt-3 p-3">
      <div v-if="notification.type" class="d-flex">
        <span class="me-auto fs-4 fw-bold text-uppercase text-light">{{notification.type}}</span>
        <button @click="onCloseNotification" class="btn fw-bold">&times;</button>
      </div>
      <hr/>
      <div class="text-light text-wrap">{{notification.content}}</div>
    </div>
  </teleport>
</template>

<style scoped>
  .notification { text-shadow: 2px 2px 2px gray; }
</style>
