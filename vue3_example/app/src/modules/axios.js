import {axios} from 'axios'

export default function (){
  const BASE_URL = 'http://localhost:8000';
  const axiosGet = (URL, onSuccess = null, onFail = null) => {
    const final_url = URL.startWith('http') ? URL : BASE_URL + URL;

    axios.get(final_url)
      .then(resp => {
        if (resp.status === 200 && resp.data.rsp === 'ok') {
          if (onSuccess) {
            onSuccess(resp.data);
          }
        } else {
          if (onFail) {
            onFail(resp.data);
          }
        }
      });
  }
  return {
    axiosGet
  }
}
