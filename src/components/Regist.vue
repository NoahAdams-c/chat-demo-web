<!--
 * @Description: 注册页面
 * @Author: chenchen
 * @Date: 2020-03-10 23:00:35
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-12 22:29:47
 -->
<template>
  <div class="regist">
    <el-card :body-style="{ padding: '10px' }">
      <div slot="header">
        <span class="regist__title">用户注册</span>
      </div>
      <el-form ref="form"
               :model="formObj"
               label-width="0">
        <el-form-item>
          <el-input placeholder="昵称"
                    v-model="formObj.nickName" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="用户名"
                    v-model="formObj.userId" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码"
                    v-model="formObj.password"
                    type="password" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="确认密码"
                    v-model="formObj.repassw"
                    type="password" />
        </el-form-item>
        <div class="regist__submit">
          <el-button @click="$router.back()">
            取消
          </el-button>
          <el-button type="primary"
                     @click="doRegist">
            注册
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
	name: "Regist",

	data() {
		return {
			formObj: {
				nickName: "",
				userId: "",
				password: "",
				repassw: ""
			}
		}
	},

	methods: {
		async doRegist() {
			let data = {
				user_id: this.formObj.userId,
				password: this.formObj.password,
				nick_name: this.formObj.nickName
			}
			let result = await this.$ajax.doPost("/regist", data)
			if (result.status === "success") {
				this.$message({
					message: "注册成功",
					type: "success"
				})
				this.$router.push({ path: "/" })
			} else {
				this.$message.error(result.msg)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.regist {
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
