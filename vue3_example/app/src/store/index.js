/**
 * /store/index.js
 * 스토어 모듈을 묶어 하나의 스토어 인스턴스로 만들어 줌
 */
import { createStore } from "vuex";
import {about_me} from './modules/about-me'
import {applications} from './modules/applications'

export const store = createStore({ // store 생성 (vuex4)
  modules : {
    about_me,
    applications,
  }
});
