<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
      <AppButton @click="onLogout">Logout</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing posts</h1>
      <PostList :posts="loadedPosts" isAdmin />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  computed: {
    ...mapGetters({
      loadedPosts: 'getPosts',
    })
  },
  methods: {
    onLogout () {
      console.log('onLogout')
      this.$store.dispatch('logout')
      this.$route.push('/admin/auth')
    }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
