<!--
 * @Description: 
 * @Author: OBKoro1
 * @Date: 2020-01-13 15:29:02
 * @LastEditors: chenchen
 * @LastEditTime: 2020-03-11 22:37:23
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
	name: "app"
}
</script>

<style>
#app {
}
#app::before {
	background: url("./assets/images/bg1.jpeg") no-repeat;
	background-size: cover;
	content: "";
	height: 100vh;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	filter: blur(0.7px);
}
</style>
