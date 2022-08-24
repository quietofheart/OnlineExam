<template>
  <div class="container">
    <!-- 顶部文字以及计时区 -->
    <div class="top">
      <div class="title">{{ userExam.name }}</div>
      <div>{{userExam.time}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'userExam',
  data() {
    return {
      userExam: {},// 存储考试
    }
  },
  methods: {
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
  },
  mounted() {
    if (this.$store.state.userExam.length > 0) {
      this.userExam = this.$store.state.userExam
    }else{
      this.userExam = {name:'考试标题'}
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  min-width: 1280px;
  height: 100vh;
  min-height: 760px;
  background-color: antiquewhite;
}

.top {
  position: absolute;
  top: 0;
  left: 0;
  height: 100px;
  width: 100%;
  box-shadow: 3px 0 3px #000;
  background-color: #fff;
}

.title {
  line-height: 100px;
  font-size: 20px; 
  text-align: center;
}
</style>