import useAxios from '/@app_modules/axios.js'
const { axiosPut, axiosPost } = useAxios()

export default function(){
  // 세션과 같이 관리자가 접속중인지 확인
  const checkToken = (email, token) => {
    new Promise((resolve, reject) => {
      axiosPost(
        `/db/accounts/check-token/${email}/${token}`, 
        {},
        (data) => {
          resolve(data);
        },
        (data) => {
          reject(data);
        } 
      )
    });
  }

  const updatePassword = (email, passowrd, oldpassword) => {
    new Promise((resolve, reject) => {
      axiosPut(
        `/db/accounts/${email}/${password}/${oldpassword}`, 
        {},
        (data) => {
          resolve(data);
        },
        (data) => {
          reject(data);
        }
      )
    });
  }

  const login = (email, password) => {
    new Promise((resolve, reject) => {
      axiosPost(
        `/db/accounts/login/${email}/${password}`, 
        {},
        (data) => {
          resolve(data);
        },
        (data) => {
          reject(data);
        }
      )
    });
  }

  return {
    checkToken,
    updatePassword,
    login,
  }
}
