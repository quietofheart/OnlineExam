<template>
  <div class="container">
    <h2>点击左侧的创建按钮可以创建新的用户</h2>
    <!-- 新建用户弹出框 -->
    <div v-if="isShowNew" class="new-exam">
      <!-- 主体背景容器 -->
      <div class="exam-container">
        <!-- 顶部退出和文本 -->
        <div class="top-text">
          <p>新建用户</p>
          <button @click="isShowNewFun('clear')">X</button>
        </div>
        <!-- 顶部进度条 -->
        <ul class="Progress-bar">
          <li :class="{ 'success': isShowSuccessOne }" class="Progress-item one-item">
            <span>1</span>
            <p>用户信息</p>
          </li>
          <li class="one-bar"></li>
          <li :class="[{ 'success': isShowSuccessTwo }, { 'successThree': isShowSuccessThree }]"
            class="Progress-item two-item">
            <span>2</span>
            <p>权限设置</p>
          </li>
        </ul>
        <!-- 输入新建第一部分 -->
        <ul v-if="isShowOperationOne" class="input-exam">
          <li id="input-one" :class="{ 'show-err': isShowErr[0] }">
            <label for="exam-name">用户名:</label>
            <input v-model="examName" type="text" id="exam-name">
          </li>
          <li id="input-two" :class="{ 'show-err': isShowErr[1] }">
            <label for="exam-message">密码:</label>
            <input v-model="examMessage" type="text" id="exam-message">
          </li>
          <li id="input-three" :class="{ 'show-err': isShowErr[2] }">
            <label for="exam-fraction">班级:</label>
            <input v-model="examFraction" type="text" id="exam-fraction">
          </li>
        </ul>
        <!-- 输入新建第二部分 -->
        <div v-if="isShowOperationTwo" class="input-exam-two">
          <!-- 考题列表 -->
          <div class="item-lists" v-if="itemLists.length > 0">
            <ul>
              <li @click="editItem(index)" v-for="(item, index) in itemLists">
                <span>{{ item.name }}</span>
                <span>{{ item.type }}</span>
                <span>{{ item.fraction }}</span>
                <span>
                  <img @click.stop="delItem(index)" src="@/assets/img/home/problem/del.svg" alt="">
                </span>
              </li>
            </ul>
          </div>
          <!-- 错误文本提示 -->
          <span v-else class="not-item-lists">暂无考题，请点击下方新建按钮设置考题</span>
          <!-- 操作按钮 -->
          <div class="new-item">
            <!-- 顶部按钮  -->
            <ul>
              <li :class="{ 'active': isShowNewItem[0] }" @click="newExamItem('edit')">编辑</li>
              <li :class="{ 'active': isShowNewItem[1] }" @click="newExamItem('radio')">新建单选题</li>
              <li @click="newExamItem">新建多选题</li>
              <li @click="newExamItem">新建判断题</li>
              <li @click="newExamItem">新建填空题</li>
            </ul>
            <!-- 编辑考题按钮 -->
            <div v-if="isShowNewItem[0]" class="edit-exam-item">
              <!-- 题干 -->
              <div>
                <span>题干</span>
                <textarea v-model="examItemName" autofocus></textarea>
              </div>
              <!-- 选项 -->
              <div>
                <p>选项A</p>
                <textarea v-model="examItemOption[0]"></textarea>
                <p>选项B</p>
                <textarea v-model="examItemOption[1]"></textarea>
                <p>选项C</p>
                <textarea v-model="examItemOption[2]"></textarea>
                <p>选项D</p>
                <textarea v-model="examItemOption[3]"></textarea>
              </div>
              <!-- 正确答案 -->
              <div>
                <span>点击小圆点选择正确答案的选项</span>
                <input type="radio" name="answer" value="A" v-model="examItemAnswer">
                <input type="radio" name="answer" value="B" v-model="examItemAnswer">
                <input type="radio" name="answer" value="C" v-model="examItemAnswer">
                <input type="radio" name="answer" value="D" v-model="examItemAnswer">
              </div>
              <!-- 分数 -->
              <div>
                <span>分数</span>
                <input type="text" id="item-fraction" v-model="examItemFraction">
              </div>
              <!-- 按钮 -->
              <div>
                <button @click="editItemChange">确认更改</button>
              </div>
            </div>
            <!-- 新建单选题按钮 -->
            <div class="radio-exam-item" v-if="isShowNewItem[1]">
              <!-- 题干 -->
              <div>
                <textarea v-model="examItemName" autofocus></textarea>
              </div>
              <!-- 分数 -->
              <div>
                <input type="text" id="item-fraction" v-model="examItemFraction">
              </div>
              <!-- 选项 -->
              <div>
                <input type="text" v-model="examItemOption[0]" placeholder="A">
                <input type="text" v-model="examItemOption[1]" placeholder="B">
                <input type="text" v-model="examItemOption[2]" placeholder="C">
                <input type="text" v-model="examItemOption[3]" placeholder="D">
              </div>
              <!-- 正确答案 -->
              <div>
                <label for="A">A</label>
                <input type="radio" name="answer" value="A" id="A" v-model="examItemAnswer">
                <label for="B">B</label>
                <input type="radio" name="answer" value="B" id="B" v-model="examItemAnswer">
                <label for="C">C</label>
                <input type="radio" name="answer" value="C" id="C" v-model="examItemAnswer">
                <label for="D">D</label>
                <input type="radio" name="answer" value="D" id="D" v-model="examItemAnswer">
              </div>
              <!-- 按钮 -->
              <div>
                <button @click="createExamItem('radio')">确认创建</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 输入新建第三部分 -->
        <ul v-if="isShowOperationThree" class="input-exam-three">
          <li>
            <span>考试结束后是否允许考生查看得分?</span>
            <label for="examScore">不允许</label>
            <input v-model="examScore" type="radio" id="examScore" name="examScore" value="no">
            <label for="examScore">允许</label>
            <input v-model="examScore" type="radio" id="examScore" name="examScore" value="yes">
          </li>
          <li>
            <span>考试结束后,已答错的考题是否允许考生查看正确答案?</span>
            <label for="examAnswer">不允许</label>
            <input v-model="examAnswer" type="radio" id="examAnswer" name="examAnswer" value="no">
            <label for="examAnswer">允许</label>
            <input v-model="examAnswer" type="radio" id="examAnswer" name="examAnswer" value="yes">
          </li>
        </ul>
        <!-- 底部操作确认部分 -->
        <div class="submit-exam">
          <div v-if="isShowOperationOne" class="operation-one">
            <button class="btn-gray" @click="isShowNewFun('clear')">取消创建</button>
            <button class="btn-blue" @click="BtnGo(1)">下一步</button>
          </div>
          <div v-if="isShowOperationTwo" class="operation-two">
            <button class="btn-gray" @click="BtnBack(1)">上一步</button>
            <button class="btn-blue" @click="BtnGo(2)">下一步</button>
          </div>
          <div v-if="isShowOperationThree" class="operation-three">
            <button class="btn-gray" @click="BtnBack(2)">上一步</button>
            <button class="btn-blue" @click="BtnGo(3)">确认创建</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格根容器 -->
    <div class="problem-table">
      <!-- 顶部操作栏部分 -->
      <div class="table-top">
        <!-- 左侧按钮 -->
        <div class="btn">
          <button @click="isShowNewFun">新建用户</button>
        </div>
        <!-- 中间搜索 -->
        <div class="search" :class="{ 'blur': isShowBlur }">
          <input type="text" @input="searchExam(search)" v-model="search" @blur="isShowBlurFun">
          <label for="search">搜索</label>
        </div>
        <!-- 右侧操作-->
        <div class="operation">
          <ul class="operation-item" @click="alertText">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <!-- 表格容器 -->
      <div class="table-main">
        <!-- 用户表格 -->
        <table class="exam">
          <!-- 表头部分 -->
          <thead class="exam-head">
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>密码</th>
              <th>班级</th>
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <!-- 表格主体 -->
          <tbody class="exam-item" v-if="isShowExamItem">
            <tr v-for="item in this.exams[searchExamsIndex]">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.password }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.create[1] }}</td>
              <td>
                <button>删除</button>
                <button>编辑</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'problem',
  data() {
    return {
      isShowNew: false,// 是否显示弹出框
      isShowBlur: false, // 是否显示搜索框带内容的失去焦点样式
      isShowOperationOne: true,//是否显示底部操作确认第一部分
      isShowOperationTwo: false,//是否显示底部操作确认第二部分
      isShowOperationThree: false,//是否显示底部操作确认第三部分
      isShowSuccessOne: false,// 是否显示第一个成功进度条样式
      isShowSuccessTwo: false,// 是否显示第二个成功进度条样式
      isShowSuccessThree: false,// 是否显示第三个成功进度条样式
      isShowErr: [false, false, false, false, false],// 是否显示错误文本
      isShowNewItem: [false, false, false, false, false],// 是否显示新建考题或编辑考题按钮的内容
      isShowExamItem: true,//是否显示表格主体内容
      isShowActive: [false, false, false, false], //动态绑定active类
      exams: [[], []],// 考试列表
      searchExamsIndex: 0, //通过搜索决定显示第一个原始列表还是第二个匹配的列表 
      search: '',// 存储搜索栏输入的内容
      temporaryStorageExam: '',// 暂存需要显示的考试
    }
  },
  methods: {
    isShowNewFun(str) { // 动态显示弹出框
      if (str === 'clear') {
        this.isShowErr = [false, false, false, false, false]
        this.isShowNewItem = [false, false, false, false, false]
        this.isShowNewFun()
      } else if (str === 'back') {
        this.isShowExam = false
      } else {
        this.isShowNew = !this.isShowNew
      }
    },
    BtnGo(n) { //弹出框下一步按钮事件
      switch (n) {
        case 1:
          this.isShowOperationOne = false
          this.isShowOperationTwo = true
          this.isShowSuccessOne = true
          break
        case 2:
          this.isShowOperationTwo = false
          this.isShowOperationThree = true
          this.isShowSuccessTwo = true
          this.isShowSuccessThree = true
          break
        case 3:
          let obj = { // 获取输入内容
            id: this.examId(),
            name: this.examName,
            message: this.examMessage,
            fraction: parseInt(this.examFraction),
            author: localStorage.getItem('uN'),
            type: this.examType,
            time: parseInt(this.examTime),
            create: this.nowTime(),
            item: this.itemLists,
            setting: { 'examScore': this.examScore, 'examAnswer': this.examAnswer }
          }
          this.exams[0].push(obj)
          let jsonStr = JSON.stringify(this.exams[0])
          localStorage.setItem('exam', jsonStr)
          this.itemLists = []
          // 添加完毕，调整弹出框样式
          this.isShowOperationOne = true
          this.isShowOperationThree = false
          this.isShowSuccessOne = false
          this.isShowSuccessTwo = false
          this.isShowNewFun('clear')
          this.isShowMain = true
          break
      }
    },
    BtnBack(n) { //弹出框上一步按钮事件
      if (n === 1) {
        this.isShowOperationTwo = false
        this.isShowOperationOne = true
        this.isShowSuccessOne = false
      } else {
        this.isShowOperationThree = false
        this.isShowOperationTwo = true
        this.isShowSuccessTwo = false
        this.isShowSuccessThree = false
      }
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
    examId() { //生成考试id
      if (this.exams[0].length > 0) {
        let arr = this.exams[0].length - 1
        return this.exams[0][arr].id + 1
      } else {
        return 1
      }
    },
    searchExam(str) { // 搜索框内容处理
      if (str.length > 0 && this.exams[0].length > 0) {
        if (this.search.length < 20) {
          this.showExam('search', this.search)
        } else {
          alert('查询字符长度不能大于二十')
          this.search = this.search.slice(0, 19)
        }
      } else {
        this.exams[0] = []
        this.showExam('one')
        this.isShowExamItem = true
      }
    },
    showExam(str, ...arg) { // 渲染考试列表
      if (str === 'one') { //说明是正常显示，直接获取然后显示
        if (localStorage.getItem('userList')) {
          let jsonArr = JSON.parse(localStorage.getItem('userList'))
          for (let item of jsonArr) {
            this.exams[0].push(item)
          }
          this.searchExamsIndex = 0
          this.isShowMain = true
        } else {
          this.isShowMain = false
        }
      } else if (str === 'search') { //说明是在搜索关键字，因此需要进行处理然后再显示指定内容
        let strArr = arg[0].split('') //将搜索关键词拆分成单个字符一项的数组
        let index = 0
        for (let str of strArr) { //定义一个正则来处理关键词中的特殊字符
          let reg = /[\.\^\$\+\{\}\*\?\[\]\/\\]+/g
          if (reg.test(str)) {
            strArr.splice(index, 1)
          } else {
            index++
          }
        }
        this.exams[1] = []
        for (let exam of this.exams[0]) { //遍历获取每一项考试
          let items = null
          items = exam.id + exam.name + exam.message + exam.type + exam.author
          strArr.some((item) => { //遍历关键词对比是否根考试关键词字符串匹配
            let reg = new RegExp(item + "+", "gi")
            if (reg.test(items)) {
              this.exams[1].push(exam) //匹配表示找到关键词，则添加到exams第二列表中
              return true
            }
          })
        }
        if (this.exams[1].length < 1) {
          this.isShowExamItem = false
        } else {
          this.searchExamsIndex = 1
          this.isShowExamItem = true
        }
      }
    },
    isShowBlurFun() { // 判断搜索框是否有内容来显示不同样式
      if (this.search.length > 0) {
        this.isShowBlur = true
      } else {
        this.isShowBlur = false
      }
    },
    alertText() {
      alert('暂时只开放搜索功能')
    }
  },
  // 生命周期钩子
  mounted() {
    this.showExam('one')
  },
}
</script>

<style scoped>
/* 跟容器 */
.container {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f2f5;
}

/* 最上层提示文本 */
h2 {
  position: absolute;
  font-size: 12px;
  color: #999;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
}

/* 弹出框 */
.new-exam,
.message-exam {
  position: absolute;
  top: -50px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100vw;
  min-width: 1260px;
  height: 100vh;
  min-height: 1080px;
  background-color: rgba(0, 0, 0, .6);
}

/* 白底弹出框 */
.exam-container {
  position: absolute;
  top: 175px;
  left: 15%;
  width: 70%;
  min-width: 760px;
  height: 850px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px #333;
  overflow: hidden;
}

/* 顶部文本提示和退出按钮 */
.top-text {
  height: 50px;
  box-shadow: 1px 0 1px #333;
}

.top-text p {
  float: left;
  margin: 17px 30px;
  font-size: 16px;
  pointer-events: none;
}

.top-text button {
  float: right;
  height: 50px;
  width: 60px;
  font-size: 18px;
  border: none;
  background-color: #fff;
  cursor: pointer;
}

.top-text button:hover {
  color: crimson;
}

/* 进度条 */
.Progress-bar {
  height: 50px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}

.Progress-item {
  margin: 0 10px;
  position: relative;
  width: 99%;
  text-align: center;
}

.Progress-item span {
  display: inline-block;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #eee;
  color: #999;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  padding: 5.5px;
}

.Progress-item p {
  display: inline-block;
  font-size: 14px;
  letter-spacing: .5px;
  margin-left: 5px;
  color: #999;
}

/* 第一步 */
.one-item span {
  background-color: #1890ff;
  color: #fff;
}

.one-item p {
  color: #333;
}

/* 小横条 */
.one-bar {
  display: inline-block;
  height: 1px;
  width: 140%;
  background-color: #eee;
}


/* 顶部进度条完成样式 */
.success.one-item span,
.success.two-item span {
  background-color: #fff;
  color: transparent;
  background-image: url(@/assets/img/home/problem/success.svg);
  background-size: 100%;
  background-position: top left;
}

.success.one-item p,
.success.two-item p {
  color: #999;
}

.success.one-item~.one-bar,
.success.two-item~.two-bar {
  background-color: #1890ff;
}

.success.one-item~.two-item span,
.success.two-item~.three-item span {
  background-color: #1890ff;
  color: #fff;
}

.success.one-item~.two-item p,
.success.two-item~.three-item p {
  color: #333;
}

.success.successThree span {
  background-color: #fff !important;
  color: transparent !important;
  background-image: url(@/assets/img/home/problem/success.svg);
  background-size: 100%;
  background-position: top left;
}

.success.successThree p {
  color: #999 !important;
}

/* 弹出框第一步内容 */
.input-exam {
  min-height: 700px;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  position: relative;
}

.input-exam li {
  width: 100%;
  text-align: center;
}

.input-exam label {
  font-size: 14px;
  color: #333;
}

.input-exam input {
  display: inline-block;
  margin: 0 10px;
  width: 40%;
  height: 30px;
  border: 1px solid #dee2e6;
  background: none;
  outline: none;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-exam input:focus {
  border: none;
  box-shadow: 0 0 3px #1890ff;
}

/* 第一步格式错误提示部分 */
.show-err#input-one::after {
  content: "请输入字母或数字或中文,最少一字符,最多十二字符";
  position: absolute;
  top: 13%;
  color: red;
  font-size: 14px;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
}

.show-err#input-two::after {
  content: "请输入字母或数字或中文,最少一字符,最多二十字符";
  position: absolute;
  top: 33%;
  color: red;
  font-size: 14px;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
}

.show-err#input-three::after {
  content: "请输入大于零的纯整数,且最少一字符,最多三字符";
  position: absolute;
  top: 53%;
  color: red;
  font-size: 14px;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
}

.show-err#input-four::after {
  content: "请输入大于零的纯整数,且最少一字符,最多三字符";
  position: absolute;
  top: 73%;
  color: red;
  font-size: 14px;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
}

.show-err#input-five::after {
  content: "请输入字母或数字或中文,最少一字符,最多十字符";
  position: absolute;
  top: 93%;
  color: red;
  font-size: 14px;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
}

/* 弹出框第二步内容 */
.input-exam-two {
  min-height: 700px;
  width: 100%;
  position: relative;
}

/* 考题列表 */
.item-lists {
  height: 180px;
  width: 100%;
}

.item-lists ul {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.item-lists li {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  box-sizing: border-box;
  height: 150px;
  width: 100px;
  margin: 15px 11px;
  padding: 8px 8px;
  border-radius: 5px;
  background-color: #eee;
  box-shadow: 0 0 3px #666;
  transition: all .3s ease-in-out;
  cursor: pointer;
}

.item-lists li:hover {
  box-shadow: 0 0 5px #1890ff;
  transform: scale(1.1);
}

.item-lists li span:nth-child(1) {
  display: inline-block;
  font-size: 12px;
  color: #999;
  height: 24px;
  overflow: hidden;
}

.item-lists li span:nth-child(1)::before {
  content: '题干:';
  margin-right: 1em;
  display: inline-block;
  font-size: 12px;
  width: 27px;
  color: #333;
}

.item-lists li span:nth-child(2) {
  display: inline-block;
  font-size: 12px;
  color: #999;
  overflow: hidden;
}

.item-lists li span:nth-child(2)::before {
  content: '题型:';
  margin-right: 1em;
  font-size: 12px;
  color: #333;
}

.item-lists li span:nth-child(3) {
  display: inline-block;
  font-size: 12px;
  color: #999;
  overflow: hidden;
}

.item-lists li span:nth-child(3)::before {
  content: '分数:';
  margin-right: 1em;
  font-size: 12px;
  color: #333;
}

.item-lists li span:nth-child(4) {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}

.item-lists li span:nth-child(4) img {
  flex: 1;
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.item-lists li span:nth-child(4):hover img {
  transform: scale(1.5);
}

/* 没有考题提示文字 */
.not-item-lists {
  position: absolute;
  top: 83px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #999;
  pointer-events: none;
}

/* 编辑部分 */
.new-item {
  position: absolute;
  bottom: 0;
  height: 520px;
  width: 100%;
}

/* 题型选择按钮部分 */
.new-item ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  height: 50px;
  background-color: #eee;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, .1);
  box-shadow: 0 0 3px #eee;
}

.new-item ul li {
  text-align: center;
  font-size: 16px;
  color: #999;
  line-height: 50px;
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.new-item ul li:hover {
  color: #333;
}

.new-item ul li.active {
  color: #fff;
  background-color: #5c5c5c;
}

/* 考题按钮部分统一样式 */
.edit-exam-item,
.radio-exam-item {
  height: 470px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
}

/* 编辑考题部分样式 */
.edit-exam-item div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.edit-exam-item div span {
  margin-right: 1em;
  font-size: 14px;
  color: #999;
}

.edit-exam-item div p {
  position: absolute;
  top: 0;
  font-size: 14px;
  color: #999;
}

.edit-exam-item div p:nth-child(1) {
  left: 20%;
  transform: translateX(-50%);
}

.edit-exam-item div p:nth-child(3) {
  left: 40%;
  transform: translateX(-50%);
}

.edit-exam-item div p:nth-child(5) {
  left: 60%;
  transform: translateX(-50%);
}

.edit-exam-item div p:nth-child(7) {
  left: 80%;
  transform: translateX(-50%);
}

.edit-exam-item div:nth-child(2) textarea {
  height: 100px;
  width: 20%;
}

.edit-exam-item div textarea {
  resize: none;
  font-family: '微软雅黑', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  height: 100px;
  width: 500px;
  border: 1px solid #999;
  outline: none;
}

.edit-exam-item div:nth-child(3) {
  position: relative;
  width: 85%;
  align-items: flex-start;
}

.edit-exam-item div:nth-child(3) span {
  position: absolute;
  top: -1em;
  pointer-events: none;
}

.edit-exam-item div:nth-child(3) input {
  flex: 1;
  height: 20px;
  width: 20px;
  border: none;
  box-shadow: none;
  background-color: #28a745;
}

.edit-exam-item div button {
  height: 30px;
  border: none;
  background-color: #1890ff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

/* 新建单选题本部分样式 */
.radio-exam-item div {
  position: relative;
  height: 50px;
  width: 70%;
}

.radio-exam-item textarea,
input {
  resize: none;
  font-family: '微软雅黑', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  box-shadow: 0 0 2px #6c757d;
  box-sizing: border-box;
}

#item-fraction {
  height: 20px;
  width: 40px;
}

.radio-exam-item div:nth-child(3) {
  /* overflow: auto; */
  height: 130px;
  padding: 5px 50px;
  border: 1px solid #eee;
  box-sizing: border-box;
}

.radio-exam-item div:nth-child(3) input {
  height: 20px;
  margin: 5px 0;
}

.radio-exam-item div:nth-child(1):before {
  content: '请输入题干:';
  display: inline-block;
  position: absolute;
  transform: translateY(-150%);
  font-size: 12px;
  color: #999;
}

.radio-exam-item div:nth-child(2) {
  height: 20px;
}

.radio-exam-item div:nth-child(2):before {
  content: '请输入本题分数:';
  display: inline-block;
  position: absolute;
  transform: translateY(-150%);
  font-size: 12px;
  color: #999;
}

.radio-exam-item div:nth-child(3):before {
  content: '请输入选项:';
  display: inline-block;
  position: absolute;
  left: 0;
  transform: translateY(-180%);
  font-size: 12px;
  color: #999;
}

.radio-exam-item div:nth-child(4) {
  height: 20px;
}

.radio-exam-item div:nth-child(4):before {
  content: '请选择正确答案对应的字母(A/B/C/D):';
  display: inline-block;
  position: absolute;
  left: 0;
  transform: translateY(-180%);
  font-size: 12px;
  color: #999;
}

.radio-exam-item div:nth-child(4) label {
  position: absolute;
  top: 2px;
}

.radio-exam-item div:nth-child(4) input {
  width: 20px;
  height: 20px;
  margin: 0 20px;
  line-height: 20px;
  border: none;
  box-shadow: none;
}

.radio-exam-item div:nth-child(5) {
  height: 30px;
}

.radio-exam-item div:nth-child(5) button {
  height: 100%;
  border: none;
  background-color: #1890ff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}


/* 弹出框第三步内容 */
.input-exam-three {
  min-height: 700px;
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr;
}

.input-exam-three li {
  position: relative;
  height: 50px;
}

.input-exam-three li span {
  font-size: 14px;
  color: #666;
  pointer-events: none;
}

.input-exam-three li label:nth-child(2) {
  position: absolute;
  font-size: 12px;
  color: #999;
  top: 20px;
  left: 30%;
}

.input-exam-three li label:nth-child(4) {
  position: absolute;
  font-size: 12px;
  color: #999;
  top: 20px;
  left: 70%;
}

.input-exam-three li input:nth-child(3) {
  position: absolute;
  top: 35px;
  left: 31%;
  box-shadow: none;
  height: 20px;
  width: 20px;
}

.input-exam-three li input:nth-child(5) {
  position: absolute;
  top: 35px;
  left: 69%;
  box-shadow: none;
  height: 20px;
  width: 20px;
}

/* 底部操作确认部分 */
.submit-exam {
  width: 100%;
  height: 100%;
  box-shadow: -1px 0 1px #333;
}

.btn-blue {
  float: right;
  font-size: 14px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 10px;
  margin: 5px 20px;
  cursor: pointer;
}

.btn-gray {
  float: left;
  font-size: 14px;
  background-color: #999;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 10px;
  margin: 5px 20px;
  cursor: pointer;
}

/* 表格容器 */
.problem-table {
  background-color: #eee;
  position: absolute;
  top: 100px;
  left: 10vw;
  width: 80%;
  min-width: 960px;
  min-height: 760px;
  border-radius: 5px;
  overflow: auto;
}

/* 表头容器 */
.table-top {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 左侧按钮 */
.btn {
  flex: 1;
  position: relative;
  left: 30px;
}

.btn button {
  background-color: #1890ff;
  color: #fff;
  padding: 7px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: .5px;
}

.btn button:hover {
  background-color: #40a9ff;
}

/* 中间搜索 */
.search {
  flex: 3;
  position: relative;
  display: flex;
  justify-content: end;
}

.search input {
  height: 30px;
  width: 200px;
  border: 1px solid #999;
  border-radius: 8px;
  background: none;
  outline: none;
  transition: all .3s ease-in-out;
}

.search label {
  position: absolute;
  font-size: 12px;
  right: 165px;
  top: 9px;
  pointer-events: none;
  color: #999;
  transition: all .3s ease-in-out;
}

.search input:focus {
  border: 1px solid #1890ff;
}

.search input:focus~label {
  color: #1890ff;
  background-color: #eee;
  padding: 0 5px;
  transform: translate(5px, -130%);
}

.search.blur input {
  border: 1px solid #1890ff;
}

.search.blur input~label {
  color: #1890ff;
  background-color: #eee;
  padding: 0 5px;
  transform: translate(5px, -130%);
}

/* 右侧操作 */
.operation {
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
}

.operation-item {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #6c757d;
  width: 150px;
  height: 30px;
  border-radius: 3px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  overflow: hidden;
}

.operation-item li {
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 30px;
}

.operation-item li:hover {
  background-color: #999;
}

.operation-item li:nth-child(1) {
  background-image: url(@/assets/img/home/problem/screen.svg);
  background-repeat: no-repeat;
  background-position: center;
}

.operation-item li:nth-child(2) {
  background-image: url(@/assets/img/home/problem/classify.svg);
  background-repeat: no-repeat;
  background-position: center;
}

.operation-item li:nth-child(3) {
  background-image: url(@/assets/img/home/problem/download.svg);
  background-repeat: no-repeat;
  background-position: center;
}

/* 表格容器 */
.table-main {
  position: relative;
  min-height: 760px;
  margin: 0 2%;
  width: 96%;
  background-color: #f6f6f6;
}

.exam {
  position: relative;
  height: 100%;
  width: 100%;
}

/* 表头部分 */
.exam-head {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  box-sizing: border-box;
  background-color: #fff;
  height: 40px;
}

.exam-head tr,
.exam-item tr {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 2fr 2fr 1fr 2fr 1fr;
}

.exam-head tr th {
  line-height: 40px;
  width: 100%;
  font-size: 14px;
  font-weight: bolder;
  letter-spacing: .5px;
  box-sizing: border-box;
  border-left: 1px solid #999;
  border-top: 1px solid #999;
  border-bottom: 2px solid #999;
}

.exam-head tr th:nth-child(9) {
  border-right: 1px solid #999;
}

/* 表格主体 */
.exam-item {
  position: absolute;
  top: 42px;
  width: 100%;
  background-color: #fff;
}

.exam-item tr td {
  height: 50px;
  width: 100%;
  font-size: 14px;
  letter-spacing: .5px;
  box-sizing: border-box;
  border-left: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  text-align: center;
  line-height: 50px;
  overflow: hidden;
}

.exam-item tr td:nth-child(9) {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #dee2e6;
}

.exam-item tr td button {
  flex: 1;
  background-color: #28a745;
  color: #fff;
  padding: 5px 2px;
  margin: 0 3px;
  height: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: .5px;
}

/* 没有考试的文本提示 */
.table-main span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: #666;
  letter-spacing: .5px;
  pointer-events: none;
}

/* 考试列表按钮白色内容框 */
.message-exam-white {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 760px;
  height: 760px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
}

/* 考试详情按钮部分 */
[data-exam-details],
[data-exam-edit] {
  height: calc(100% - 50px);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
}

/* 左边文本区域 */
[data-exam-details]>ul,
[data-exam-edit]>ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: #333;
  letter-spacing: .5px;
  pointer-events: none;
  font-size: 14px;
  background-color: #eee;
  border: 1px solid #b1b6bc;
  position: relative;
}

[data-exam-details]>ul>li,
[data-exam-edit]>ul>li {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 100%;
  border: 1px solid #b1b6bc;
}

[data-exam-details]>ul>li:nth-child(9) {
  flex: 5;
}

[data-exam-details]>ul>li:nth-child(10) {
  flex: 2;
  font-size: 12px;
}

/* 右边数据区域 */
[data-exam-details]>ul:nth-child(2),
[data-exam-edit]>ul:nth-child(2) {
  background-color: #fff;
  color: #666;
  letter-spacing: .5px;
  pointer-events: all;
}

[data-exam-details]>ul:nth-child(2)>li:nth-child(9) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 365px;
  overflow: auto;
}

[data-exam-details]>ul:nth-child(2)>li:nth-child(9)>ul {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  min-height: 200px;
  width: 565px;
  margin: 10px 10px;
  padding: 10px 10px;
  box-shadow: 0 0 3px #000;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: auto;
}

[data-exam-details]>ul:nth-child(2)>li:nth-child(9)>ul>li {
  font-size: 12px;
  line-height: 20px;
}

[data-exam-details]>ul:nth-child(2)>li:nth-child(9)>ul>li p {
  display: inline-block;
  letter-spacing: 1px;
  font-size: 14px;
  color: #000;
}

[data-exam-details]>ul:nth-child(2)>li:nth-child(9)>ul>li:nth-child(4) {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
}

[data-exam-details]>ul:nth-child(2)>li:nth-child(10) {
  color: #999;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
}

[data-exam-details]>ul:nth-child(2)>li:nth-child(10) .blackText {
  color: #333;
}

/* 考试编辑按钮部分 */
[data-exam-edit]>ul>li:nth-child(6) {
  flex: 3;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(6) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 435px;
  overflow: auto;
}

/* 考题列表 */
[data-exam-edit]>ul:nth-child(2)>li:nth-child(6)>ul {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  min-height: 200px;
  width: 565px;
  margin: 10px 10px;
  padding: 10px 10px;
  box-shadow: 0 0 3px #000;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: auto;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(6)>ul>li {
  font-size: 12px;
  line-height: 20px;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(6)>ul>li p {
  display: inline-block;
  letter-spacing: 1px;
  font-size: 12px;
  color: #999;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(6)>ul>li input {
  font-size: 12px;
  color: #666;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(6)>ul>li:nth-child(2) input {
  pointer-events: none;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(6)>ul>li:nth-child(4) {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(7) {
  color: #999;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}

[data-exam-edit]>ul:nth-child(2)>li:nth-child(7) .blackText {
  color: #333;
}

[data-exam-edit]>ul:nth-child(2)>li {
  flex-direction: column;
  align-items: flex-start;
  max-width: 605px;
}

[data-exam-edit]>ul:nth-child(2)>li>span {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #b1b6bc;
  letter-spacing: .8px;
  pointer-events: none;
}

[data-exam-edit]>ul:nth-child(2)>li>input {
  flex: 1;
  font-size: 14px;
  color: #666;
  letter-spacing: .8px;
}

[data-exam-edit]>ul:nth-child(2)>li>div {
  display: grid;
  grid-template-columns: 1fr;
  height: 70px;
  width: 145px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #999;
  overflow: hidden;
}

[data-exam-edit]>ul:nth-child(2)>li>div p {
  display: inline-block;
  font-size: 12px;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

[data-exam-edit]>ul:nth-child(2)>li>div p.active {
  color: #fff;
  background-color: #6c7d78;
}

[data-exam-edit]>ul:nth-child(2)>li>div button {
  border: none;
  cursor: pointer;
  color: #fff;
  background-color: rgb(247, 105, 105);
}

[data-exam-edit]>ul:nth-child(2)>li>div:nth-child(4) button {
  background-color: #3aa0ff;
}

/* 表脚部分 */
.table-footer {
  height: 60px;
  margin: 0 2%;
  width: 96%;
}
</style>