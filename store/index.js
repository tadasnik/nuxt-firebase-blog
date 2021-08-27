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
  async nuxtServerInit (vuexContext, context) {
    const data = await context.app.$http.$get('/post.json')
    let postsArray = []
    for (const key in data) {
      console.log(key)
      postsArray.push({ ...data[key], id: key })
    }
    vuexContext.commit('SET_POSTS', postsArray)
  },

  setPosts: ({ commit }, payload) => {
    commit('SET_POSTS', payload)
  },

  async addPost ({ commit }, payload) {
    const newPost = { ...payload, updatedDate: new Date() }
    const postAction = await this.$http.$post('/post.json', newPost)
    commit('ADD_POST', { ...newPost, id: postAction.name })
    return
  },

  editPost ({ commit }, payload) {
    console.log('editPost action', payload.id)
    this.$http.put('/post/' + payload.id + '.json', payload)
    commit('EDIT_POST', payload)
  }
}

export const getters = {
  getPosts: (state) => {
    return state.loadedPosts
  }
}
