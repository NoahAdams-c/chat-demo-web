/**
 * @Description: 路由配置
 * @Author: chenchen
 * @Date: 2020-03-06 18:05:11
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-14 02:42:43
 */
import Vue from "vue"
import Router from "vue-router"

import Login from "@/components/Login"
import Regist from "@/components/Regist"
import Home from "@/components/Home"
import Chat from "@/components/Chat"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/regist",
      name: "Regist",
      component: Regist
    },
    {
      path: "/home/:user_id",
      name: "Home",
      component: Home,
      props: true
    },
    {
      path: "/chat/:friend_user_id",
      name: "Chat",
      component: Chat,
      props: true
    }
  ]
})
