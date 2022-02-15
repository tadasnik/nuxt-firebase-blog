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
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  data () {
    return {
    }
  },
  async asyncData({ params, $http }) {
    const rawPost = await $http.$get('/post/' + params.id + '.json')
    const loadedPost = { ...rawPost, id: params.id }
    return { loadedPost }
  },
  methods: {
    async onSubmitted(editedPost) {
      console.log(editedPost)
      await this.$store.dispatch('editPost', editedPost)
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
