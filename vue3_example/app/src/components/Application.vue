<!-- 
AppCard 컴포넌트를 나열하는 컨테이너 컴포넌트
서버의 데이터가 드물게 업데이트
=> vuex 스토어에 보관하고 재활용
-->
<template>
<div>
  <p class="m-2">총 {{applications_count}} 개의 어플리케이션 중 {{applications.length}}개가 보여집니다.</p>
  <hr/>
  <div class="row row-cols-1 row-cols-sm-3 g-2 m-0">
    <div class="col" v-for="data in applications" :key="data.id">
      <app-card :data="data"/>
    </div>
  </div>
</div>
</template>

<script>
  import {ref, onMounted, computed} from 'vue'
  // import {useStore} from 'vuex'
  import { useApplications } from '/@compositions/useApplications'
  import AppCard from '/@components/AppCard.vue'
  import useAxios from '/@app_modules/axios.js'

  export default {
    name : 'Application',
    setup() {
      // const store = useStore();
      const {
        applications_count,
        applications,
        setApplications
      } = useApplications();
      const {axiosGet} = useAxios();
      // const applications = computed(() => 
      //   store.getters['applications/applications']()
      // );
      // const applicaonts_count = computed(
      //   () => store.getters['applications/applications_count']
      // );

      onMounted(() => {
        if (!applications_count.value){
          axiosGet('/db/applications', (data) => {
            setApplications(data.data);
          });  
        }
        // if (!store.getters.applications_count){
        //   axiosGet('/db/applications', (data) => {
        //     store.dispatch('applications/setApplications', data.data);
        //   });
        // }
      });

      return {
        applications : applications(),
        applications_count
      }
    },
    components : {
      AppCard,
    }
  }
</script>
