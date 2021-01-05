export const state = () => ({
  authenticated: false,
  user: null,
})

export const mutations = {
  SET_AUTH_USER: (state, authUser) => {
    const { uid, email, emailVerified } = authUser
    state.user = { uid, email, emailVerified }
    state.authenticated = true
  },
  RESET_STORE: (state) => {
    state.user = null
    state.authenticated = false
  },
}

export const actions = {
  onAuthStateChanged({ commit }, authUser) {
    if (!authUser) {
      commit('RESET_STORE')
    } else {
      commit('SET_AUTH_USER', authUser)
    }
  },
}
