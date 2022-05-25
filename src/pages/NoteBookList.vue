<template>
  <div class="container">
    <header>
      <span @click="dialogVisible = true">新增笔记本</span>
    </header>
    <main>
      <div class="notebook" v-for="notebook in state.notebookList" :key="notebook.id">
        <div class="title">{{ notebook.title }}</div>
        <div class="operate">
          <span>{{ notebook.formatTime }}</span>
          <span>删除</span>
          <span>编辑</span>
        </div>
      </div>
    </main>

    <el-dialog
        v-model="dialogVisible"
        title="新增笔记本"
        width="30%"
    >
      <el-input v-model="input" placeholder="输入笔记本名称"/>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addNoteBook"
        >确定</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import NoteBook from '../apis/notebook';
import {useformatTime} from '../hooks/useformatTime'

export default {
  name: "NoteBookList",
  setup() {
    let state = reactive({
      notebookList: []
    });

    NoteBook.getAll().then(res => {
      state.notebookList = res.data;
    })

    const dialogVisible = ref(false)
    const input = ref('')

    const addNoteBook = () => {
      const title = input.value;
      NoteBook.addNotebook({title}).then(res => {
        res.data.formatTime = useformatTime(res.data.createdAt)
        state.notebookList.push(res.data)
      })
      dialogVisible.value = false;
    }

    return {
      state,
      dialogVisible,
      input,
      addNoteBook
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