const state = {
  userData: null
}

const mutations = {
  setUserData (state, { userData }) {
    state.userData = userData
  }
}

export default {
  namespaced: true,
  state,
  mutations
}