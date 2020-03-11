/**
 * @Description:
 * @Author: chenchen
 * @Date: 2020-01-13 15:29:02
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-11 22:42:21
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
// 引入elementui样式文件
// import "element-ui/lib/theme-chalk/index.css"
import "@s/variables.scss"
// 引入elementui组件
import { Button, Input, Card, Form, FormItem, Drawer, Avatar } from "element-ui"
// 引入lib-flexible
import "lib-flexible"

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Card.name, Card)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Drawer.name, Drawer)
Vue.component(Avatar.name, Avatar)

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router
}).$mount("#app")
