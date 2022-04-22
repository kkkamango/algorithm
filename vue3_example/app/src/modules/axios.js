import axios from 'axios'
import {ref} from 'vue'

export default function (){
  const BASE_URL = 'http://localhost:8000';
  const communicating = ref(false);
  const createURL = (url) => {
    return url.startsWith('http') ? url : BASE_URL + url;
  }

  const checkResult = (resp, onSuccess, onFailed) =>{
    communicating.value = false;

    if (resp.status === 200 && resp.data.rsp === 'ok'){
      if(onSuccess){
        onSuccess(resp.data)
      }
    } else {
      if (onFailed){
        onFailed(resp.data)
      }
    }
  }

  const axiosGet = async(url, onSuccess = null, onFailed = null) => {
    communicating.value = true;

    axios.get(createURL(url))
      .then(resp => {
        checkResult(resp, onSuccess, onFailed)
      });
  }

  const axiosPost = async(url, data, onSuccess = null, onFailed = null) => {
    communicating.value = true;

    axios.post(createURL(url), data)
      .then(resp => {
        checkResult(resp, onSuccess, onFailed)
      });
  }

  const axiosPut = async(url, data, onSuccess = null, onFailed = null) => {
    communicating.value = true;

    axios.get(createURL(url), data)
      .then(resp => {
        checkResult(resp, onSuccess, onFailed)
      });
  }

  return {
    communicating,
    axiosGet,
    axiosPost,
    axiosPut,
  }
}
