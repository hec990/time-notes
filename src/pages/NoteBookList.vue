<template>
  <div class="container">
    <header>
      <span @click="addNoteBookDialogVisible = true">新增笔记本</span>
    </header>
    <main>
      <p class="notebookCount">笔记本列表〔{{ state.notebookList.length }}〕</p>
      <div class="notebook" v-for="notebook in state.notebookList" :key="notebook.id">
        <div class="title">
          <span>{{ notebook.title }}</span>
          <span> ({{ notebook.noteCounts ? notebook.noteCounts : '空' }})</span>
        </div>
        <div class="operate">
          <span>{{ notebook.formatTime }}</span>
          <span @click="removeNoteBook(notebook.id)">删除</span>
          <span>编辑</span>
        </div>
      </div>
    </main>

    <el-dialog
        v-model="addNoteBookDialogVisible"
        title="新增笔记本"
        width="30%"
    >
      <el-input v-model="noteBookTitle" placeholder="输入笔记本名称" @keyup.enter="addNoteBook"/>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="addNoteBookDialogVisible = false">取消</el-button>
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
import {ElMessage} from "element-plus";

export default {
  name: "NoteBookList",
  setup() {
    let state = reactive({
      notebookList: []
    });

    NoteBook.getAll().then(res => {
      state.notebookList = res.data;
    })

    const addNoteBookDialogVisible = ref(false)
    const noteBookTitle = ref('')

    const addNoteBook = () => {
      if(noteBookTitle.value !== ''){
        const title = noteBookTitle.value;
        NoteBook.addNotebook({title}).then(res => {
          res.data.formatTime = useformatTime(res.data.createdAt)
          state.notebookList.push(res.data)
          ElMessage.success(`创建成功，新的笔记本名为「${title}」`)
        }).catch(err => {
          ElMessage.error(err)
        })
        addNoteBookDialogVisible.value = false;
      }else {
        return ElMessage.error('笔记本名称不能为空')
      }
    }

    const removeNoteBook = (notebookId) => {
      NoteBook.deleteNotebook(notebookId).then(res => {
        state.notebookList.splice(state.notebookList.indexOf(notebookId), 1)
        ElMessage.success(res.msg)
      }).catch(err => {
        ElMessage.error(err.msg)
      })
    }

    return {
      state,
      addNoteBookDialogVisible,
      noteBookTitle,
      addNoteBook,
      removeNoteBook
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

    .notebookCount {
      position: relative;
      top: 0;
      left: -416px;
      padding: 0 0 10px 0;
      font-weight: bold;
    }

    .notebook {
      display: flex;
      justify-content: space-between;
      min-width: 950px;
      padding: 8px;
      border: $border;
      margin: 0 0 5px 0;

      .title {
        display: flex;

        span:nth-child(2) {
          margin-left: 5px;
          font-size: 12px;
        }
      }

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