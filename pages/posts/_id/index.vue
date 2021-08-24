<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-details">Last updated {{ loadedPost.updatedDate }}</div>
        <div class="post-details">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know your thoughts about the post, email to <a href="mailto:tadas.nik@gmail.com">tadas.nik@gmail.com</a></p>
    </section>
  </div>
</template>
<script>
//import axios from 'axios'
export default {
  data () {
  },
  async asyncData({ params, $http }) {
    const loadedPost = await $http.$get('https://nuxt-blog-3d2f9-default-rtdb.europe-west1.firebasedatabase.app/post/' + params.id + '.json')

    console.log(loadedPost)
    return { loadedPost }
  },
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
