<template>
  <div class="container">
    <div class="trash">
      <div class="name">回收站</div>
      <template v-for="(note,index) in notes" :key="index">
        <div class="list" :class="active === note.id ? 'active' : ''" @click="curNote(note)">
          <div class="title">
            <span>{{ note.title }}</span>
            <span>{{ formatCreatedAt.slice(5, 10) }}</span>
          </div>
          <div class="belong">
            归属：小何何 / 前端学习笔记
          </div>
        </div>
      </template>
    </div>
    <div class="detail">
      <p>title: {{ curNoteDetail.title }}</p>
      <p>title: {{ curNoteDetail.createdAt }}</p>
      <p>title: {{ curNoteDetail.updatedAt }}</p>
      <p>title: {{ curNoteDetail.notebookId }}</p>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import Auth from '../apis/auth';
import Trash from '../apis/trash'
import {useformatTime} from "../hooks/useformatTime";

export default {
  name: "TrashDetail",
  setup() {
    const router = useRouter();

    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        router.replace('/')
        ElMessage.warning('未登录')
      }
    })

    const active = ref('')
    const curNoteDetail = ref([])
    const curNote = (note) => {
      active.value = note.id;
      curNoteDetail.value = note;
    }

    const notes = ref([])
    const formatCreatedAt = ref('');

    Trash.getAll().then(res => {
      res.data.forEach(note => {
        formatCreatedAt.value = useformatTime(note.createdAt);
      })
      notes.value = res.data;
    })

    return {
      active,
      curNote,
      notes,
      curNoteDetail,
      formatCreatedAt
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  background-color: #f0f0f0;
}

.container {
  height: 100vh;

  .trash {
    min-width: 250px;
    background-color: #fafafa;
    overflow: auto;

    .name {
      border: 1px solid #edf1f7;
      background-color: #fafafa;
      height: 80px;
      width: 234px;
      padding: 25px 0 25px 10px;
      font-size: 16px;
      position: fixed;
      top: 0;
      left: 211px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > div:nth-child(2) {
      margin-top: 80px;
    }

    .list {
      border: 1px solid #edf1f7;

      .title {
        display: flex;
        padding: 10px 10px;

        > span {
          font-size: 12px;
        }

        > span:nth-child(1) {
          min-width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        > span:nth-child(2) {
          color: #969696;
        }
      }

      .belong {
        color: #969696;
        font-size: 12px;
        padding: 0 10px 10px 10px;
      }

    }
  }

  .detail {
    width: 100%;
  }
}
</style>