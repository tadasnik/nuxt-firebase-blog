export const state = () => ({
  loadedPosts: [],
  token: null
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
  },

  'SET_TOKEN' (state, token) {
    state.token = token
  },

  'CLEAR_TOKEN' (state) {
    state.token = null
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

  async addPost ({ commit, state }, payload) {
    const newPost = { ...payload, updatedDate: new Date() }
    const postAction = await this.$http.$post('/post.json?auth=' + state.token, newPost)
    commit('ADD_POST', { ...newPost, id: postAction.name })
    return
  },

  editPost ({ commit, state }, payload) {
    console.log('state token', state.token)
    this.$http.put('/post/' + payload.id + '.json?auth=' + state.token, payload)
    commit('EDIT_POST', payload)
  },

  async authenticateUser ({ commit }, authData) {
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.firebaseKey
    if (!authData.isLogin) {
      authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.firebaseKey
    }
    try {
      const result = await this.$http
        .$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
      commit('SET_TOKEN', result.idToken)
      //set localStorage values for access from client
      localStorage.setItem('token', result.idToken)
      const expirationDate = new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
      localStorage.setItem('tokenExpiration', expirationDate)
      //set cookie values as well for if needed on server
      this.app.$cookies.set('ssrToken', result.idToken)
      this.app.$cookies.set('ssrExpiration', expirationDate)
    } catch(e) {
      console.log(e)
    }
  },

  initAuth ({ commit, dispatch }, req ) {
    // if request (server) try to extract token and expirationDate from cookie
    let token
    let expirationDate
    if (req) {
      if (!req.headers.cookie) {
        return
      }
      const ssrToken = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('ssrToken='))
      if (!ssrToken) {
        return
      }
      token = ssrToken.split('=')[1]
      expirationDate = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('ssrExpiration='))
        .split('=')[1]
    } else {
      // Otherwise if on client, get token and expirationDate from localStorage
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    if (new Date().getTime() > expirationDate || !token) {
      console.log('initAuth no or invalid token')
      dispatch('logout')
      return
    }
    commit('SET_TOKEN', token)
  },

  logout ({ commit }) {
    console.log('store logout')
    commit('CLEAR_TOKEN')
    this.app.$cookies.remove('ssrToken')
    this.app.$cookies.remove('ssrExpiration')
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }

  }
}

export const getters = {
  getPosts: (state) => {
    return state.loadedPosts
  },
  isAuthenticated: (state) => {
    return state.token != null
  }
}
