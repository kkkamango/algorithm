<!--
state = type
type = login
type = update

stau = 로그인 유지
-->
<template>
  <div class="d-flex text-center mt-md-5">
    <main class="form-signin">
      <form @submit="onSubmit">
        <h1 class="h3 mb-3 fw-normal">{{is_login_form ? '로그인 하세요' : '비밀번호 업데이트'}}</h1>

        <small v-if="invalid == 'no_email'" class="text-danger">이메일이 존재하지 않습니다.</small>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" autocomplete="username" required
          ref="ref_email"
          v-model="email"/>
        
        <small v-if="invalid == 'wrong_password'" class="text-danger">비밀번호가 틀렸습니다.</small>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" autocomplete="current-password" required
          v-model="password">
        
        <div v-if="!is_login_form">
          <small class="text-danger">새로운 비밀번호가 다릅니다.</small>
          <input type="password" id="inputPasswordNew1" class="form-control" placeholder="New Password" autocomplete="new-password" required
            v-model="new_password1"
            :class="{'is-invalid' : invalid == 'diff_passwords'}">
          <input type="password" id="inputPasswordNew2" class="form-control" placeholder="New Password" autocomplete="new-password" required
            v-model="new_password2"
            :class="{'is-invalid' : invalid == 'diff_passwords'}">
        </div>

        <div class="m-3"></div>

        <div v-if="is_login_form" class="checkbox mb-3">
          <input type="checkbox" v-model="stay"/>로그인 유지하기
        </div>

        <button type="submit" class="btn btn-lg btn-primary btn-block">{{is_login_form ? '입장하기' : '변경하기'}}</button>
        <p class="mt-5 mb-3 text-muted">오직 관리자만 입장하실 수 있습니다.</p>
      </form>
    </main>
  </div>
</template>

<script>
import {ref, onMounted, inject} from 'vue'
import useLogin from '/@app_modules/login.js'
// import useLogin from '/@app_modules/login.js'
import {setCookie, getCookie} from '/@utils/cookie.js'

export default {
  props : {
    email : {type : String, default : ''},
    type : {type : String, default : 'login'}
  },
  emits : ['state'],
  setup(props, context) {

    const ref_email = ref(null);
    const stay = ref(false);
    const is_login_form = ref(props.type === 'login');
    const email = ref(props.email);
    const password = ref('');
    const new_password1 = ref('');
    const new_password2 = ref('');
    const invalid = ref('ok'); // no_email, wrong_password, diff_passwords
    const { updatePassword, login } = useLogin();

    // 토스트 추가
    const toast = inject('toast', '');

    stay.value = getCookie('stay') == 'true';

    const onSubmit = (e) =>{
      if (e){
        e.preventDefault();
      }

      invalid.value = 'ok' // 

      if (is_login_form.value){
        // 로그인
        login(email.value, password.value)
          .then((data) => {
            setCookie('email', email.value);
            setCookie('token', data.token);

            if(stay.value){
              setCookie('stay', 'true');
            } else {
              setCookie('stay', 'false');
              setCookie('token', ''); // 
            }

            context.emit('state');
          })
          .catch((data) =>{
            invalid.value = toast.value = data.rsp;
          });

      } else {
        // 비밀번호 변경
        if(new_password1.value !== new_password2.value){
          invalid.value = toast.value = 'diff_passwords';
          new_password1.value = new_password2.value = '';

        } else if (new_password1.value == 'vue') {
          invalid.value = toast.value = 'invalid_password'
          new_password1.value = new_password2.value = ''
        
        } else {
          updatePassword(email.value, password.value, new_password1.value)
            .then(data => {
              password.value = new_password1.value = new_password2.value = '';
              toast.value = '비밀번호가 변경되었습니다. 로그인 해주세요.'
              is_login_form.value = true; // 로그인 화면
            })
            .catch((data) =>{
              invalid.value = toast.value = data.rsp;
            });
        }
      }
    }

    
    onMounted(() => {
      // 마운트 시점에 포커스를 활성화 한다
      ref_email.value.focus();
    })

    return {
      is_login_form,
      ref_email,
      email,
      password,
      new_password1,
      new_password2,
      onSubmit,
      invalid,
      stay,
    }
  }
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin > .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin > input[type='password'] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
