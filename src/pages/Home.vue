<template>
  <div class="container">
    <div class="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import sidebar from '../components/sidebar.vue';
import Auth from '../apis/auth';
import {ElMessage} from 'element-plus';

export default {
  name: "Home",
  setup(){
    const router = useRouter();

    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        router.replace('/')
        ElMessage.warning('未登录')
      }
    })
  },
  components:{
    sidebar
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
}
</style>