<template>
  <div class="container">
    <div class="top">
      <p>您可以点击下面的其中一张考试卡片开始一场属于您的考试</p>
      <img src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" alt="">
    </div>
    <span class="card-box">
      <ul v-if="isShowTest">
        <li v-for="(item, index) in testList" class="card">
          <div class="test-name">{{ item.name }}</div>
          <div class="test-summary">{{ item.message }}</div>
          <div class="test-bottom">
            <div>
              <img src="@/assets/img/home/test/create-time.svg" alt="create-time">
              <span class="create-time">{{ item.create }}</span>
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
          <router-link :to="'/test/' + item.id"></router-link>
        </li>
      </ul>
      <div v-else class="not-test">抱歉，当前暂无进行中的考试</div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      testList: [],
      isShowTest: false,
    }
  },
  mounted() {
    if (localStorage.getItem('exam')) {
      let examStr = localStorage.getItem('exam')
      let jsonArr = JSON.parse(examStr);
      for(let item of jsonArr){
        this.testList.push(item)
      }
      this.isShowTest = true
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
  position: relative;
  min-width: 1280px;
  height: 100%;
}

/* 顶部提示信息 */
.top {
  position: relative;
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
  position: absolute;
  display: inline-block;
  height: 120px;
  right: 10vw;
}

/* 考试卡片 */
.card-box {
  position: absolute;
  top: 150px;
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
}

.card:hover {
  transform: scale(1.1, 1.1);
  box-shadow: 0 0 5px #1772b4
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

/* 链接样式 */
a {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
}

/* 如果没有考试 */
.not-test {
  font-size: 16px;
  color: #666;
  text-align: center;
}
</style>