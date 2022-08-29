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
                <input type="radio" :name="index + item.name" :id="index + item.option[0]" value="A"
                  v-model="radioOption[index]">
                <label :for="index + item.option[0]">A.{{ item.option[0] }}</label>
              </li>
              <li>
                <input type="radio" :name="index + item.name" :id="index + item.option[1]" value="B"
                  v-model="radioOption[index]">
                <label :for="index + item.option[1]">B.{{ item.option[1] }}</label>
              </li>
              <li>
                <input type="radio" :name="index + item.name" :id="index + item.option[2]" value="C"
                  v-model="radioOption[index]">
                <label :for="index + item.option[2]">C.{{ item.option[2] }}</label>
              </li>
              <li>
                <input type="radio" :name="index + item.name" :id="index + item.option[3]" value="D"
                  v-model="radioOption[index]">
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
      <li class="btn">
        <button @click="overExam('over')">结束考试</button>
        <!-- 二次确认弹出框 -->
        <div v-if="isSHowBtn">
          <span>
            <p>{{ radioOptionText }}</p>
          </span>
          <span>
            <button @click="overExam('back')">取消</button>
            <button @click="overExam('sure')">确认</button>
          </span>
        </div>
      </li>
    </ul>
    <!-- 答案弹出框 -->
    <div class="answer-box" v-if="isShowAnswer" @click="backExam('back')">
      <ul class="answer-main">
        <li :class="{ 'setting0': isShowSetting[0] }">
          <p>满分 {{ userExam.fraction }} 分, 你的得分为:</p>
          <div>{{ examAchievement[0] }}</div>
        </li>
        <li :class="{ 'setting1': isShowSetting[1] }">
          <p>错题项:</p>
          <span v-if="isShowSetting[1] === true">{{ examAchievement[1] }}</span>
          <ul v-else>
            <li v-for="item in examAchievement[1]">
              <p>题干:<span>{{ item.name }}</span></p>
              <p>正确答案:<span>{{ item.answer }}</span></p>
            </li>
          </ul>
        </li>
      </ul>
      <span v-if="isShowAnswerItem">
        <span>
          <p>返回首页?</p>
          <span>
            <button @click.stop="backExam('no')">取消</button>
            <button @click.stop="backExam('yes')">确定</button>
          </span>
        </span>
      </span>
    </div>
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
      isSHowBtn: false, // 是否显示btn按钮的二次确认
      isShowAnswer: false,// 是否显示答案显示
      isShowAnswerItem: false,
      radioOption: [],// 存储单选题选中的答案
      radioOptionText: '确定结束考试？', //存储单选题选中的提示文本 
      radioOptionFraction: 0,// 单选题总得分
      radioOptionErr: [],// 单选题错误的选项的索引
      examAchievement: [], // 存储考试总成绩
      isShowSetting: [false, false],// 是否绑定setting类
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
    },
    overExam(str) { // 结束考试按钮
      switch (str) {
        case 'over':
          this.isSHowBtn = true
          break
        case 'back':
          this.isSHowBtn = false
          this.radioOptionText = '确定结束考试？'
          break
        case 'sure':
          if (this.radioOption.length === this.itemExam[0].length) {
            let index = 1
            let err = []
            for (let item of this.radioOption) {
              if (item !== 'A' && item !== 'B' && item !== 'C' && item !== 'D') {
                err.push(index)
              }
              index += 1
            }
            if (err.length > 0) {
              this.radioOptionText = `第(${err.slice(0, 3)})题的选项不能为空`
            } else { // 全部选项都不为空，计算成绩
              this.overExam('back')
              this.achievement()
            }
          } else {
            this.radioOptionText = '选项不能为空'
          }
          break
      }
    },
    achievement() { //计算成绩
      // 计算单选题
      this.itemExam[0].some((item, index) => {
        if (item.answer === this.radioOption[index]) {
          this.radioOptionFraction += parseInt(item.fraction) //答案正确则增加得分
        } else {
          this.radioOptionErr.push(index + 1) // 错误则记录错误的题目索引
        }
      })
      // 根据考试设置显示内容
      if (this.userExam.setting.examScore === 'yes') {
        if (this.itemExam[0].length > 0) {
          this.examAchievement.splice(0, 1, this.radioOptionFraction)
        }
      } else {
        this.isShowSetting[0] = true
        this.examAchievement[0] = '不允许查看得分'
      }
      if (this.userExam.setting.examAnswer === 'no') {
        this.isShowSetting[1] = true
        this.examAchievement[1] = '不允许查看正确答案'
      } else {
        if (this.radioOptionErr.length > 0) {
          let arr = []
          this.itemExam[0].forEach((item, index) => {
            for (let i of this.radioOptionErr) {
              if ((i - 1) === index) {
                arr.push(item)
              }
            }
          })
          this.examAchievement.splice(1, 1, arr)
        } else {
          this.isShowSetting[1] = true
          this.examAchievement[1] = '恭喜，无错误项'
        }
      }
      this.isShowAnswer = true
    },
    backExam(str) { // 退出整个考试
      switch (str) {
        case 'back':
          this.isShowAnswerItem = true
          break
        case 'no':
          this.isShowAnswerItem = false
          break
        case 'yes':
          this.$router.replace('/home')
          break
      }
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
  min-width: 960px;
  width: 100%;
  min-height: 500px;
  height: 100%;
}

/* 顶部 */
.top {
  position: relative;
  height: 100px;
  width: 100%;
  box-shadow: 3px 0 3px #000;
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

.btn {
  position: relative;
  height: 100%;
  width: 100%;
}

.btn>button {
  height: 30px;
  width: 80px;
  font-size: 12px;
  background-color: rgb(14, 207, 14);
  color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 2px rgb(14, 207, 14);
  cursor: pointer;
  transition: all .3s ease-out;
}

.btn>button:hover {
  background-color: rgb(19, 238, 19);
}

.btn>button:active {
  transform: scale(.9);
}

/* 二次确认弹出框 */
.btn>div {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(-100% - 5px));
  height: 80px;
  width: 200px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 3px #333;
  transition: all .3 ease-in-out;
}

.btn>div::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(100%, 100%);
  height: 0px;
  width: 0px;
  border: 5px solid;
  border-color: rgba(148, 143, 143, 0.5) transparent transparent transparent;
}

.btn>div span>p {
  text-align: center;
  line-height: 40px;
  pointer-events: none;
  color: #333;
  font-size: 14px;
}

.btn>div span:nth-child(2) {
  position: absolute;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  display: inline-block;
  width: 100%;
}

.btn>div span>button {
  display: inline-block;
  border: none;
  background-color: transparent;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  height: 30px;
  width: 100px;
}

.btn>div span>button:hover {
  border: 1px solid #999;
  border-radius: 10px;
  color: red;
}

/* 答案弹出框 */
.answer-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 20, 20, .6);
}

.answer-box>span {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 20, 20, .6);
}

.answer-box>span>span {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  height: 80px;
  width: 200px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
}

.answer-box>span>span p {
  font-size: 14px;
  text-align: center;
  line-height: 50px;
}

.answer-box>span>span>span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
}

.answer-box>span>span button {
  flex: 1;
  height: 100%;
  margin: 5px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.answer-box>span>span button:hover {
  color: deepskyblue;
  box-shadow: 0 0 3px #333;
  background-color: none;

}

.answer-main {
  position: absolute;
  bottom: 50%;
  left: 50%;
  height: 600px;
  width: 600px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: flex-start;
  align-items: flex-start;
  transform: translate(-50%, 50%);
  border-radius: 30px;
  padding: 50px;
  box-sizing: border-box;
  box-shadow: 0 0 30px #333;
  background-color: #fff;
}

.answer-main>li {
  position: relative;
  height: 250px;
  width: 100%;
}

.answer-main li div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 90px;
  color: deepskyblue;
}

.answer-main li.setting0>div {
  font-size: 18px;
}

.answer-main li p {
  font-size: 14px;
  color: #999;
  letter-spacing: .5px;
}

.answer-main li.setting1>span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: deepskyblue;
  font-size: 18px;
}

.answer-main li ul {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
}

.answer-main li ul li {
  margin: 10px 0;
}

.answer-main li ul li p {
  line-height: 20px;
  color: deepskyblue;
}

.answer-main li ul li p span {
  color: #666;
  line-height: 20px;
}
</style>