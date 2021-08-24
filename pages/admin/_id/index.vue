<template>
  <div class="admin-post-image">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submitPost="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  data () {
    return {
    }
  },
  async asyncData({ params, $http }) {
    const rawPost = await $http.$get('https://nuxt-blog-3d2f9-default-rtdb.europe-west1.firebasedatabase.app/post/' + params.id + '.json')
    const loadedPost = { ...rawPost, id: params.id }
    return { loadedPost }
  },
  methods: {
    onSubmitted(editedPost) {
      console.log(editedPost)
      this.$store.dispatch('editPost', editedPost)
      this.$router.push('/admin')
    }
  }
}
</script>
<style>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
