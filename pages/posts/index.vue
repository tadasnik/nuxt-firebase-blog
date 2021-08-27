<template>
  <div calss="posts-page">
    <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'log',
  computed: {
    ...mapGetters({
      loadedPosts: 'getPosts',
    })
  }
}
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
