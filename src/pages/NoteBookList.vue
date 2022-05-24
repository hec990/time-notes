<template>
  <div class="container">
    <header>
      <span @click="createNoteBook">新增笔记本</span>
    </header>
    <main>
      <div class="notebook" v-for="(notebook,index) in notebookList" :key="index">
        <div class="title">{{ notebook.title }}</div>
        <div class="operate">
          <span>{{ notebook.createTime }}</span>
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
import {reactive} from 'vue';

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

    const notebookList = reactive([{
      id: 0,
      title: '前端学习笔记',
      createTime: '2022/5/23 20:20:10',
    }, {
      id: 1,
      title: '日常记录',
      createTime: '2022/5/23 20:20:10',
    }, {
      id: 2,
      title: '菜谱',
      createTime: '2022/5/23 20:20:10',
    }]);

    return {
      createNoteBook,
      notebookList
    }
  }
}
</script>

<style lang="scss" scoped>
$border: 1px solid #E5E5E5;
$hover-bgColor: rgba(0, 0, 0, 0.06);

.container {
  display: flex;
  flex-direction: column;
  cursor: pointer;

  header {
    border: $border;
    padding: 15px 0 15px 15px;
    margin-bottom: 30px;

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
      min-width: 950px;
      padding: 8px;
      border: $border;
      margin: 0 0 5px 0;

      &:hover {
        background-color: $hover-bgColor;
      }

      .operate {
        span {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>