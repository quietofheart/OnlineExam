<template>
  <main>
    <h1>重置密码</h1>
    <p>请使用您的<span class="tips-one">注册邮箱</span>发送<span class="tips-one">固定格式内容</span>至<span class="tips-two">quietofheart@gmail.com</span>申请找回。</p>
    <p>格式要求:</p>
    <p>1，邮件主题必须包含“<span class="tips-two">重置密码</span>”四个字，且需要<span class="tips-two">填写在主题开头！</span></p>
    <p>2，需要找回密码的账号名称：<span class="tips-one">（必填项，否则无法找回）</span></p>
    <p>3，对应账号注册时填写的邮箱：<span class="tips-one">（必填项，否则无法找回）</span></p>
    <p>4，备注: （选填项，有特殊情况在此说明）</p>
    <p>Ps：如已发送邮件，请耐心等待邮件回复，一般会在 1 - 2 天内回复！</p>
  </main>
</template>

<style scoped>
h1{
  text-align:center;
  font-size: 30px;
  line-height: 50px;
  color: #666;
  height: 50px;
  margin-top: 15px;
  font-weight: 300;
}
p{
  margin-top: 30px;
  text-indent:2em;
  line-height:20px;
  letter-spacing:.5px;
  color: #999;
}
.tips-one{
  font-style:italic;
  color: #111;
}
.tips-two{
  color: red;
}
</style>