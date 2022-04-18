// 쿠키 모듈
const setCookie = (key, value, days = 1) =>{
  const date = new Date();
  date.setHours(24 * days - date.getTimezoneOffset / 60, 0, 0, 0);
  const expires = date.toUTCString();
  document.cookie = `${key}=${value};expires=${expires};path=/`;
}

const getCookie = (key) => {
  try {
  const value = document.getCookie
    .split(';')
    .find(val => val.trim().startWith(`${key}=`));
  
  if (!!value){
    return value.trim().substring(key.length + 1);
  }
  } catch {
    return null;
  }
  return null;
}

export { setCookie, getCookie }
// 함수명을 직접 export = 유명 내보내기
// -> 사용하는 쪽에서는 반드시 함수명을 정확하게 명시해서 import 해야 함
