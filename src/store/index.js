import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  name:'store',
  state: {
    userName: localStorage.getItem('uN'),// 登录账号存储
    password: '',// 登录密码存储
    newUserName: '',// 注册账号存储
    newPassword: '',// 注册密码存储
    newEmail: '',// 注册邮箱存储
    newText: '',// 注册邀请码存储
    myExam:[],// 存储我的考试
    userExam:{},// 存储用户正在进行的考试信息
  },
  getters: {
  },
  mutations: {
    addMyExam(state,id){ //处理我的考试相关的数据
      state.myExam.push(id)
      console.log(state.myExam);
    },
    goExam(state,exam){ //处理存储用户正在进行的考试
      state.userExam = exam
    },
  },
  actions: {
  },
  modules: {
  }
})
