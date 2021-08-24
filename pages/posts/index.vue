<template>
  <div calss="posts-page">
    <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import { mapGetters } from 'vuex'
export default {
  components: {
    PostList
  },
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
