<template>
  <div class="container">
    <header>
      <div class="line">
        <p></p>
      </div>
      <div class="navList">
        <router-link to="/home/note">
          <div>笔记本详情</div>
        </router-link>
        <router-link to="/home/notebooks">
          <div>笔记本列表</div>
        </router-link>
        <router-link to="/home/trash">
          <div>回收站</div>
        </router-link>
      </div>
    </header>
    <footer>
      <div @click="logout">注销登录</div>
    </footer>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import Auth from '../apis/auth';
import {ElMessage} from 'element-plus';

export default {
  name: "sidebarNav",
  setup() {
    const router = useRouter();

    const logout = () => {
      Auth.logout().then(res=>{
        router.replace('/');
        ElMessage.success(res.msg)
      })
    }
    return {
      logout
    }
  }
}
</script>

<style lang="scss" scoped>
$hoverColor: rgba(0, 0, 0, .06);

.container {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  header {
    .line {
      padding: 10px 15px 0 15px;

      p {
        border-top: 1px solid #E5E5E5;
      }
    }

    .navList {
      display: flex;
      flex-direction: column;
      margin-top: 15px;

      div {
        text-align: center;
        padding: 15px;

        &:hover {
          background: $hoverColor;
          color: orange;
        }
      }
    }
  }

  footer {
    div {
      padding: 15px;
      width: 100%;
      text-align: center;

      &:hover {
        background: $hoverColor;
        color: red;
      }
    }
  }
}
</style>