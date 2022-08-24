<template>
  <div class="container">
    <!-- 顶部文本 -->
    <div class="top">
      <p>这里存储着你自己添加的或者分配给你的考试</p>
      <img src="@/assets/img/home/user/exam.svg" alt="">
    </div>
    <!-- 考试卡片  -->
    <span class="card-box">
      <ul v-if="isShowTest">
        <li v-for="(item, index) in testList" class="card">
          <div class="test-name">{{ item.name }}</div>
          <div class="test-summary">{{ item.message }}</div>
          <div class="test-bottom">
            <div>
              <img src="@/assets/img/home/test/create-time.svg" alt="create-time">
              <span class="create-time">{{ item.create[1] }}</span>
            </div>
            <div>
              <img src="@/assets/img/home/test/limit-time.svg" alt="limit-time">
              <span class="limit-time">限时{{ item.time }}分钟</span>
            </div>
            <div>
              <img src="@/assets/img/home/test/fraction.svg" alt="fraction">
              <span class="fraction">满分{{ item.fraction }}分</span>
            </div>
          </div>
          <div @click="goExam('go', item)"></div>
        </li>
      </ul>
      <div v-else class="not-test">当前你没有需要进行的考试</div>
    </span>
    <!-- 弹出框  -->
    <div class="go-exam" v-if="isShowGoExam">
      <!-- 白色容器 -->
      <div class="sure-box">
        <!-- 顶部关闭按钮 -->
        <div class="sure-top" @click="goExam('back')"></div>
        <!-- 中间提示文本 -->
        <div class="sure-main"></div>
        <!-- 底部操作按钮 -->
        <div class="sure-option">
          <button class="sure-back" @click="goExam('back')">取消</button>
          <button class="sure-go" @click="goExam('sure')">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      testList: [], // 我的考试列表
      isShowTest: false, // 提示文本是否显示
      isShowGoExam: false,// 弹出框是否显示
    }
  },
  methods: {
    goExam(str, exam) {
      switch (str) {
        case 'go':
          this.isShowGoExam = true
          this.isShowGoExam = exam //临时用来存储考试信息
          break
        case 'sure':
          this.$store.commit('goExam', this.isShowGoExam)
          this.$router.replace('/exam')
          break
        case 'back':
          this.isShowGoExam = false
          break
      }
    }
  },
  mounted() { //钩子函数决定是否显示考试
    if (localStorage.getItem('exam')) { //如果有考试
      if (localStorage.getItem(`myExam${this.$store.state.userName}`)) { //如果有我的考试
        let examStr = localStorage.getItem('exam')
        let examArr = JSON.parse(examStr);
        let myExamStr = localStorage.getItem(`myExam${this.$store.state.userName}`)
        let myExamArr = JSON.parse(myExamStr);
        for (let id of myExamArr) {
          examArr.some(exam => {
            if (exam.id === id) {
              this.testList.push(exam)
              return true
            }
          })
        }
        this.isShowTest = true
      }
    }
  }
}
</script>

<style scoped>
/* 容器 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -50px;
  width: 100vw;
  min-width: 1280px;
  height: 100vh;
  min-height: 760px;
}

/* 顶部提示信息 */
.top {
  position: absolute;
  top: 50px;
  z-index: 1;
  height: 120px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 2px #666;
  border-radius: 0 0 5px 5px;
}

.top p {
  display: inline-block;
  font-size: 14px;
  margin: 60px 0;
  text-align: center;
  width: 50%;
  color: #999;
}

.top img {
  vertical-align: middle;
  padding: 0 20%;
}

/* 考试卡片 */
.card-box {
  position: absolute;
  top: 200px;
  background-color: #f9f9f9;
  box-shadow: 0 0 2px #666;
  border-radius: 10px;
  width: 80%;
  min-height: 760px;
  padding: 1%;
  box-sizing: border-box;
}

.card-box ul {
  display: flex;
  flex-wrap: wrap;
}

.card {
  box-sizing: border-box;
  height: 150px;
  width: calc(33.333% - 40px);
  margin: 20px 20px;
  border-radius: 10px;
  box-shadow: 0 0 3px #666;
  background-color: #fff;
  position: relative;
  transition: .3s;
  padding: 1%;
  overflow: hidden;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.1, 1.1);
  box-shadow: 0 0 5px #1772b4
}

.card>div:nth-child(4) {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
}

.test-name {
  margin-top: 1vh;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: .5px;
}

.test-summary {
  margin-top: 2vh;
  font-size: 14px;
  color: #666;
  letter-spacing: .5px;
}

.test-bottom {
  position: absolute;
  bottom: 1vh;
  left: 1vh;
  right: 1vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.test-bottom div {
  flex: 1;
  text-align: center
}

.create-time {
  font-size: 12px;
  color: #666;
  margin: 0 3px;
}

.limit-time {
  font-size: 12px;
  color: #666;
  letter-spacing: .5px;
  margin: 0 3px;
}

.fraction {
  font-size: 12px;
  color: #666;
  letter-spacing: .5px;
  margin: 0 3px;
}

.test-bottom img {
  width: 10px;
  height: 10px;
}

/* 如果没有考试 */
.not-test {
  font-size: 20px;
  color: #666;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  letter-spacing: .5px;
  pointer-events: none;
}

/* 弹出框 */
.go-exam {
  position: absolute;
  z-index: 2000;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100vh + 50px);
  min-height: 1080px;
  width: 100%;
  background-color: rgba(0, 0, 0, .6);
}

.sure-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 160px;
  width: 500px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.sure-top {
  height: 40px;
  width: 100%;
  color: #666;
  cursor: pointer;
  box-shadow: 1px 0 2px #666;
}

.sure-top::after {
  content: 'X';
  font-size: 20px;
  margin: 10px 20px;
  float: right;
}

.sure-top:hover {
  color: red;
}

.sure-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.sure-main::after {
  content: '开始考试？';
  font-size: 18px;
}

.sure-option {
  position: relative;
  padding: 0px 10px;
}

.sure-back {
  position: absolute;
  left: 30px;
  display: inline-block;
  height: 35px;
  width: 100px;
  color: #fff;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(158, 137, 137);
  transition: all .3s ease-in-out;
}

.sure-go {
  position: absolute;
  right: 30px;
  display: inline-block;
  height: 35px;
  width: 100px;
  color: #fff;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #339eea;
  transition: all .3s ease-in-out;
}

.sure-go:hover {
  background-color: #53b0f3;
  transform: scale(1.1);
}

.sure-back:hover {
  background-color: rgb(184, 170, 170);
  transform: scale(1.1);
}
</style>