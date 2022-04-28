<template>
<!-- 
  블로그를 위해 마크다운 글을 작성하는 에디터
  제목, 글, 프리뷰
 -->
  <form @submit="onSubmit" class="m1 row">
    <div class="text-right my-2">
      <button type="submit" class="btn btn-primary btn-sm">저장하기</button>
    </div>
    <div><input v-model="title" type="text" class="w-100 my-2" placeholder="제목" required/></div>
    <div class="col-sm-6"><textarea v-model="content" ref="input" id="mdTextarea" class="w-100" required></textarea></div>
    <div class="col-sm-6 text-left" ref="output" id="preview">
      <markdown class="border" id="md" :source="content"></markdown>
    </div>
  </form>
</template>

<script>
import Markdown from 'vue3-markdown-it'
import useAxios from '/@app_modules/axios.js'
import {ref} from 'vue'

export default {
  setup() {
    const {axiosPost} = useAxios();
    const title = ref('');
    const content = ref('');

    const onSubmit = (e) => {
      if (e){
        e.preventDefault();
      }

      if (content.value.length > 0){
        axiosPost(
          '/db/blog',
          {
            title : title.value,
            content : content.value,
            type : 'md'
          },
          (data) => {
            console.log('저장하였습니다.');
            title.value = content.value = '';
          },
          (data) => {
            console.error('저장하지 못하였습니다.');
          }
        );
      } else {
        console.error('컨텐츠를 작성하세요.')
      }
    }

    return {
      title,
      content,
      onSubmit,
    }
  },
  components : {
    Markdown
  }
}
</script>

<style scoped>
#mdTextarea{ height: 500px;}
#md{height: 500px; overflow: scroll;}
</style>
