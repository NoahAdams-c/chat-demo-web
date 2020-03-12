/**
 * @Description:
 * @Author: chenchen
 * @Date: 2020-01-13 15:29:02
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-12 23:07:34
 */
import Vue from "vue"
import App from "./App.vue"
// 引入elementui样式文件
// import "element-ui/lib/theme-chalk/index.css"
import "@s/variables.scss"
// 引入elementui组件
import {
  Button,
  Input,
  Card,
  Form,
  FormItem,
  Drawer,
  Avatar,
  Message,
  Loading
} from "element-ui"
// 引入lib-flexible
import "lib-flexible"

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Card.name, Card)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Drawer.name, Drawer)
Vue.component(Avatar.name, Avatar)
Vue.prototype.$message = Message
Vue.use(Loading.directive)

// 引入socketio
// import SIO from "socket.io-client"
const SIO = require("socket.io-client/dist/socket.io")
// 服务器地址
const SERVER_HOST =
  process.env.NODE_ENV === "production"
    ? "119.23.52.173:7003"
    : "192.168.1.6:7003"
// const SERVER_HOST = "119.23.52.173:7003"
// 将socket注入全局对象
Vue.prototype.$socket = SIO
Vue.prototype.SERVER_HOST = SERVER_HOST
// axios封装
import { baseAjax } from "cc-vue-util"
Vue.prototype.$ajax = baseAjax(`http://${SERVER_HOST}`)
// vuex - store对象
import store from "./store"
Vue.prototype.$store = store

Vue.config.productionTip = false
import router from "./router"

new Vue({
  render: h => h(App),
  router
}).$mount("#app")
