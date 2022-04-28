<!-- 
로딩 프로세스
1. cookie에서 email과 token을 얻어온다
  cookie가 없으면 임의의 값을 넣는다
2. email과 token을 서버로 부터 로그인/최초 정보입력/자동로그인 중 하나의 응답을 받는다.
  a. email, token 일치하지 않으면 로그인 화면으로 이동
  b. DB의 사용자 정보와 일치하면, 
    최초 정보 입력화면으로 이동
  c. email, token 일치하고, DB의 사용자 정보와 일치하지 않으면,
    자동 로그인이 활성화 되어있는지 확인 후
    관리자 페이지로 이동


  state = ok      로그인 완료
  state = login   로그인 창 띄워야 함
  state = update  최초 정보 입력 or 비밀번호 변경 창 띄워야 함
  state = loading 토큰 검사 중

  cookie = stay   로그인 유지 여부 저장
  cookie = email  로그인 하려는 email을 저장
  cookie = token  로그인 하려는 token을 저장
-->


<template>
  <div v-if="state == 'ok'">
    <div class="row text-right pr-sm-2">
      <small><a href="#" @click="onLogout">Logout</a></small>
    </div>
    <Editor />
  </div>

  <div v-else-if="state == 'loading'">Loading...</div>

  <Login v-else :email="email" :type="state" @state="state = 'ok'"/>
  <!-- 로그인 완료 여부는 사용자 이벤트(custom event)를 지켜봐야 함
  이벤트명=state
  이벤트 발생시 state = 'ok'로 변경하여 로그인이 완료되었다고 admin 컴포넌트에 알린다.
  admin 컴포넌트가 마운트 되기 전에 token 검사한다.  -->
</template>

<script>
import Login from '/@components/Login.vue'
import Editor from '/@components/Editor.vue'
import {ref, onBeforeMount} from 'vue';
import {getCookie, setCookie} from '/@utils/cookie.js'
import useLogin from '/@app_modules/login.js'

export default {
  setup(){
    const state = ref('loading');
    const token = ref(getCookie('token'));
    const email = ref(getCookie('email'));

    onBeforeMount(() => {
      const {checkToken} = useLogin();
      // 토큰 여부 검사
      const auto_login = getCookie('stay') === 'true'; // 로그인 유지 여부 저장

      // 초기값
      email.value = email.value == '' ? 'test-email' : email.value;
      token.value = token.value == '' ? 'test-token' : token.value;

      checkToken(email.value, token.value)
      .then(data => {
        if (data.data == 'vue'){
          state.value = 'update'; // 최초 정보 입력 or 비밀번호 변경 창 띄워야 함
          email.value = ''; // 초기화

        } else if (auto_login){
          state.value = 'ok'; // 로그인 완료

        } else {
          state.value = 'login'; // 로그인 창 띄움
        }
      })
      .catch(e => {
        state.value = 'login'; // 로그인 창 띄움
      });
    })

    const onLogout = (e) => {
      if (e){
        e.preventDefault();
      }
      setCookie('token', '');
      state.value = 'login'; // 로그인 창 띄움
    }


    return {
      state,
      email,
      onLogout,
    }
  },
  components : {
    Login,
    Editor
  }
}
</script>
