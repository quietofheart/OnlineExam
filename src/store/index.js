import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  name:'store',
  state: {
    userName: '',// 登录账号存储
    password: '',// 登录密码存储

    newUserName: '',// 注册账号存储
    newPassword: '',// 注册密码存储
    newEmail: '',// 注册邮箱存储
    newText: '',// 注册邀请码存储
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
