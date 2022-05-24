<template>
  <div class="container">
    <header>
      <span @click="createNoteBook">新增笔记本</span>
    </header>
    <main>
      <div class="notebook" v-for="notebook in state.notebookList" :key="notebook.id">
        <div class="title">{{ notebook.title }}</div>
        <div class="operate">
          <span>{{ notebook.createdAt }}</span>
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
import NoteBook from '../apis/notebook'

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

    let state = reactive({
      notebookList: []
    });

    NoteBook.getAll().then(res => {
      state.notebookList = res.data;
    })

    return {
      createNoteBook,
      state
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