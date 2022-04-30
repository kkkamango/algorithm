<template>
<!--
main                    -- 컨테이너
  article               -- 포스트
    h2#blog-post-title
    p#blog-post-meta
  nav                   -- 페이징
  about
  archives              -- 월별 아카이브
-->
  <main class="container mb-3">
    <div class="row g-5">
      <div class="col-md-8">
        <h3 class="pb-4 md-4 fst-italic border-bottom">
          Blog
        </h3>
        <!-- posts -->
        <article v-for="article in sliced_posts" :key="article.id" class="blog-post"
          :id="'article-' + article.id">
          <h2 class="blog-post-title">{{article.title}}</h2>
          <p class="blog-post-meta">{{article.date}}</p>

          <div v-if="article.type === 'html'" v-html="article.post"></div>
          <markdown v-else-if="article.type === 'md'" id="md" :source="article.post"></markdown>
        </article>

        <!-- pagination -->
        <nav class="blog-pagination" aria-label="Pagination">
          <a href="#" class="btn"
            :class="[page == 1 ? 'btn-outline-secondary disable' : 'btn-outline-primary']"
            @click="page--">Older</a>

          {{page}}

          <a href="#" class="btn"
            :class="[page == total_pages ? 'btn-outline-secondary disable' : 'btn-outline-primary']"
            @click="page++">Newer</a>
        </nav>
      </div>

      <div class="col-md-4">
        <div class="position-sticky" style="top: 2rem;">
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">About</h4>
            <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
          </div>

          <!-- 아카이브 -->
          <!-- 7-4 슬롯을 이용하여 블로그 플러그인 제작 -->
          <blog-plugin>
            <template v-slot:header>Archives</template>
          <!-- <div class="p-4"> -->
            <!-- <h4 class="fst-italic">Archives</h4> -->
            <ol v-for="(archive, index) in archives" :key="index" class="list-unstyled mb-0">
              <li>
                <a :data-bs-target="'#archive-' + index"
                  data-bs-toggle="collapse" href="#">{{archive.key}}</a>
                <div class="collapse" :id="'archive-' + index">
                  <ol class="list-unstyled ms-3">
                    <li v-for="post in archive.posts" :key="post.id" >
                      {{post.date.substring(0, 10) + ': '}}
                      <a :href="'#article-' + post.id"
                        @click="onArchive($event, post.id)">{{post.title.substring(0, 20)}}</a>
                    </li>
                  </ol>
                </div>
              </li>
            </ol>
          <!-- </div> -->
          </blog-plugin>

          <blog-plugin>
            <template v-slot:header>Elsewhere</template>
          <!-- <div class="p-4"> -->
            <!-- <h4 class="fst-italic">Elsewhere</h4> -->
            <ol class="list-unstyled">
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ol>
          <!-- </div> -->
          </blog-plugin>
        </div>
      </div>
    </div>
  </main>

</template>

<script>
import useAxios from '/@app_modules/axios.js'
import {ref, reactive, computed, onMounted} from 'vue'
import Markdown from 'vue3-markdown-it'
import BlogPlugin from '/@components/BlogPlugin.vue'

export default {
  setup() {
    const {axiosGet} = useAxios();
    const posts = reactive([]);
    
    // 페이징
    const rows = ref(5); // 한페이지 보여지는 post 수
    const total_rows = ref(0); // 전체 post 수
    const page = ref(1); // 현재 페이지
    const total_pages = computed(() => { // 전체 페이지
      return Math.ceil(total_rows.value / rows.value)
    })
    const sliced_posts = computed(() => { // 화면에 보여지는 post
      return posts.slice( (page.value -1) * rows.value, page.value * rows.value )
    })
    
    // 아카이브 (월별)
    const archives = reactive([]);
    // 아카이브에서 포스트 클릭시 article id 획득
    const onArchive = (e, id) => {
      const index = posts.findIndex( post => post.id == id ) + i;
      page.value = Math.ceil(index / rows.value);
    }
    
    onMounted(() => {
      axiosGet('/db/blog', onSucces)
    })

    const onSucces = (data) =>{
      Object.assign(posts, data.data);
      total_rows.value = posts.length;

      // 아카이브 (월별)
      const temp_group = posts.reduce((accumulator, currentValue) => {
        ;(accumulator[currentValue['date'].substring(0,7)] =
        accumulator[currentValue['date'].substring(0, 7)] || []).push(currentValue)
        return accumulator
      }, {})

      Object.assign(
        archives, 
        Object.keys(temp_group).map((key) => ({
          key : key,
          posts : temp_group[key],
        }))
      )
    }

    return {
      // posts,
      sliced_posts,
      page,
      total_pages,
      archives,
      onArchive,
    }
  },
  components : {
    Markdown,
    BlogPlugin,
  }
}
</script>

<style scoped>

</style>
