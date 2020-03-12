/**
 * @Description:
 * @Author: chenchen
 * @Date: 2019-10-29 17:01:18
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-13 00:16:28
 */
import Vue from "vue"
import Vuex from "vuex"
import { deepCopy } from "cc-vue-util/common"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    socketObj: null,
    onlineUsers: []
  },
  mutations: {
    updateSocket(state, socketObj) {
      state.socketObj = socketObj
    },
    updateOnlineUsers(state, onlineUsers) {
      state.onlineUsers = onlineUsers
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      state.isLogin = !!userInfo
    }
  },
  getters: {
    getSocket(state) {
      return state.socketObj
    },
    getOnlineUsers(state) {
      return state.onlineUsers
    },
    getUserInfo(state) {
      let userInfo = deepCopy(state.userInfo)
      userInfo.avatar =
        "http://" + Vue.prototype.SERVER_HOST + state.userInfo.avatar
      return userInfo
    },
    getLoginStatus(state) {
      return state.isLogin
    }
  }
})
