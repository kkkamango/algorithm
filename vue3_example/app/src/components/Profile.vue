<template>
  <!-- 타임라인을 표현한 템플릿 코드 -->
  <div class="container pt-5">
    <div>
      <p class="fs-1 mb-0">{{user_data.name}}</p>
    </div>
    <div>
      <p class="fs-4">{{user_data.email}}</p>
    </div>

    <div v-for="(d, index) in user_data.resume" :key="index"
      class="row no-gutters">
      <!-- 카드가 좌우로 표현
      top : 현재 이력
      -->
      <Card :top="!index" :resume="d" :show="index % 2 === 1" />
      <div class="col-sm-2 text-center flex-column d-none d-sm-flex">
        <!-- 연도, 선을 표시할 영역 -->
        <div class="row h-50">
          <div class="col" :class="[index ? 'border-right' : '']"></div>
          <div class="col"></div>
        </div>
        <h1>
          <span class="badge badge-pill border"
            :class="[!index ? 'bg-primary text-light' : 'bg-light text-dark']">
            {{new Date(d.date).getFullYear()}}
          </span>
        </h1>
        <div class="row h-50">
          <div class="col" :class="[index != user_data.resume.length - 1 ? 'border-right' : '']"></div>
          <div class="col"></div>
        </div>
      </div>
      <Card :top="!index" :resume="d" :show="index % 2 === 0" />
    </div>
  </div>
</template>

<script>
  import {defineComponent, computed} from 'vue'
  import {useStore} from 'vuex'
  import useAxios from '/@app_modules/axios.js'

  // Card 컴포넌트
  const Card = defineComponent({
    name : 'Card',
    props : {
      top : Boolean,
      resume : Object,
      show : Boolean,
    },
    setup(props){},
    template : `
    <div v-if="show" class="col-sm py-2">
      <div class="card" :class="{'border-primary bg-primary text-light' : top, shadow : top}">
        <div class="card-body">
          <h4 class="card-title" :class="[top ? 'text-light' : 'text-muted']">
            {{resume.title}}
            <hr>
            <p class="card-text">{{resume.content}}</p>
            <a v-if="resume.URL != 'null'" :href="resume.URL" target="_blank"
              :class="[top ? 'text-light' : 'text-primary']">link</a>
          </h4>
        </div>
      </div>
    </div>
    <div v-if="!show" class="col-sm"></div>
    `
  });


  export default {
    name : 'Profile',
    setup() {
      const store = useStore();
      const { axiosGet } = useAxios();

      const onSuccess = (data) => {
        store.dispatch('setAboutMeData', data.data);
      }

      axiosGet('/db/about-me', onSuccess);

      const user_data = computed(
        () => store.getters['about_me/user_data']
      );

      return {
        user_data,
      }
    },
    components : { Card }
  }
</script>
