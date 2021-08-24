import axios from 'axios'
export const state = () => ({
  loadedPosts: []
})

export const mutations = {
  'SET_POSTS' (state, payload) {
    state.loadedPosts = payload
  },
  'ADD_POST' (state, payload) {
    state.loadedPosts.push(payload)
  },

  'EDIT_POST' (state, editedPost) {
    console.log('edit_post', editedPost.id)
    const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
    state.loadedPosts[postIndex] = editedPost
  }
}

export const actions = {
  nuxtServerInit (vuexContext, context) {
    return axios.get('https://nuxt-blog-3d2f9-default-rtdb.europe-west1.firebasedatabase.app/post.json')
      .then(res => {
        let postsArray = []
        for (const key in res.data) {
          console.log(key)
          postsArray.push({ ...res.data[key], id: key })
        }
        vuexContext.commit('SET_POSTS', postsArray)
      }).catch(e => context.error(e))
  },

  setPosts: ({ commit }, payload) => {
    commit('SET_POSTS', payload)
  },

  async addPost ({ commit }, payload) {
    const newPost = { ...payload, updatedDate: new Date() }
    const postAction = await this.$http.$post('https://nuxt-blog-3d2f9-default-rtdb.europe-west1.firebasedatabase.app/post.json', newPost)
    commit('ADD_POST', { ...newPost, id: postAction.name })
    return
  },

  async editPost ({ commit }, payload) {
    console.log('editPost action', payload.id)
    await this.$http.put('https://nuxt-blog-3d2f9-default-rtdb.europe-west1.firebasedatabase.app/post/' + payload.id + '.json', payload)
    commit('EDIT_POST', payload)
    return
  }
}

export const getters = {
  getPosts: (state) => {
    return state.loadedPosts
  }
}
