<!--
 * @Description: 聊天页
 * @Author: chenchen
 * @Date: 2020-03-13 00:35:44
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-13 02:02:21
 -->
<template>
  <div class="chat">
    <el-card :body-style="{ padding: '6px' }">
      <!-- 头部标题 -->
      <div slot="header">
        <div class="chat__header">
          <div class="chat__header--title">
            {{ friend_nick_name }}
          </div>
        </div>
      </div>
      <div class="chat__main">
        <div class="chat__main--msg"></div>
        <div class="chat__main--input">
          <el-input placeholder="输点啥..." v-model="msg">
            <el-button slot="append">发送</el-button>
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

  props: {
    friend_user_id: String,
    friend_nick_name: String
  },

  data() {
    return {
      // 用户信息
      userInfo: {},
      // 消息
      msg: ""
    }
  },

  // 路由守卫拦截非法进入主界面
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.getLoginStatus) {
        next()
      } else {
        vm.$router.push({ path: "/" })
      }
    })
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
    ])
  },

  methods: {},

  async created() {
    console.log(this.friend_user_id)
    console.log(this.friend_nick_name)
    this.userInfo = this.getUserInfo
    // 历史消息查询结束时间设为当前时间
    let end_date = new Date()
    // 历史消息查询开始时间设为一天前
    let start_date = new Date(end_date - 24 * 60 * 60 * 1000)
    // 查询历史消息
    let params = {
      user_id: this.userInfo.user_id,
      to_who: this.friend_user_id,
      start_date: start_date,
      end_date: end_date
    }
    //   let _data = await this.$ajax.doGet("/getRecords", params)
  }
}
</script>

<style lang="scss" scoped>
.chat {
  height: 100vh;
  .el-card {
    display: flex;
    flex-direction: column;
    background: rgba($color: #3a3a3a, $alpha: 0.6);
    border: unset;
    color: #eaeaea;
    height: 100vh;
  }
  /deep/.el-card__header {
    border: 0;
    box-shadow: 0 10px 12px 0 rgba(219, 219, 219, 0.1);
  }
  /deep/.el-card__body {
    flex: 1;
  }
  /deep/.el-input__inner {
    background: #fff0;
    border: none;
    color: #2a2a2a;
  }
  &__header {
    // display: flex;
    // align-items: center;
    font-size: $--font-size-extra-large;
    &--title {
      //   flex: 1;
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
    }
    &--input {
      background: rgba(255, 255, 255, 0.8);
      border-radius: $--border-radius-base;
      //   height: 120px;
    }
  }
}
</style>
