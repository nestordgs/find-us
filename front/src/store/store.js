import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ],
  state: {
    token: null,
    user: null,
    isLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isLoggedIn = !!token
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  },
  getters: {
    isAuth: state => {
      return state.isLoggedIn
    }
  }
})
