<script>
import {ref, computed} from 'vue'

export default {
  name : 'NavVar',
  setup(){
    const menu = ref('home');
    const menus = [
      {key : 'home', value : '홈', URL : '#', position : 'left'},
      {key : 'app', value : '애플리케이션', URL : '#', position : 'left'},
      {key : 'me', value : 'Profile', URL : '#', position : 'right'},
    ];
    
    const left_menu = computed(() => menus.filter(d => d.position === 'left'));
    const right_menu = computed(() => menus.filter(d => d.position === 'right'));

    const onMovePage = (e, menu_object) => {
      if (e){
        e.preventDefault();
      }
      menu.value = menu_object.key;
    };

    return {
      menu,
      menu_category : [
        {id : 1, me_auto : true, value : left_menu.value},
        {id : 2, me_auto : false, value : right_menu.value},
      ],
      onMovePage,
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
            <a @click="onMovePage($event, menu_object)" href="#"
              :class="{'nav-link' : true, 'active' : menu === menu_object.key}">
              {{menu_object.value}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
