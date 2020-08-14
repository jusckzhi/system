import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态
const state = {
  arr: ""
}

// 修改状态
const mutations = {
  setName(state, json) {
    state.arr.push(json)
  }
}

// 批量方法
const actions = {
  getName(context, arr) {
    context.commit("setCollect", arr)
  }
}

// 批量状态
const getters = {
  arr(state) {
    return state.collect
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})