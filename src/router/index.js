/**
 * @Description: 路由配置
 * @Author: chenchen
 * @Date: 2020-03-06 18:05:11
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-06 18:16:08
 */
import Vue from "vue"
import Router from "vue-router"

import HelloWorld from "@/components/HelloWorld"
// import Chat from "@/components/chat"
// import Regist from "@/components/regist"
// import Login from "@/components/login"

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			name: "HelloWord",
			component: HelloWorld
		}
		// {
		//   path: "/",
		//   name: "Login",
		//   component: Login
		// },
		// {
		//   path: "/chat",
		//   name: "Chat",
		//   component: Chat
		// },
		// {
		//   path: "/regist",
		//   name: "Regist",
		//   component: Regist
		// }
	]
})
