<template>
  <div class="login-container">
    <div class="container" :class="[ isRegisteredPage ? 'right-panel-active' : '' ]">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>注册</h1>
          <input type="text" placeholder="取一个账号吧~"/>
          <input type="password" placeholder="输入您的密码"/>
          <button>注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>登录</h1>
          <input type="text" placeholder="输入登录账号"/>
          <input type="password" placeholder="输入登录密码"/>
          <button>登录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>欢迎回来~</h1>
            <p>登录个人账号，开始记笔记啦！</p>
            <button class="ghost" @click="fromSignIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>你好朋友~</h1>
            <p>注册一个账号，开始记笔记吧！</p>
            <button class="ghost" @click="fromSignUp">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 是否显示注册页面
      isRegisteredPage: false
    }
  },
  methods: {
    fromSignUp() {
      this.isRegisteredPage = !this.isRegisteredPage;
    },
    fromSignIn() {
      this.isRegisteredPage = !this.isRegisteredPage;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/login/loginPage";
</style>