import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js' // ES Module 로 컴파일
// main.js에서 import 하면 모든 영역에서 import한 기능을 사용할 수 있다.

const app = createApp(App);
app.provide('today', new Date().toISOString().split('T')[0]);
// 어플리케이션 인스턴스에서 today 변수를 provide
// -> 모든 컴포넌트는 today를 inject 하여 사용 가능
app.mount('#app');
