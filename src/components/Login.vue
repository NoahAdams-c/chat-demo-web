<!--
 * @Description: 登录页面
 * @Author: chenchen
 * @Date: 2020-01-13 15:29:02
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-11 01:40:21
 -->
<template>
  <div class="login">
    <el-card :body-style="{ padding: '10px' }">
      <div slot="header">
        <span class="login__title">用户登录</span>
      </div>
      <el-form ref="form"
               :model="formObj"
               label-width="0">
        <el-form-item>
          <el-input placeholder="用户名"
                    v-model="formObj.userId" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码"
                    v-model="formObj.password"
                    type="password" />
        </el-form-item>
        <div class="login__submit">
          <el-button type="primary"
                     @click="doLogin">
            登录
          </el-button>
          <el-button @click="toRegist">
            注册
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
	name: "Login",

	data() {
		return {
			formObj: {
				userId: "",
				password: ""
			}
		}
	},

	methods: {
		doLogin() {
			const vm = this
			this.$router.push({ path: `/home/${vm.formObj.userId}` })
		},
		toRegist() {
			this.$router.push({ path: "/regist" })
		}
	},

	created() {}
}
</script>

<style lang="scss" scoped>
.login {
	.el-card {
		background: rgba($color: #3a3a3a, $alpha: 0.6);
		border: unset;
		color: #eaeaea;
		width: 90%;
		position: absolute;
		transform: translate(-50%, -50%);
		top: 45%;
		left: 50%;
	}
	&/deep/.el-form-item__label {
		color: #eaeaea !important;
	}
	&__title {
		font-weight: 800;
		font-size: $--font-size-extra-large;
	}
	&__submit {
		text-align: center;
		padding: 10px 0;
	}
}
</style>
