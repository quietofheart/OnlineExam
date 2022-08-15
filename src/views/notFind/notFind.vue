<template>
  <main class="container">
    <h1>抱歉，你查找的页面未能找到</h1>
    <button @click="back">返回首页</button>
  </main>
</template>
<script>
export default {
  name: 'notFind',
  methods: {
    back() {
      this.$router.replace('/home')
    }
  }
}
</script>
<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eef7f2;
  min-width: 700px;
  min-height: 500px;
  border-radius: 30px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

h1 {
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
  color: dimgray;
}

button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 50px;
  background-color: #ff4b2b;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: #eef7f2;
  transition: .3;
}

button:hover {
  background-color: #ff6f55;
}
</style>