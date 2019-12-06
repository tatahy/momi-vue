// assemble modules and export the store


import Vue from 'vue'
import Vuex from 'vuex'

import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

//只能通过commit mutations中的函数才能修改state中的数据
const store = new Vuex.Store({
  //modules: {
	
  //},
  strict: process.env.NODE_ENV !== 'production',
  //plugins: debug ? [createLogger()] : []
  state,
  getters,
  mutations,
  actions
})

export default store