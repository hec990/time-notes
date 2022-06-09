<template>
  <div class="container">
    <div class="note-box">
      <div class="operate">
        <el-dropdown @command="handleCommand">
          <div class="notebook-title">
            <span>{{ curBookTitle }}</span>
            <time-icon name="tianjia" :size="20" class="arrow"></time-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(notebook,index) in NoteBookList" :key="index" :command="notebook">
                {{ notebook.title }}
              </el-dropdown-item>
              <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span title="添加笔记" class="addNote">
          <time-icon name="tianjia" :size="20"></time-icon>
        </span>
      </div>
      <div class="noteList">
        <div class="note-details">
          <span>更新时间</span>
          <span>笔记名称</span>
        </div>
        <div class="note" v-for="note in notes" :key="note.id" @click="x(note)" :class="{active:active === note.id}">
          <span>{{ note.formatTime.slice(0, 10) }}</span>
          <span>{{ note.title }}</span>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="details">
        <span>创建时间：2022/2/20 20:00:32</span>
        <span>最后更新：2022/2/20 20:00:32</span>
        <span>文档已保存</span>
      </div>
      <div class="content">
        <textarea placeholder="输入内容" v-model="content"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import Auth from '../apis/auth';
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import timeIcon from "../time-ui/timeIcon.vue";
import NoteBook from '../apis/notebook';
import Note from '../apis/note'

export default {
  name: "NoteDetail",
  setup() {
    const router = useRouter();

    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        router.replace('/')
        ElMessage.warning('未登录')
      }
    })

    const NoteBookList = ref([])
    const curBookTitle = ref([])

    NoteBook.getAll().then(res => {
      NoteBookList.value = res.data;
      curBookTitle.value = NoteBookList.value[0].title;

      // 获取第一个笔记本的笔记列表
      Note.getAll({notebookId: NoteBookList.value[0].id}).then(res => {
        notes.value = res.data;
      })
    })

    const handleCommand = (notebook) => {
      if (notebook === 'trash') {
        router.replace('/home/trash');
      }
      curBookTitle.value = notebook.title;

      Note.getAll({notebookId: notebook.id}).then(res => {
        notes.value = res.data;
      })
    }

    const notes = ref([])
    const active = ref('')
    const content = ref('')
    const x = (note) => {
      active.value = note.id;
    }

    return {
      content,
      NoteBookList,
      handleCommand,
      curBookTitle,
      notes,
      x,
      active
    }
  },
  components: {
    timeIcon
  }
}
</script>

<style lang="scss" scoped>
$fontColor: #bfbfbf;
$borderColor: #edf1f7;
.active {
  color: #0983e3;
}

.container {
  .note-box {
    border: 1px solid $borderColor;
    background-color: #fafafa;
    width: 240px;

    .operate {
      display: flex;
      align-items: center;
      padding: 10px 0 8px 0;

      .notebook-title {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #d1d6d6;
        border-radius: 4px;
        padding: 5px;
        min-width: 150px;
        min-height: 32px;
        text-align: center;
        margin: 0 12px 0 8px;

        span {
          margin-right: 5px;
        }

        .arrow {
          position: absolute;
          top: 6px;
          right: 20px;
        }
      }

      .addNote {
        border: 1px solid #d1d6d6;
        border-radius: 4px;
        padding: 5px;
        display: flex;
      }
    }

    .noteList {
      > div > span {
        flex: 1;
        font-size: 12px;
        padding: 5px;
      }

      .note-details {
        width: 100%;
        display: flex;
        border-bottom: 1px solid $borderColor;
        text-align: center;
      }

      .note {
        display: flex;
        text-align: center;

        &:hover {
          background-color: #edf1f7;
        }
      }
    }
  }

  .content-box {
    width: 100%;

    .details {
      padding: 10px 0 10px 5px;
      border: 1px solid $borderColor;

      span {
        color: $fontColor;
        font-size: 12px;
        margin-right: 10px;
      }
    }

    .content {
      textarea {
        width: 100%;
        height: 800px;
        outline: none;
        border: none;
        padding: 10px 0 0 5px;
        font-size: 12px;
      }
    }
  }
}
</style>