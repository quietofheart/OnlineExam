<template>
  <div>
    <!-- 顶部导航栏容器 -->
    <nav class="nav-container">

      <!-- 左侧logo和文字区域 -->
      <ul class="nav-logo">
        <li>
          <img src="@/assets/img/home/logo.svg" alt="logo">
          <h2>在线考试系统</h2>
        </li>
      </ul>

      <!-- 中间导航区域 -->
      <ul class="nav-center">
        <!-- 首页 -->
        <li class="center-item">
          <router-link to="/home/new">
            <img src="@/assets/img/home/home.svg" alt="home" />
            <span>首页</span>
          </router-link>
        </li>
        <!-- 考试卡片 -->
        <li class="center-item">
          <router-link to="/home/test">
            <img src="@/assets/img/home/test.svg" alt="test" />
            <span>考试卡片</span>
          </router-link>
        </li>
        <!-- 我的考试 -->
        <li class="center-item">
          <router-link to="/home/user">
            <img src="@/assets/img/home/user.svg" alt="user" />
            <span>我的考试</span>
          </router-link>
        </li>
        <!-- 考题管理 -->
        <li class="center-item">
          <router-link to="/home/problem">
            <img src="@/assets/img/home/problem.svg" alt="problem" />
            <span>考试管理</span>
          </router-link>
        </li>
        <!-- 人员管理 -->
        <li class="center-item">
          <router-link to="/home/person">
            <img src="@/assets/img/home/person.svg" alt="person" />
            <span>人员管理</span>
          </router-link>
        </li>
      </ul>

      <!-- 右侧用户区域 -->
      <ul class="nav-user">
        <!-- 头像和用户名 -->
        <li class="user-box">
          <img src="@/assets/img/home/quietofheart.png" alt="portrait" />
          <span>{{ userName }}</span>
        </li>
        <!-- 二级菜单 -->
        <li class="user-menu">
          <div class="setting" @click="userSetting">
            <img src="@/assets/img/home/setting.svg" alt="setting">
            <a href="JavaScript:;">账户设置</a>
          </div>
          <div class="back-login" @click="quitLogin">
            <img src="@/assets/img/home/quit.svg" alt="quit">
            <a href="JavaScript:;">退出登录</a>
          </div>
        </li>
      </ul>

    </nav>

    <!-- 主体内容部分 -->
    <main class="main">
      <div class="main-container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      userName: localStorage.getItem('uN')
    }
  },
  methods: {
    quitLogin() {
      localStorage.removeItem('token')
      this.$router.replace('/login')
    },
    userSetting() {
      alert('抱歉，此功能暂未开放！')
    }
  }
}
</script>

<style scoped>
/* 顶部导航栏容器 */
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  background-color: #333;
  display: flex;
}

/* 左侧logo和文字区域 */
.nav-logo {
  flex: 1;
  text-align: center;
  pointer-events: none;
}

.nav-logo img {
  height: 45px;
  margin: 2.5px 0;
  vertical-align: middle;
}

.nav-logo h2 {
  display: inline-block;
  margin: 0 5px;
  line-height: 50px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #fff;
}

/* 中间导航容器部分 */
.nav-center {
  flex: 3;
  display: flex;
  align-items: center;
}

.center-item {
  flex: 1;
  text-align: center;
}

.center-item img {
  vertical-align: middle;
  margin: 0 1px;
}

.center-item a {
  position: relative;
  color: rgb(171, 155, 155);
  line-height: 40px;
  text-decoration: none;
  font-size: 12px;
  display: inline-block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: .3s ease-in-out;
}

.center-item a span {
  display: none;
}

.center-item a:hover {
  transform: translateY(-5px)
}

.center-item:hover a span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  font-size: 10px;
  color: #eee;
}
.center-item:hover .router-link-active span{
  position: relative;
  top: 0%;
  left: 0%;
  transform: translateX(0%);
  color: #fff;
}

.center-item .router-link-active {
  color: #fff;
  padding: 5px 0;
  border-bottom: 2px solid #fff;
}

.center-item .router-link-active span {
  display: inline-block;
  position: relative;
}

.center-item .router-link-active img {
  display: none;
}

/* 右侧的用户部分 */
.nav-user {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.user-box {
  position: absolute;
  left: 40%;
  margin: 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 5;
  color: #999;
  transition: all .3s;
}

.user-box img {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  vertical-align: middle;
}

.user-box span {
  color: inherit;
  font-size: 14px;
  margin: 0 5px;
  text-align: center;
  letter-spacing: .7px;
  line-height: 50px;
}

.user-box:hover {
  /* background-color: #444; */
  transform: scale(1.1);
  color: #fff;
}

.user-box:hover~.user-menu {
  transform: scaleY(1)
}

.user-menu {
  position: absolute;
  left: calc(40% - 5px);
  top: 50px;
  width: 100px;
  height: 80px;
  border-radius: 0 0 10px 10px;
  background-color: #333;
  transform: scaleY(0);
  transform-origin: 50% 0%;
  transition: all .6s;
}

.user-menu>div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  transition: .3s;
  cursor: pointer;
}

.user-menu:hover {
  transform: scaleY(1);
}

.user-menu div a {
  color: inherit;
  font-size: 14px;
  width: 70%;
  line-height: 40px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  pointer-events: none;
}

.user-menu div img {
  position: relative;
  right: 0;
  height: 16px;
}

.user-menu div:hover {
  color: #fff;
  transform: scale(1.1);
}

/* 主体部分 */
.main {
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
}

.main-container {
  position: relative;
  top: 50px;
}
</style>