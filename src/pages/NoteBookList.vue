<template>
  <div class="container">
    笔记本列表
  </div>
</template>

<script>
import Auth from '../apis/auth';
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';

export default {
  name: "NoteBookList",
  setup(){
    const router = useRouter();

    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        router.replace('/')
        ElMessage.warning('未登录')
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>