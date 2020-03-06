<!--
 * @Description: 
 * @Author: OBKoro1
 * @Date: 2020-01-13 15:29:02
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-06 20:54:31
 -->
<template>
  <div class="hello">
    <span>dpr:{{dpr}}</span>
    <el-input v-model="text" placeholder="input something"></el-input>
    <el-button type="primary" @click="">1</el-button>
  </div>
</template>

<script>
export default {
	name: "HelloWorld",

	data() {
		return {
      dpr: 1,
      text: ''
		}
	},

	created() {
		this.dpr = window.devicePixelRatio
	}
}
</script>

<style lang="scss" scoped>
.hello {
  font-size: $g-normal-font-size;
	height: 100vh;
}
</style>
