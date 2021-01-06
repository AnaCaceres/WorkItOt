export const state = () => ({
  authenticated: false,
  user: null,
  token: null,
})

export const mutations = {
  SET_AUTH_USER: (state, { authUser, token }) => {
    const { uid, email, emailVerified } = authUser.user
    state.user = { uid, email, emailVerified }
    state.authenticated = true
    state.token = token
  },
  RESET_STORE: (state) => {
    state.user = null
    state.authenticated = false
  },
}

export const actions = {
  async logUser({ commit }, authUser) {
    let token = null
    if (process.browser) {
      if (localStorage.getItem('authToken')) {
        token = localStorage.getItem('authToken')
      } else {
        await this.$fire.auth.currentUser.getIdToken().then(function (idToken) {
          localStorage.setItem('authToken', idToken)
          localStorage.setItem('authUser', JSON.stringify(authUser))
          token = idToken
        })
      }
    }
    commit('SET_AUTH_USER', { authUser, token })
  },
  logOut({ commit }) {
    if (process.browser) {
      localStorage.clear()
    }
    commit('RESET_STORE')
  },
}
