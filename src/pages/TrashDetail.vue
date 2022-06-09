<template>
  <div class="container">
    <div class="trash">
      <div class="name">回收站</div>
      <div class="list" :class="active ? 'active' : ''" @click="curNote">
        <div class="title">
          <span>HTML</span>
          <span>06-06</span>
        </div>
        <div class="belong">
          归属：小何何 / 前端学习笔记
        </div>
      </div>
    </div>
    <div class="detail">2</div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import Auth from '../apis/auth';

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

    const active = ref(false)
    const curNote = () => {
      active.value = !active.value;
    }

    return {
      active,
      curNote
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
      padding: 20px 0 20px 10px;
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

        > span:nth-child(2) {
          color: #969696;
          margin-left: 150px;
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