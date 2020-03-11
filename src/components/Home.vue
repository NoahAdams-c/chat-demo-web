<!--
 * @Description: 主页面
 * @Author: chenchen
 * @Date: 2020-03-10 23:00:35
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-12 01:34:07
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
          <i class="home__header--menu el-icon-menu"
             @click="drawer = true"></i>
        </div>
      </div>
      <!-- 列表 -->
      <div class="home__main">
        <div class="home__main--list"
             v-for="(item,index) in friends"
             :key="index">
          <div class="list__avatar">
            <el-avatar class="icon"
                       size="medium"
                       :src="item.avatar"></el-avatar>
          </div>
          <div class="list__item">
            <div class="info-container">
              <div class="list__item--nickname">{{item.nick_name}}</div>
              <div class="list__item--date">2020/03/12 00:53:30</div>
            </div>
            <div class="msg-container">

              <div class="list__item--message">你好奶的大大缩短士大夫是大法师费收费时发生的大法师法</div>
              <div class="list__item--flag">New</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 侧边抽屉栏 -->
    <el-drawer :visible.sync="drawer"
               direction="rtl"
               size="40%"
               :show-close="false"
               :with-header="false">
      <div class="home__drawer">
        <!-- 头像部分 -->
        <div class="home__drawer--avatar">
          <el-avatar class="icon"
                     :src="userInfo.avatar"></el-avatar>
          <div class="nickname">{{userInfo.nick_name}}</div>
        </div>
        <!-- 其余功能 -->
        <div v-for="(item,index) in drawerItems"
             :key="index"
             class="home__drawer--item"
             @click="item.func">
          <i class="icon"
             :class="item.icon"></i>
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
 
 <script>
import defaultAvatar from "@i/avatar.png"
export default {
	name: "Home",

	data() {
		return {
			// 抽屉栏显示与否
			drawer: false,
			// 用户信息
			userInfo: {
				// 头像路径
				avatar: defaultAvatar,
				// 昵称
				nick_name: "nickName"
			},
			// 好友列表
			friends: [
				{
					// 头像路径
					avatar: defaultAvatar,
					// 昵称
					nick_name: "nickName1"
				},
				{
					// 头像路径
					avatar: defaultAvatar,
					// 昵称
					nick_name: "nickName2"
				},
				{
					// 头像路径
					avatar: defaultAvatar,
					// 昵称
					nick_name: "nickName3"
				},
				{
					// 头像路径
					avatar: defaultAvatar,
					// 昵称
					nick_name: "nickName4"
				},
				{
					// 头像路径
					avatar: defaultAvatar,
					// 昵称
					nick_name: "nickName5"
				},
				{
					// 头像路径
					avatar: defaultAvatar,
					// 昵称
					nick_name: "nickName6"
				}
			],
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
			]
		}
	},

	methods: {
		/**
		 * 设置
		 */
		setting() {
			console.log("setting ...")
		},

		/**
		 * 添加好友
		 */
		addFriends() {
			console.log("add friends ...")
		},

		/**
		 * 登出
		 */
		logout() {
			console.log("logout ...")
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
	// 滚动条样式
	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-thumb {
		width: 10px;
		border-radius: 10px;
		background-color: #f3f3f3;
	}
	::-webkit-scrollbar-track {
		width: 10px;
	}
	::-webkit-scrollbar-button {
		display: none;
	}
}
</style>
