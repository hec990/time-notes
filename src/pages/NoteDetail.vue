<template>
  <div class="container">
    <div class="note-box">
      <div class="operate">
        <el-dropdown @command="handleCommand">
          <div class="notebook-title">
            <span>{{ curBook.title }}</span>
            <time-icon name="tianjia" :size="20" class="arrow"></time-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(notebook,index) in notebooks" :key="index" :command="notebook">
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
          <router-link :to="`/home/note?noteId=${note.id}&notebookId=${curBook.id}`">
            <span>{{ note.formatTime.slice(0, 10) }}</span>
            <span>{{ note.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="details">
        <span>创建时间：2022/2/20 20:00:32</span>
        <span>最后更新：2022/2/20 20:00:32</span>
        <span>{{ statusText }}</span>
      </div>
      <div class="content">
        <textarea
            placeholder="输入内容"
            v-model="curNote.content"
            @input="updateNote"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import Auth from '../apis/auth';
import {useRouter, useRoute} from 'vue-router';
import {ElMessage} from 'element-plus';
import timeIcon from "../time-ui/timeIcon.vue";
import NoteBook from '../apis/notebook';
import Note from '../apis/note'

export default {
  name: "NoteDetail",
  setup() {
    const router = useRouter();
    const route = useRoute();

    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        router.replace('/')
        ElMessage.warning('未登录')
      }
    })

    const notebooks = ref([])
    const curBook = ref({})
    const notes = ref([])

    NoteBook.getAll().then(res => {
      notebooks.value = res.data;
      curBook.value = notebooks.value.find(notebook => notebook.id === route.query.notebookId) || notebooks.value[0] || {}

      // 获取第一个笔记本的笔记列表
      Note.getAll({notebookId: curBook.value.id}).then(res => {
        notes.value = res.data;
      })
    })

    const handleCommand = (notebook) => {
      if (notebook === 'trash') {
        router.replace('/home/trash');
      }
      curBook.value = notebook;

      Note.getAll({notebookId: curBook.value.id}).then(res => {
        notes.value = res.data;
      })
    }

    const active = ref('')
    const content = ref('')
    const curNote = ref({})
    const statusText = ref('笔记未改动')
    const x = (note) => {
      active.value = note.id;
      curNote.value = note;
    }
    const updateNote = () => {
      statusText.value = '正在输入...'
      setTimeout(() => {
        Note.updateNote({noteId: curNote.value.id},
            {
              title: curNote.value.title,
              content: curNote.value.content
            }).then(() => statusText.value = '已保存').catch(() => statusText.value = '保存出错')
      }, 2000)
    }

    return {
      content,
      notebooks,
      handleCommand,
      notes,
      x,
      active,
      curBook,
      curNote,
      updateNote,
      statusText
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
  background-color: #edf1f7;
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
        > a {
          display: flex;
          text-align: center;

          span {
            width: 100%;
            font-size: 12px;
            padding: 5px;
          }
        }

        &:hover {
          color: #0983e3;
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
      }
    }
  }
}
</style>