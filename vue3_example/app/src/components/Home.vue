<template>
  <!-- <Blog /> -->
  <ul class="nav nav-tabs justify-content-end">
    <li class="nav-item" :class="{active : type === 'blog'}"
      @click="type = 'blog'">
      <a href="#" class="nav-link">Blog</a>
    </li>
    <li class="nav-item" :class="{active : type === 'clip'}"
      @click="type = 'clip'">
      <a href="#" class="nav-link">Clips</a>
    </li>
  </ul>
  <div v-is="type"></div>
  <!-- v-if / router-view / v-is -->
</template>

<script>
import Blog from '/@components/Blog.vue'
import {ref, defineComponent} from 'vue'

const Clip = defineComponent({
  template : `
    <div class="row">
      <div class="col-sm-6 p-1">
        <div class="card">
          <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/iNYUpxY_yqs" 
              title="스크래치 튜토리얼 #1" allowfullscreen></iframe>
          </div>
          <div class="card-body">
            <h5 class="card-title">스크래치 튜토리얼 #1</h5>
            <p class="card-text">걸어다니는 고양이를 구현하여 스프라이트의 사용법을 배웁니다.</p>
          </div>
        </div>
      </div>
      
      <div class="col-sm-6 p-1">
        <div class="card">
          <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/bvovpsDJvRg"
              title="스크래치 튜토리얼 #2" allowfullscreen></iframe>
          </div>
          <div class="card-body">
            <h5 class="card-title">스크래치 튜토리얼 #2</h5>
            <p class="card-text">점프하는 고양이를 구현하여 스프라이트의 유동성에 대해 배워봅니다.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})

export default {
  setup(props) {
    const type = ref('blog')

    return {
      type
    }
  },
  components : { Blog, Clip }
}
</script>
