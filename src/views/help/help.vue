<template>
  <div class="help">
    <div class="container">
      <nav class="left-nav">
        <ul>
          <li>
            <router-link to="/help/text" class="left-nav-item">注册邀请码是什么</router-link>
          </li>
          <li>
            <router-link to="/help/cannotlogin" class="left-nav-item">无法登录或注册</router-link>
          </li>
          <li>
            <router-link to="/help/reset" class="left-nav-item">重置密码</router-link>
          </li>
          <li>
            <router-link to="/help/feedback" class="left-nav-item">建议反馈</router-link>
          </li>
          <li>
            <router-link to="/home" class="left-nav-item" >返回首页</router-link>
          </li>
        </ul>
      </nav>
      <main class="item-main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'help',
}
</script>

<style scoped>
.help {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
}

.container {
  position: relative;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: rgba(81, 196, 211, .1);
}

.left-nav {
  position: absolute;
  display: flex;
  min-height: 480px;
  width: 200px;
  background: -webkit-linear-gradient(right,#ef6f48,#ff4b2b);
}

.left-nav ul {
  display: flex;
  width: 100%;
  flex-flow: column wrap;
  padding: 10px;
}

.left-nav li {
  flex: 1;
  border-radius: 10px;
  text-align: center;
  color: #fff;
}

.left-nav li:hover {
  background-color: rgba(251, 242, 227, .3);
}

ul .router-link-active {
  border-radius: 10px;
  background-color: #fbf2e3;
  cursor: pointer;
  color: #ef6f48;
}

.left-nav-item {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  font-size: small;
  line-height: 90px;
}

.item-main {
  position: absolute;
  min-height: 480px;
  width: 538px;
  left: 215px;
}
</style>