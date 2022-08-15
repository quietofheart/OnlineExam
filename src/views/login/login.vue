<template>
  <div id="flex-container">
    <!-- 背景 -->
    <div id="background">
    </div>
    <!-- 大盒子 -->
    <div class="container" :class="{ 'right-panel-active': isShowClass }">
      <!-- 登录盒子 -->
      <div class="sign-in-container form-container">
        <form action="JavaScript:;">
          <h1>登录</h1>

          <!-- 猫头鹰 -->
          <div class="owl" :class="{ 'password': isShowOwl }">
            <div class="hand"></div>
            <div class="hand hand-r"></div>
            <div class="arms">
              <div class="arm"></div>
              <div class="arm arm-r"></div>
            </div>
          </div>

          <!-- 登录 -->
          <input type="text" placeholder="账号" v-model="userName" @input="notShowErrName" />
          <div v-if="isShowErrName" class="err-tips-box err-tips-left">
            <span class="err-text">只允许字母和数字，至少四字符，最多十五字符！</span>
          </div>

          <input :type="[inputType[0]]" placeholder="密码" v-model="password" @input="notShowErrPwd" @focus="owlShow"
            @blur="owlShow" id="password"/>
          <label for="password" class="eye-s" :class="{ 'eye': inputType[1] }" @click="showPwd"></label>
          <div v-if="isShowErrPwd" class="err-tips-box err-tips-right">
            <span class="err-text">只允许字母数字和部分特殊符号，至少六字符，最多十九字符！</span>
          </div>

          <router-link to="/help/reset">忘记密码？</router-link>

          <button :class="{ 'loading': isShowLoading }" @click="login">登录</button>

          <div v-if="isShowBtnErr" class="err-text-btn">账号或密码错误</div>
        </form>
      </div>

      <!-- 注册盒子 -->
      <div class="sign-up-container form-container">
        <form action="JavaScript:;">
          <h1>注册</h1>

          <input v-model="newUserName" type="text" placeholder="账号" @input="notShowErrName" />
          <div v-if="isShowErrName" class="err-tips-box err-tips-new-name">
            <span class="err-text">只允许字母和数字，至少四字符，最多十五字符！</span>
          </div>

          <input v-model="newPassword" type="password" placeholder="密码" @input="notShowErrPwd" />
          <div v-if="isShowErrPwd" class="err-tips-box err-tips-new-pwd">
            <span class="err-text">只允许字母数字和部分特殊符号，至少六字符，最多十九字符！</span>
          </div>

          <input v-model="newEmail" type="text" placeholder="邮箱" @input="notShowErrEmail" />
          <div v-if="isShowErrEmail" class="err-tips-box err-tips-new-email">
            <span class="err-text">邮箱格式不正确！</span>
          </div>

          <input v-model="newText" type="text" placeholder="注册邀请码" @input="notShowErrText" />
          <div v-if="isShowErrText" class="err-tips-box err-tips-new-text">
            <span class="err-text">只允许字母数字和部分特殊符号，且必须是七字符长度！</span>
          </div>

          <router-link to="/help/text">什么是注册邀请码？</router-link>

          <button :class="{ 'loading': isShowLoading }" @click="newUser">注册</button>
          <div v-if="isShowBtnErr" class="err-text-new-btn">账号已被占用或注册邀请码无效！</div>

        </form>
      </div>

      <!-- 覆盖盒子 -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>新用户，欢迎!</h1>
            <p>请提前准备好可用的注册邀请码，并按照提示填写信息，注册你的私人账户。</p>
            <button class="ghost" @click="btnClass">已有账号？点击这里去登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>你好，朋友！</h1>
            <p>请输入你的账号和密码登录。</p>
            <button class="ghost" @click="btnClass">没有账号？点击这里去注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userName: '',// 登录账号存储
      password: '',// 登录密码存储

      newUserName: '',// 注册账号存储
      newPassword: '',// 注册密码存储
      newEmail: '',// 注册邮箱存储
      newText: '',// 注册邀请码存储
      newTextTest: 'jingxin', //服务器请求的注册邀请码

      regName: /^[a-zA-Z0-9]{4,15}$/,// 账号正则
      regPwd: /^[a-zA-Z0-9_!@#-.:]{6,19}$/,// 密码正则
      regEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // 邮箱正则
      regText: /^[a-zA-Z0-9.-_!@#]{7}$/, // 邀请码正则

      isShowClass: false,// 遮罩层效果
      isShowOwl: false,// 猫头鹰效果
      isShowErrName: false,// 账号规则错误提示
      isShowErrPwd: false,// 密码规则错误提示
      isShowErrEmail: false,// 邮箱规则错误提示
      isShowErrText: false,// 邀请码规则错误提示
      isShowLoading: false,// btn按钮加载中效果
      isShowBtnErr: false,// 账号密码错误提示
      inputType: ['password', false]//密码框默认类型
    }
  },
  methods: {
    btnClass() {// 登录盒子左右移动遮罩层
      this.isShowClass = !this.isShowClass
      this.isShowErrName = false// 账号规则错误提示
      this.isShowErrPwd = false// 密码规则错误提示
      this.isShowErrEmail = false// 邮箱规则错误提示
      this.isShowErrText = false// 邀请码规则错误提示
      this.isShowLoading = false// btn按钮加载中效果
      this.isShowBtnErr = false// 账号密码错误提示
    },
    owlShow() {// 密码框获取焦点猫头鹰遮挡眼睛，失去焦点则不遮挡
      this.isShowOwl = !this.isShowOwl
    },
    notShowErrName() {// 输入内容时隐藏账号错误提示
      this.isShowErrName = false
    },
    notShowErrPwd() {// 输入内容时隐藏密码错误提示
      this.isShowErrPwd = false
    },
    notShowErrEmail() {// 输入内容时隐藏邮箱错误提示
      this.isShowErrEmail = false
    },
    notShowErrText() {// 输入内容时隐藏邀请码错误提示
      this.isShowErrText = false
    },
    showPwd() {// 密码框小眼睛效果
      if (this.inputType[0] === 'password') {
        this.inputType.splice(1, 1, true)
        this.inputType.splice(0, 1, 'text')
      } else {
        this.inputType.splice(1, 1, false)
        this.inputType.splice(0, 1, 'password')
      }
    },
    login() {// but按钮，处理登录信息校验和输入信息格式校验
      this.isShowLoading = true //打开加载效果
      if (!this.regName.test(this.userName)) {
        // 检查账号格式是否正确，不正确显示错误提示
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowErrName = true
          this.isShowBtnErr = false
        }, 500)
      } else if (!this.regPwd.test(this.password)) {
        // 检查密码格式是否正确，不正确显示错误提示
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowErrPwd = true
          this.isShowBtnErr = false
        }, 500)
      } else if (this.userName === localStorage.getItem('uN') && this.password === localStorage.getItem('pw') || this.userName === 'admin' && this.password === 'admin123') {
        // 检测账号密码是否跟指定值一致(后续引入数据库来进行校验)
        // 一致则写入token身份标志
        localStorage.setItem('token', 'Bearer 9767a61a606ddfe2c3d8d02d351c74ea')
        localStorage.setItem('uN', this.userName)
        // 延时0.5秒跳转页面
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowBtnErr = false
          this.$router.push('/home')
        }, 500)
      } else {
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowBtnErr = true
        }, 500)

      }
    },
    newUser() {
      this.isShowLoading = true //打开加载效果
      if (!this.regName.test(this.newUserName)) {
        // 检查账号格式是否正确，不正确显示错误提示
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowErrName = true
          this.isShowBtnErr = false
        }, 500)
      } else if (!this.regPwd.test(this.newPassword)) {
        // 检查密码格式是否正确，不正确显示错误提示
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowErrPwd = true
          this.isShowBtnErr = false
        }, 500)
      } else if (!this.regEmail.test(this.newEmail)) {
        // 检查邮箱格式是否正确，不正确显示错误提示
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowErrEmail = true
          this.isShowBtnErr = false
        }, 500)
      } else if (!this.regText.test(this.newText)) {
        // 检查邮箱格式是否正确，不正确显示错误提示
        setTimeout(() => {
          this.isShowLoading = false
          this.isShowErrText = true
          this.isShowBtnErr = false
        }, 500)
      } else {
        if (this.newText === this.newTextTest && !localStorage.getItem('nTT')) {
          setTimeout(() => {
            alert('注册成功!')
            this.isShowLoading = false
            this.isShowBtnErr = false
            localStorage.setItem('nTT', 'asadADAdads12594__!@#dasdADAS456DASD156DSADDsaD')
            localStorage.setItem('uN', this.newUserName)
            localStorage.setItem('pw', this.newPassword)
            this.btnClass()
            this.userName = this.newUserName
            this.password = this.newPassword
          }, 500)
        } else {
          setTimeout(() => {
            this.isShowLoading = false
            this.isShowBtnErr = true
          }, 1000)
        }
      }
    },
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;

}

#flex-container {
  position: relative;
}


#background {
  background-image: url('@/assets/img/login/background.svg');
  position: relative;
  height: 50vh;
  transform: translateY(100%);
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translateX(-50%);

  overflow: hidden;
  box-sizing: border-box;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  position: relative;
}

h1 {
  font-weight: bold;
  margin: 20px;
  font-size: 20px;
}


.owl {
  width: 211px;
  height: 108px;
  background: url("@/assets/img/login/owl-login.png") no-repeat;
  position: absolute;
  top: 69px;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.6s ease-out;
}

.owl .hand {
  width: 34px;
  height: 34px;
  border-radius: 40px;
  background-color: #472d20;
  position: absolute;
  left: 12px;
  bottom: -8px;
  transform: scale(1, 0.6);
  transition: 0.3s ease-out;
}

.owl .hand.hand-r {
  left: 170px;
}

.owl.password .hand {
  transform: translateX(42px) translateY(-15px) scale(0.6);
}

.owl.password .hand.hand-r {
  transform: translateX(-42px) translateY(-15px) scale(0.6);
}

.owl .arms {
  position: absolute;
  top: 58px;
  width: 100%;
  height: 41px;
  overflow: hidden;
}

.owl .arms .arm {
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 40px;
  background: url("@/assets/img/login/owl-login-arm.png") no-repeat;
  transform: rotate(-20deg);
  transition: 0.3s ease-out;
}

.owl .arms .arm.arm-r {
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}

.owl.password .arms .arm {
  transform: translateY(-40px) translateX(40px);
}

.owl.password .arms .arm.arm-r {
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}


input {
  background-color: #eee;
  border: none;
  outline: none;
  padding: 12px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;
}

/* 去除浏览器默认密码眼睛样式 */
input[type="password"]::-ms-reveal {
  display: none;
}

input[type="password"]::-ms-clear {
  display: none;
}

input[type="password"]::-o-clear {
  display: none;
}

/* 自己的眼睛样式 */
.eye-s {
  position: absolute;
  background-image: url('@/assets/img/login/eye-s.svg');
  background-size: 100% 100%;
  height: 30px;
  width: 30px;
  top: 233px;
  right: 45px;
}

.eye {
  background-image: url('@/assets/img/login/eye.svg');
}

.eye-s:hover,
.eye:hover {
  cursor: pointer;
}


/* 错误提示文本盒子样式 */
.err-tips-box {
  border: 1px solid rgb(211, 190, 190);
  border-radius: 5px;
  padding: 5px 0 5px 0;
  pointer-events: none;
  background-color: #f6f6f6;
}

/* 登录的错误提示文本样式 */
.err-tips-left {
  position: absolute;
  top: 203px;
  left: 40px;
}

.err-tips-right {
  position: absolute;
  top: 263px;
  left: 40px;
}

/* 注册页的账号错误提示文本样式 */
.err-tips-new-name {
  position: absolute;
  top: 145px;
  left: 40px;
}

/* 注册页的密码错误提示文本样式 */
.err-tips-new-pwd {
  position: absolute;
  top: 203px;
  left: 40px;
}

/* 注册页的邮箱错误提示文本样式 */
.err-tips-new-email {
  position: absolute;
  top: 263px;
  left: 40px;
}

/* 注册页的邀请码错误提示文本样式 */
.err-tips-new-text {
  position: absolute;
  top: 323px;
  left: 40px;
}

.err-text::before {
  content: '';
  position: absolute;
  transform: rotate(-90deg);
  top: -17px;
  left: 5px;
  border: 8px solid transparent;
  border-left-color: rgb(211, 190, 190);
}

.err-text {
  color: rgb(255, 79, 79);
  font-size: 12px;
  padding: 0 10px 0 10px;
  letter-spacing: 0.6px;
}

/* btn按钮样式 */
button {
  position: relative;
  border-radius: 10px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:hover {
  cursor: pointer;
  background-color: #f52500;
}

button:active {
  transform: scale(0.90);
}

button:focus {
  outline: none;
}

button.loading::after {
  content: '';
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: rgba(255, 255, 255, .5);
}

button.loading::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 0.5em;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  vertical-align: -15%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  form {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}

/*  登录按钮错误信息提示 */
.err-text-btn {
  position: absolute;
  top: 385px;
  pointer-events: none;
  color: rgb(255, 79, 79);
  font-size: 12px;
  padding: 0 10px 0 10px;
  letter-spacing: 0.6px;
}

/*  注册按钮错误信息提示 */
.err-text-new-btn {
  position: absolute;
  top: 435px;
  pointer-events: none;
  color: rgb(255, 79, 79);
  font-size: 12px;
  padding: 0 10px 0 10px;
  letter-spacing: 0.6px;
}

a {
  color: rgb(186, 169, 169);
  font-size: 12px;
  text-decoration: none;
  margin: 15px 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: #ff4b2b;
  /* background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c); */
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  /* background-position: 0 0; */
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

/* 登录注册页面切换按钮效果 */
button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

button.ghost:hover {
  background-color: #E9DDB6;
  border-color: #F0D695;
  color: rgb(74, 67, 67);
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>