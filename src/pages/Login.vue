<template>
  <div class="login-container">
    <div class="container" :class="[ isRegisteredPage ? 'right-panel-active' : '' ]">
      <div class="form-container sign-up-container">
        <div class="container-box">
          <h1>注册</h1>
          <input type="text" placeholder="取一个账号吧~" v-model="register.username"/>
          <input type="password" placeholder="输入您的密码" v-model="register.password"/>
          <button @click="signUp">注册</button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="container-box">
          <h1>登录</h1>
          <input type="text" placeholder="输入登录账号"/>
          <input type="password" placeholder="输入登录密码"/>
          <button>登录</button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>欢迎回来~</h1>
            <p>登录个人账号，开始记笔记啦！</p>
            <button class="ghost" @click="this.isRegisteredPage = !this.isRegisteredPage;">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>你好朋友~</h1>
            <p>注册一个账号，开始记笔记吧！</p>
            <button class="ghost" @click="this.isRegisteredPage = !this.isRegisteredPage;">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from 'vue';
import Auth from '../apis/auth';
import {useRouter} from 'vue-router';

export default {
  name: "Login",
  setup() {
    const router = useRouter();

    const isRegisteredPage = ref(false)

    const register = reactive({
      username: '',
      password: ''
    })

    const signUp = () => {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(register.username)) {
        return alert('用户名3~15个字符，仅限于字母数字下划线中文')
      }
      if (!/^.{6,16}$/.test(register.password)) {
        return alert('密码长度为6~16个字符')
      }

      Auth.register({
        username: register.username,
        password: register.password
      }).then(() => {
        router.replace('/notebooks')
      })

    }

    return {
      isRegisteredPage,
      register,
      signUp
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/login/loginPage";
</style>