const state = {
  teacher: [],
  stuList: []
}

const mutations = {
  setTeacher (state, { teacher }) {
    state.teacher = teacher
  },
  setStuList (state, { stuList }) {
    state.stuList = stuList
  }
}

export default {
  namespaced: true,
  state,
  mutations
}