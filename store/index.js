export const state = () => ({
  userImg: null,
  name: null,
})

export const mutations = {
  changeUserImage(state, newImage) {
    state.userImg = newImage
  },
  changeUserName(state, newName) {
    state.name = newName
  },
  resetStore: (state) => {
    state.userImg = null
    state.email = null
    state.name = null
  },
}

export const actions = {
  logOut({ commit }) {
    commit('resetStore')
  },
}
