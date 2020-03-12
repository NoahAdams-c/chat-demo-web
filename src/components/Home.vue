<!--
 * @Description: 主页面
 * @Author: chenchen
 * @Date: 2020-03-10 23:00:35
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-13 01:12:29
 -->
<template>
  <div class="home">
    <el-card :body-style="{ padding: '10px' }">
      <!-- 头部标题 -->
      <div slot="header">
        <div class="home__header">
          <div class="home__header--title">
            好友列表
          </div>
          <i class="home__header--menu el-icon-menu" @click="drawer = true"></i>
        </div>
      </div>
      <!-- 列表 -->
      <div v-loading="isLoadingList">
        <div class="home__main">
          <div
            class="home__main--list"
            v-for="(item, index) in getOnlineUsers"
            :key="index"
            @click="doChat(item)"
          >
            <div class="list__avatar">
              <el-avatar
                class="icon"
                size="medium"
                :src="item.avatar"
              ></el-avatar>
            </div>
            <div class="list__item">
              <div class="info-container">
                <div class="list__item--nickname">{{ item.nick_name }}</div>
                <div class="list__item--date">2020/03/12 00:53:30</div>
              </div>
              <div class="msg-container">
                <div class="list__item--message">
                  {{ getNewMsg(item.user_id) }}
                </div>
                <div class="list__item--flag" v-if="newMsgCache[item.user_id]">
                  {{ getIsNewFlag(item.user_id) ? "New" : "" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 侧边抽屉栏 -->
    <el-drawer
      :visible.sync="drawer"
      direction="rtl"
      size="40%"
      :show-close="false"
      :with-header="false"
    >
      <div class="home__drawer">
        <!-- 头像部分 -->
        <div class="home__drawer--avatar">
          <el-avatar class="icon" :src="userInfo.avatar"></el-avatar>
          <div class="nickname">{{ userInfo.nick_name }}</div>
        </div>
        <!-- 其余功能 -->
        <div
          v-for="(item, index) in drawerItems"
          :key="index"
          class="home__drawer--item"
          @click="item.func"
        >
          <i class="icon" :class="item.icon"></i>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
// import defaultAvatar from "@i/avatar.png"
export default {
  name: "Home",

  data() {
    return {
      // socket对象
      socketObj: null,
      // 抽屉栏显示与否
      drawer: false,
      // 用户信息
      userInfo: {},
      // 是否正在加载在线列表
      isLoadingList: true,
      // 抽屉功能项
      drawerItems: [
        {
          icon: "el-icon-setting",
          name: "设置",
          func: this.setting
        },
        {
          icon: "el-icon-circle-plus-outline",
          name: "添加好友",
          func: this.addFriends
        },
        {
          icon: "el-icon-switch-button",
          name: "登出",
          func: this.logout
        }
      ],
      // 新消息缓存
      // userid: {isNew: true, msg: 'ddddd'}
      newMsgCache: {}
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
      //获取在线用户列表
      "getOnlineUsers",
      // 获取用户信息
      "getUserInfo",
      // 获取登录状态
      "getLoginStatus"
    ]),
    // 获取最新消息
    getNewMsg() {
      return user_id => {
        if (this.newMsgCache[user_id]) {
          return this.newMsgCache[user_id].msg
        } else {
          return ""
        }
      }
    },
    // 获取是否是未读新消息标志
    getIsNewFlag() {
      return user_id => {
        if (this.newMsgCache[user_id]) {
          return this.newMsgCache[user_id].isNew
        } else {
          return false
        }
      }
    }
  },

  methods: {
    /**
     * 设置
     */
    setting() {},

    /**
     * 添加好友
     */
    addFriends() {},

    /**
     * 登出
     */
    logout() {
      // 断开soket连接
      this.socketObj.close()
      // 清除store中缓存的socket对象
      this.$store.commit("updateSocket", null)
      // 跳转回登录页
      this.$router.push({ path: "/" })
    },

    /**
     * 前往聊天页面
     */
    doChat(friendInfo) {
      // TODO: 更新最新消息逻辑需要改
      this.$set(this.newMsgCache, friendInfo.user_id, {
        isNew: false,
        msg: this.getNewMsg(friendInfo.user_id)
      })
      this.$router.push({
        path: `/chat/${friendInfo.user_id}/${friendInfo.nick_name}`
      })
    }
  },

  created() {
    // 从store中获取用户信息和socket对象
    this.userInfo = this.getUserInfo
    this.socketObj = this.getSocket
    // 延迟一秒关闭加载状态以获取在线用户列表
    setTimeout(() => {
      this.isLoadingList = false
    }, 1000)
    if (this.socketObj) {
      // 监听服务端发送的消息
      this.socketObj.on("resp", data => {
        console.log(data)
        // TODO: 更新最新消息逻辑需要改
        this.$set(this.newMsgCache, data.from, {
          isNew: true,
          msg: data.msg
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
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
    overflow-y: auto;
  }
  &__header {
    display: flex;
    align-items: center;
    font-size: $--font-size-extra-large;
    &--title {
      flex: 1;
      text-align: left;
      font-weight: 800;
    }
    &--menu {
    }
  }
  &__main {
    &--list {
      display: flex;
      align-items: center;
      height: 120px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: $--border-radius-base;
      padding: 0 10px;
      .list__avatar {
        padding-right: 20px;
      }
      .list__item {
        .info-container {
          padding-bottom: 10px;
        }
        .info-container,
        .msg-container {
          display: flex;
        }
        &--nickname {
          flex: 1;
        }
        &--nickname,
        &--date {
          font-size: $--font-size-base;
          display: inline-block;
          color: #2a2a2a;
        }
        &--message {
          color: #7a7a7a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 530px;
          padding-right: 10px;
        }
        &--flag {
          color: rgba(240, 13, 13, 0.931);
        }
      }
    }
    &--list ~ &--list {
      margin-top: 10px;
    }
  }
  &__drawer {
    height: 100%;
    text-align: center;
    &--avatar {
      padding: 20px 0;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .nickname {
        font-size: $--font-size-large;
      }
    }
    &--item {
      display: flex;
      align-items: center;
      margin-top: 10px;
      height: 80px;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      // border-top: $--border-base;
      border-bottom: 1px solid #dcdfe6;
      padding: 0 40px;
      .icon {
        font-size: $--font-size-extra-large;
      }
      .name {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
