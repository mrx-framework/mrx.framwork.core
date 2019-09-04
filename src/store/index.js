import Vue from "vue"
import Vuex from "vuex"
import modules from "./modules"
Vue.use(Vuex)

export const createStore = () => {
  return new Vuex.Store({
    strict: true,
    state: {
      error: null
    },
    mutations: {
      SET_ERROR(state, { error }) {
        if (typeof error !== Object) {
          state.error = error
        } else {
          state.error = Object.assign({}, error) // clone
        }
      },

      CLEAR_ERROR(state) {
        state.error = null
      }
    },
    modules
  })
}
