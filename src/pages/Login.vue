<template>
  <div class="login-container">
    <div class="container" :class="[ isRegisteredPage ? 'right-panel-active' : '' ]">
      <div class="form-container sign-up-container">
        <div class="container-box">
          <h1>注册</h1>
          <input type="text" placeholder="取一个账号吧~" v-model="register.username"/>
          <input type="password" placeholder="输入您的密码" v-model="register.password"/>
          <p :class="{'error': register.isError}">{{ register.notice }}</p>
          <button @click="onRegister">注册</button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="container-box">
          <h1>登录</h1>
          <p>测试账号：admin66 | 密码：12345678</p>
          <input type="text" placeholder="输入用户名" v-model="login.username" @keyup.enter="onLogin"/>
          <input type="password" placeholder="密码" v-model="login.password" @keyup.enter="onLogin"/>
          <p :class="{'error': login.isError }">{{ login.notice }}</p>
          <button @click="onLogin">登录</button>
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
import {ElMessage} from 'element-plus';

export default {
  name: "Login",
  setup() {
    const router = useRouter();

    const isRegisteredPage = ref(false)

    const register = reactive({
      username: '',
      password: '',
      notice: "创建账号后，请记住用户名和密码",
      isError: false
    })
    const login = reactive({
      username: '',
      password: '',
      notice: "输入用户名和密码",
      isError: false
    })

    // 注册
    const onRegister = () => {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(register.username)) {
        register.isError = true;
        register.notice = "用户名3~15个字符，仅限于字母数字下划线中文"
        return
      }
      if (!/^.{6,16}$/.test(register.password)) {
        register.isError = true;
        register.notice = '密码长度为6~16个字符';
        return
      }
      register.isError = false;
      register.notice = '';

      Auth.register({
        username: register.username,
        password: register.password
      }).then(res => {
        ElMessage.success(res.msg)
        router.replace('/notebooks')
      }).catch(err =>{
        console.log('error',err)
        register.isError = true;
        register.notice = err.msg;
      })

    }

    // 登录
    const onLogin = () => {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(login.username)) {
        login.isError = true;
        login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(login.password)) {
        login.isError = true;
        login.notice = '密码长度为6~16个字符';
        return
      }

      login.isError = false;
      login.notice = '';

      Auth.login({
        username: login.username,
        password: login.password
      }).then((res) => {
        ElMessage.success(res.msg)
        router.replace('/notebooks')
      }).catch(res => {
        login.isError = true;
        login.notice = res.msg;
      })
    }

    return {
      isRegisteredPage,
      register,
      onRegister,
      login,
      onLogin
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/login/loginPage";

.error {
  color: red !important;
}
</style>