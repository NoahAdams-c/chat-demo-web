<!--
 * @Description: 聊天页
 * @Author: chenchen
 * @Date: 2020-03-13 00:35:44
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-14 04:00:19
 -->
<template>
  <div class="chat">
    <el-card :body-style="{ padding: '6px' }">
      <!-- 头部标题 -->
      <div slot="header">
        <div class="chat__header">
          <i class="chat__header--back el-icon-arrow-left"
             @click="goBack"></i>
          <div class="chat__header--title">
            {{ friendInfo.nick_name }}
          </div>
        </div>
      </div>
      <div class="chat__main">
        <!-- 消息展示面板 -->
        <div class="chat__main--msg"
             ref="chatview">
          <div class="msg__item"
               :class="item.user_id === friend_user_id? 'float-left':'float-right'"
               v-for="(item,index) in msgList"
               :key="index">
            <div class="msg__item--avatar">
              <el-avatar size="small"
                         :src="avatarUrl(item.user_id)"></el-avatar>
            </div>
            <div class="msg__item--content">
              {{item.content}}
            </div>
          </div>
        </div>
        <!-- 输入面板 -->
        <div class="chat__main--input">
          <el-input placeholder="输点啥..."
                    v-model="msg">
            <el-button slot="append"
                       @click="sendMsg">发送</el-button>
          </el-input>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { trim } from "lodash"
import { mapGetters } from "vuex"

export default {
  name: "Chat",

  props: ["friend_user_id"],

  data() {
    return {
      // socket实例
      socketObj: null,
      // 用户信息
      userInfo: {},
      // 朋友信息
      friendInfo: {},
      // 发送的消息
      msg: "",
      // 消息队列
      msgList: []
    }
  },

  // 路由守卫拦截非法进入主界面
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.getLoginStatus) {
        vm.getHistory()
        vm.initListener()
        next()
      } else {
        vm.$router.push({ path: "/" })
      }
    })
  },
  // 离开该组件的对应路由时调用
  beforeRouteLeave(to, from, next) {
    // 离开组件时注销resp事件
    if (this.socketObj) {
      this.socketObj.off("resp")
    }
    next()
  },

  computed: {
    ...mapGetters([
      //获取socket实例
      "getSocket",
      // 获取用户信息
      "getUserInfo",
      // 获取登录状态
      "getLoginStatus"
      // 获取最新消息
    ]),
    avatarUrl() {
      return user_id => {
        if (user_id === this.userInfo.user_id) {
          return this.userInfo.avatar
        } else if (user_id === this.friend_user_id) {
          return this.friendInfo.avatar
        }
        return ""
      }
    }
  },

  watch: {
    msgList: {
      handler() {
        // 每当消息展示框消息队列变化时将滚动条移至底部
        this.$nextTick(() => {
          this.$refs.chatview.scrollTop = this.$refs.chatview.scrollHeight
        })
      },
      deep: true
    }
  },

  methods: {
    /**
     * 发送消息
     */
    sendMsg() {
      // 去除空格
      this.msg = trim(this.msg)
      this.msgList.push({
        user_id: this.userInfo.user_id,
        content: this.msg,
        created_at: new Date()
      })
      let data = {
        msg: this.msg,
        to: this.friend_user_id
      }
      // 调起后台chat事件发送消息
      this.socketObj.emit("chat", data)
      // 每次输入发送完清空输入框
      this.msg = ""
    },
    /**
     * 获取历史消息
     */
    async getHistory() {
      // 查询历史消息
      let params = {
        user_id: this.userInfo.user_id,
        to_who: this.friend_user_id
      }
      let _data = await this.$ajax.doGet("/getRecords", params)
      if (_data.status === "success") {
        this.msgList = _data.data
      } else {
        // TODO: 接口调用失败处理
      }
    },
    /**
     * 注册监听事件
     */
    initListener() {
      // 监听回复事件
      this.socketObj.on("resp", data => {
        this.msgList.push({
          user_id: data.from,
          content: data.msg,
          created_at: data.created_at
        })
      })
    },
    /**
     * 返回主页
     */
    goBack() {
      this.$router.push({ path: `/home/${this.userInfo.user_id}` })
    },
    /**
     * 获取好友信息
     */
    async getFriendInfo() {
      let _data = await this.$ajax.doGet(`/getUserInfo/${this.friend_user_id}`)
      if (_data.status === "success") {
        this.friendInfo = {
          nick_name: _data.data.nick_name,
          avatar: `http://${this.SERVER_HOST}${_data.data.avatar}`
        }
      } else {
        // TODO: 接口调用失败处理
      }
    }
  },

  async created() {
    console.log(this.friend_user_id)
    this.socketObj = this.getSocket
    this.userInfo = this.getUserInfo
    await this.getFriendInfo()
  }
}
</script>

<style lang="scss" scoped>
.chat {
  height: 100vh;
  .el-card {
    background: rgba($color: #3a3a3a, $alpha: 0.6);
    border: unset;
    height: 100vh;
  }
  /deep/.el-card__header {
    height: 130px;
    color: #eaeaea;
    border: 0;
    box-shadow: 0 10px 12px 0 rgba(219, 219, 219, 0.1);
  }
  /deep/.el-card__body {
    height: calc(100vh - 150px);
  }
  /deep/.el-input__inner {
    background: #fff0;
    border: none;
    color: #2a2a2a;
  }
  &__header {
    display: flex;
    align-items: center;
    font-size: $--font-size-extra-large;
    &--back {
    }
    &--title {
      flex: 1;
      text-align: center;
      font-weight: 800;
    }
  }
  &__main {
    height: 100%;
    display: flex;
    flex-direction: column;
    &--msg {
      flex: 1;
      overflow-y: auto;
      padding-bottom: 20px;
      .msg__item {
        &--content {
          font-size: $--font-size-large;
          color: #eaeaea;
          padding: 16px 20px;
          margin: 0 20px;
          max-width: 60vw;
          overflow-wrap: break-word;
          background: #337399ad;
          border-radius: $--border-radius-base;
        }
        &--avatar {
        }
      }
      .msg__item ~ .msg__item {
        margin-top: 18px;
      }
      .float-right {
        display: flex;
        flex-direction: row-reverse;
      }
      .float-left {
        display: flex;
        flex-direction: row;
      }
    }
    &--input {
      background: rgba(255, 255, 255, 0.8);
      border-radius: $--border-radius-base;
      //   height: 120px;
    }
  }
}
</style>
