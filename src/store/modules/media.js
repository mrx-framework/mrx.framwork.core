import api from "@/api"

const state = {
  mediaList: {
    count: 0,
    rows: []
  }
}

const getters = {

}

const actions = {
  FETCH_MEDIAS: async ({ commit }, payload) => {
    const { page } = payload
    const { data } = await api.FETCH_MEDIAS({ params: { page } })
    commit("SET_MEDIAS", data)
  },
  UPLOAD_MEDIAS: async({ dispatch }, payload) => {
    await api.UPLOAD_MEDIA(payload)

    dispatch("FETCH_MEDIAS", { page: 1 })
  }
}

const mutations = {
  SET_MEDIAS: (state, medias) => state.mediaList = medias
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
