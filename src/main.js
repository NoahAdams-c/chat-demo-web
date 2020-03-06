/**
 * @Description:
 * @Author: chenchen
 * @Date: 2020-01-13 15:29:02
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-06 20:44:42
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
// 引入elementui样式文件
import "element-ui/lib/theme-chalk/index.css"
// 引入elementui组件
import { Button, Input } from "element-ui"
// 引入lib-flexible
import "lib-flexible"

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router
}).$mount("#app")
