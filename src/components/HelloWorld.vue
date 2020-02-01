<!--
 * @Description: 
 * @Author: OBKoro1
 * @Date: 2020-01-13 15:29:02
 * @LastEditors: chenchen
 * @LastEditTime: 2020-02-01 16:40:40
 -->
<template>
  <div class="hello">
    <span>dpr:{{dpr}}</span>
    <div class="block"></div>
  </div>
</template>

<script>
export default {
	name: "HelloWorld",

	data() {
		return {
			dpr: 1
		}
	},

	created() {
		this.dpr = window.devicePixelRatio
	}
}
</script>

<style lang="less" scoped>
.hello {
  font-size: 12px;
	border: 1px solid black;
	height: 100vh;
  .block {
    margin: auto;
    border: 1px solid black;
    height: 1rem;
    width: 1rem;
  }
}
</style>
