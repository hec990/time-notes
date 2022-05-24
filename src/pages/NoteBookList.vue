<template>
  <div class="container">
    <header>
      <span @click="createNoteBook">新增笔记本</span>
    </header>
    <main>
      <div class="notebook">
        <div class="title">前端学习笔记</div>
        <div class="operate">
          <span>2022/5/22/ 20:21:30</span>
          <span>删除</span>
          <span>编辑</span>
        </div>
      </div>
      <div class="notebook">
        <div class="title">日常记录</div>
        <div class="operate">
          <span>2022/5/22/ 20:21:30</span>
          <span>删除</span>
          <span>编辑</span>
        </div>
      </div>
      <div class="notebook">
        <div class="title">菜谱</div>
        <div class="operate">
          <span>2022/5/22/ 20:21:30</span>
          <span>删除</span>
          <span>编辑</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth';
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';

export default {
  name: "NoteBookList",
  setup() {
    const router = useRouter();

    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        router.replace('/')
        ElMessage.warning('未登录')
      }
    })

    const createNoteBook = () => {
      console.log('createNoteBook')
    }
    return {
      createNoteBook,
    }
  }
}
</script>

<style lang="scss" scoped>
$border: 1px solid #E5E5E5;

.container {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  header {
    border: $border;
    padding: 15px 0 15px 15px;

    span {
      padding: 5px;
      border-radius: 5px;
      border: $border;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .notebook {
      display: flex;
      justify-content: space-between;
      min-width: 900px;
      padding: 8px;
      border: $border;
      margin: 0 0 5px 0;

      .operate {
        span {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>