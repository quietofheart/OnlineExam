<template>
  <div class="container">
    <h2>点击左侧的创建按钮可以创建新的考试</h2>
    <!-- 弹出框 -->
    <div v-if="isShowNew" class="new-exam">
      <!-- 主体背景容器 -->
      <div class="exam-container">
        <!-- 顶部退出和文本 -->
        <div class="top-text">
          <p>新建考试</p>
          <button @click="isShowNewFun">X</button>
        </div>
        <!-- 输入新建部分 -->
        <div class="input-exam">
          <!-- 顶部进度条 -->
          <ul class="Progress-bar">
            <li class="Progress-item">
              <span>1</span>
              <p>考试描述</p>
            </li>
            <li class="Progress-item">
              <span>2</span>
              <p>考题设置</p>
            </li>
            <li class="Progress-item">
              <span>3</span>
              <p>考试描述</p>
            </li>
          </ul>
        </div>
        <!-- 底部操作确认部分 -->
        <div class="submit-exam">
          <button>确认创建</button>
        </div>
      </div>
    </div>
    <!-- 表格根容器 -->
    <div class="problem-table">
      <!-- 顶部操作栏部分 -->
      <div class="table-top">
        <!-- 左侧按钮 -->
        <div class="btn">
          <button @click="isShowNewFun">新建考试</button>
        </div>
        <!-- 中间搜索 -->
        <div class="search">
          <input type="text" id="search">
          <label for="search">搜索</label>
        </div>
        <!-- 右侧操作 -->
        <div class="operation">
          <ul class="operation-item">
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <!-- 表格容器 -->
      <div class="table-main">
        <!-- 考试表格 -->
        <table v-if="isShowMain" class="exam">
          <!-- 表头部分 -->
          <thead class="exam-head">
            <tr>
              <th>序号</th>
              <th>试卷名称</th>
              <th>描述信息</th>
              <th>分数</th>
              <th>创建用户名</th>
              <th>时长</th>
              <th>学科</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <!-- 表格主体 -->
          <tbody class="exam-item">
            <tr v-for="(item, index) in exams">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.message }}</td>
              <td>{{ item.fraction }}</td>
              <td>{{ item.author }}</td>
              <td>{{ item.time }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.create }}</td>
              <td>
                <button>详情</button>
                <button>编辑</button>
              </td>
            </tr>
          </tbody>
        </table>
        <span v-else>暂无已创建的考试,请点击左上角按钮创建</span>
      </div>
      <!-- 表脚部分 -->
      <div class="table-footer">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'problem',
  data() {
    return {
      isShowMain: false,
      isShowNew: false,
      exams: [],
    }
  },
  methods: {
    isShowNewFun() {
      this.isShowNew = !this.isShowNew
    }
  }
  ,
  // 生命周期钩子
  mounted() {
    if (localStorage.getItem('exam')) {
      let exams = localStorage.getItem('exam')
      let jsonArr = JSON.parse(exams)
      for (let item of jsonArr) {
        this.exams.push(item)
      }
      this.isShowMain = true
    } else {
      let arr = []
      let obj = { id: 1, name: 'JavaScript基础', message: '关于JavaScript基础内容的考试', fraction: 100, author: 'admin', type: '编程', time: 60, create: '2022/08/14' }
      arr.push(obj)
      arr.push(obj)
      let jsonStr = JSON.stringify(arr)
      localStorage.setItem('exam', jsonStr)
    }
  }

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
  width: 100%;
  height: 100vh;
  min-height: 960px;
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
.new-exam {
  position: absolute;
  top: -50px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
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
/* 中部输入框 */
.input-exam{
  min-height: 750px;
}
/* 进度条 */
.Progress-bar{
  height: 50px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}
.Progress-item{
  background-color: #eee;
  margin: 0 10px;
}
.Progress-item span{
  display: inline-block;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #1890ff;
  color: #fff;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  padding: 5.5px;
}
.Progress-item p{
  display: inline-block;
  font-size: 14px;
}
/* 表格容器 */
.problem-table {
  background-color: #fff;
  position: absolute;
  top: 100px;
  left: 10vw;
  width: 80%;
  min-width: 960px;
  min-height: 760px;
  border-radius: 5px;
  overflow: hidden;
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
  top: 10px;
  pointer-events: none;
  color: #999;
  transition: all .3s ease-in-out;
}

.search input:focus {
  border: 1px solid #1890ff;
  transform: scale(1.1);
}

.search input:focus~label {
  color: #1890ff;
  background-color: #fff;
  padding: 0 5px;
  transform: translate(5px, -130%);
  font-size: 14px;
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
  grid-template-columns: 1fr 3fr 3fr 1fr 2fr 1fr 1fr 2fr 2fr;
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
  border-right: 1px solid #dee2e6;
}

.exam-item tr td button {
  background-color: #28a745;
  color: #fff;
  padding: 7px 10px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
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

/* 表脚部分 */
.table-footer {
  height: 60px;
  margin: 0 2%;
  width: 96%;
}
</style>