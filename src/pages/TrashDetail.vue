<template>
  <div class="container">
    <div class="trash">
      <div class="name">回收站</div>
      <template v-for="(note,index) in notes" :key="index">
        <div class="list" :class="active === note.id ? 'active' : ''" @click="curNote(note.id)">
          <div class="title">
            <span>{{ note.title }}</span>
            <span>06-06</span>
          </div>
          <div class="belong">
            归属：小何何 / 前端学习笔记
          </div>
        </div>
      </template>
    </div>
    <div class="detail">2</div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import Auth from '../apis/auth';
import Trash from '../apis/trash'

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
    const curNote = (noteId) => {
      active.value = noteId
    }

    const notes = ref([])
    Trash.getAll().then(res => {
      notes.value = res.data;
    })

    return {
      active,
      curNote,
      notes
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  background-color: #f0f0f0;
}

.container {

  .trash {
    min-width: 250px;
    background-color: #fafafa;

    .name {
      border: 1px solid #edf1f7;
      padding: 25px 0 25px 10px;
      font-size: 16px;
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
          min-width: 190px;
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