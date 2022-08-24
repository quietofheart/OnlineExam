<template>
    <!-- 根容器 -->
    <main class="container">
        <!-- 顶部容器 -->
        <div class="top">
            <!-- 左侧文字和按钮区域 -->
            <ul>
                <li>
                    <h2>在线考试系统</h2>
                </li>
                <li>基于Vue等技术栈开发的在线考试系统</li>
                <li>
                    <a href="https://github.com/quietofheart/OnlineExam">预览</a>
                    <a href="https://github.com/quietofheart/OnlineExam/blob/master/README.md" class="btn">开始使用</a>
                </li>
            </ul>
            <!-- 右侧旋转木马/轮播图 -->
            <div class="carousel">
                <ul class="slides">
                    <input type="radio" id="radio-1" name="radio" :checked="slide[0]">
                    <input type="radio" id="radio-2" name="radio" :checked="slide[1]">
                    <input type="radio" id="radio-3" name="radio" :checked="slide[2]">
                    <li class="slide"></li>
                    <li class="slide"></li>
                    <li class="slide"></li>
                    <li class="slide"></li>
                    <div class="labels" @click="timeClick($event)">
                        <label for="radio-1" id="1"></label>
                        <label for="radio-2" id="2"></label>
                        <label for="radio-3" id="3"></label>
                    </div>
                </ul>
            </div>
        </div>
        <!-- 底部容器 -->
        <ul class="main">
            <li class="main-item">
                <img src="@/assets/img/home/new/view.svg" alt="">
                <div style="color: #13d420;">优雅美观</div>
                <span>简约的UI设计</span>
            </li>
            <li class="main-item">
                <img src="@/assets/img/home/new/plan.svg" alt="">
                <div style="color: #1890ff;">常见设计模式</div>
                <span>提炼自中后台应用的典型页面和场景</span>
            </li>
            <li class="main-item">
                <img src="@/assets/img/home/new/skill.svg" alt="">
                <div style="color: #fc8d60;">技术栈</div>
                <span>采用Vue框架,Vuex,router等</span>
            </li>
            <li class="main-item">
                <img src="@/assets/img/home/new/user.svg" alt="">
                <div style="color: #f790a3;">受限制的注册用户</div>
                <span>搭配特定邀请码才可注册用户</span>
            </li>
            <li class="main-item">
                <img src="@/assets/img/home/new/ui.svg" alt="">
                <div style="color: #B27D07;">用户权限限制</div>
                <span>不同用户访问权限受限</span>
            </li>
            <li class="main-item">
                <img src="@/assets/img/home/new/testing.svg" alt="">
                <div style="color: #eb3838;">信息合法性验证</div>
                <span>用户输入信息的合法性</span>
            </li>
        </ul>
    </main>
</template>

<script>
export default {
    name: 'new',
    data() {
        return {
            slide: [true, false, false], // 旋转木马是否显示
            time: 0, // 显示哪一个旋转木马
        }
    },
    methods: {
        timeClick(e) { // 点击切换显示
            if (e.target.id === 1) {
                this.time = 0
            } else if (e.target.id === 2) {
                this.time = 1
            } else {
                this.time = 2
            }
        }
    },
    mounted() {
        setInterval(() => { // 定时器自动切换
            if (this.time === 0) {
                this.time++
                this.slide.splice(0, 1, false)
                this.slide.splice(1, 1, true)
                this.slide.splice(2, 1, false)
            } else if (this.time === 1) {
                this.time++
                this.slide.splice(0, 1, false)
                this.slide.splice(1, 1, false)
                this.slide.splice(2, 1, true)
            } else {
                this.time = 0
                this.slide.splice(0, 1, true)
                this.slide.splice(1, 1, false)
                this.slide.splice(2, 1, false)
            }
        }, 5000)
    }
}
</script>

<style scoped>
/* 跟容器 */
.container {
    display: flex;
    flex-direction: column;
    position: relative;
    left: 50vw;
    transform: translateX(-50%);
    background-color: #fff;
    width: 88vw;
    min-height: calc(100vh - 50px);
}

/* 顶部容器 */
.top {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 30px;
    margin-top: 30px;
    height: 30vh;
    min-height: 400px;
    width: 100%;
    box-shadow: 0 0 2px rgb(211, 211, 211);
}

.top ul {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* 左侧文字 */
.top:nth-child(1) li {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #666;
    letter-spacing: .5px;
}

h2 {
    font-size: 20px;
    font-weight: bold;
    color: #999;
    line-height: 50px;
}

/* 左侧按钮 */
.top ul li a,.btn {
    display: inline-block;
    border-radius: 5px;
    border: none;
    padding: 7px;
    font-size: 14px;
    background-color: #1781d2;
    margin: 40px 20px 0px 20px;
    color: #fff;
    transition: all .3s ease-in-out;
    box-shadow: 0 0 2px #666;
    text-decoration: none;
}

.top ul li .btn {
    background-color: #13d420;
}

.top ul li a:hover{
    transform: scale(1.1);
    color: #362f2f;
    background-color: #fff;
}

/* 轮播图部分 */
.carousel {
    flex: 1;
    height: 20vw;
    max-height: 400px;
    /* overflow: hidden; */
    position: relative;
}

.slides {
    position: relative;
    height: 20vw;
    max-height: 400px;
    width: 31vw;
    max-width: 640px;
    overflow: hidden;
}

input[type="radio"] {
    position: relative;
    display: none;
}

.slide {
    position: absolute;
    height: 20vw;
    max-height: 400px;
    width: 31vw;
    max-width: 640px;
    left: 0;
    top: 0;
    transition: all .5s ease-in-out;
}

.slide:nth-child(4) {
    background-image: url(@/assets/img/home/new/login.png);
    background-size: 100%;
}

.slide:nth-child(5) {
    background-image: url(@/assets/img/home/new/card.png);
    background-size: 100%;
    left: 100%;
}

.slide:nth-child(6) {
    background-image: url(@/assets/img/home/new/help.png);
    background-size: 100%;
    left: 200%;
}

.labels {
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
}

.labels label {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
    margin: 0 5px;
    border: 2px solid #fff;
    cursor: pointer;
}

.slides input[type="radio"]:nth-child(1):checked~.labels label:nth-child(1) {
    background-color: #666;
}

.slides input[type="radio"]:nth-child(2):checked~.labels label:nth-child(2) {
    background-color: #666;
}

.slides input[type="radio"]:nth-child(3):checked~.labels label:nth-child(3) {
    background-color: #666;
}

.slides input[type="radio"]:nth-child(1):checked~.slide {
    transform: translateX(0%);
}

.slides input[type="radio"]:nth-child(2):checked~.slide {
    transform: translateX(-100%);
}

.slides input[type="radio"]:nth-child(3):checked~.slide {
    transform: translateX(-200%);
}

/* 底部容器 */
.main {
    margin-top: 50px;
    height: 45vh;
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5vh;
}

.main-item {
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.main-item div {
    font-size: 14px;
    font-weight: bolder;
    margin: 10px 0;
}
.main-item span{
    font-size: 12px;
    font-weight: bolder;
    color: #bfc7bf;
}
</style>