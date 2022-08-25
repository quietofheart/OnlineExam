<template>
  <div class="container">
    <!-- 顶部文字以及计时区 -->
    <div class="top">
      <!-- 文字部分 -->
      <div class="title">
        <p>{{ userExam.name }}</p>
        <span>
          <p>考试时长:{{ userExam.time }}分钟</p>
          <p>满分分数:{{ userExam.fraction }}分</p>
        </span>
      </div>
      <!-- 计时器部分 -->
      <div class="time">
        <p>剩余答题时间:</p>
        <span>
          <span>{{ examTime[0] }}</span>:
          <span>{{ examTime[1] }}</span>:
          <span>{{ examTime[2] }}</span>
        </span>
      </div>
    </div>
    <!-- 考题内容部分 -->
    <ul class="main">
      <li v-if="isShowExamItem[0]">
        <p>*单选题</p>
        <ul class="main-item">
          <li v-for="(item, index) in this.itemExam[0]">
            <ul>
              <li>{{ index + 1 }}. {{ item.name }} <p>({{ item.fraction }}分)</p>
              </li>
              <li>
                <input type="radio" :name="index + item.name" :id="index + item.option[0]">
                <label :for="index + item.option[0]">A.{{ item.option[0] }}</label>
              </li>
              <li>
                <input type="radio" :name="index + item.name" :id="index + item.option[1]">
                <label :for="index + item.option[1]">B.{{ item.option[1] }}</label>
              </li>
              <li>
                <input type="radio" :name="index + item.name" :id="index + item.option[2]">
                <label :for="index + item.option[2]">C.{{ item.option[2] }}</label>
              </li>
              <li>
                <input type="radio" :name="index + item.name" :id="index + item.option[3]">
                <label :for="index + item.option[3]">D.{{ item.option[3] }}</label>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li v-if="isShowExamItem[1]">
        <p>*多选题</p>
      </li>
      <li v-if="isShowExamItem[2]">
        <p>*判断题</p>
      </li>
      <li v-if="isShowExamItem[3]">
        <p>*填空题</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'userExam',
  data() {
    return {
      userExam: {},// 存储考试
      itemExam: [[], [], [], []], //考题分类
      examTime: [],// 考试限时
      isShowExamItem: [false, false, false, false],
    }
  },
  methods: {
    getExam() { //初始化考试
      //存储考试
      if (this.$store.state.userExam.name) {
        this.userExam = this.$store.state.userExam
        localStorage.setItem('test', JSON.stringify(this.userExam))
      } else {
        let test = localStorage.getItem('test')
        test = JSON.parse(test)
        this.userExam = test
      }
      // 考题分类
      this.userExam.item.some((item) => {
        switch (item.type) {
          case '单选题':
            this.itemExam[0].push(item)
            break
          case '多选题':
            this.itemExam[1].push(item)
            break
          case '判断题':
            this.itemExam[2].push(item)
            break
          case '填空题':
            this.itemExam[3].push(item)
            break
        }
      })
      // 动态显示对应分类题目
      this.itemExam.forEach((arr, i) => {
        if (arr.length > 0) {
          this.isShowExamItem.splice(i, 1, true)
        }
      })
    },
    nowTime() { // 获取当前时间
      let aData = new Date()
      let dateValue = []
      dateValue[0] = aData.getFullYear() +
        "年" + (aData.getMonth() + 1) +
        "月" + aData.getDate() +
        "日" + aData.getHours() +
        "时" + aData.getMinutes() +
        "分" + aData.getSeconds() +
        "秒"
      dateValue[1] = aData.getFullYear() +
        "-" + (aData.getMonth() + 1) +
        "-" + aData.getDate()
      return dateValue
    },
    setTime(time) { // 定时器
      // 初始化时间
      let s = time * 60
      // 打开定时器
      let examTimeOut = setInterval(() => {
        const hour = parseInt(s / 3600) < 10 ? '0' + parseInt(s / 3600) : parseInt(s / 3600)
        const min = parseInt(s % 3600 / 60) < 10 ? '0' + parseInt(s % 3600 / 60) : parseInt(s % 3600 / 60)
        const sec = parseInt(s % 3600 % 60) < 10 ? '0' + parseInt(s % 3600 % 60) : parseInt(s % 3600 % 60)
        this.examTime.splice(0, 1, hour)
        this.examTime.splice(1, 1, min)
        this.examTime.splice(2, 1, sec)
        s--
        if (s === -1) {
          // 终止计时器
          console.log('考试结束');
          clearInterval(examTimeOut)
        }
      }, 1000)
    }
  },
  mounted() { //钩子
    this.getExam()
    this.setTime(this.userExam.time)
  }
}
</script>

<style scoped>
/* 根 */
.container {
  position: relative;
  min-width: 1280px;
}

/* 顶部 */
.top {
  position: relative;
  height: 100px;
  width: 100%;
  box-shadow: 3px 0 3px #000;
  background-color: rgba(20, 20, 20, .1);
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title>p {
  flex: 3;
  line-height: 75px;
  text-align: center;
  height: 100%;
  width: 100%;
  font-size: 18px;
  letter-spacing: .7px;
  color: #333;
  pointer-events: none;
}

.title>span {
  flex: 1;
  height: 100%;
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  letter-spacing: .7px;
  font-size: 12px;
  color: #999;
}

.time {
  position: absolute;
  top: 100%;
  transform: translateY(-100%);
  right: 100px;
  height: 40px;
  width: 200px;
  pointer-events: none;
  color: crimson;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
}

.time>p {
  font-size: 14px;
}

.time>span {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 2fr;
  justify-items: center;
  font-size: 14px;
}

/* 主体 */
.main {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  padding: 1% 20%;
}

.main>li {
  width: 100%;
  /* background-color: antiquewhite; */
}

.main>li>p {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
}

.main-item>li {
  margin: 30px 0;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  text-indent: 2em;
  line-height: 20px;
  letter-spacing: .5px;
}

.main-item>li>ul>li {
  margin: 10px 0;
}

.main-item>li>ul>li:nth-child(1) {
  font-size: 16px;
  text-indent: 0;
}

.main-item>li>ul>li:nth-child(1) p {
  display: inline-block;
  color: rgba(20, 20, 20, .3);
}
</style>