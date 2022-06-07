<template>
  <div class="container">
    <div class="note-box">
      <div class="operate">
        <el-cascader
            v-model="value"
            :options="options"
            :props="props"
            @change="handleChange"
        />
        <span title="添加笔记" @click="addNote">
          <time-icon name="tianjia" size="20"></time-icon>
        </span>
      </div>
      <div class="noteList">
        <div class="note-details">
          <span>更新时间</span>
          <span>笔记名称</span>
        </div>
        <div class="note">
          <span>2022/5/20</span>
          <span>HTML</span>
        </div>
        <div class="note">
          <span>2022/5/20</span>
          <span>CSS</span>
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

    const content = ref('')


    const addNote = () => {
      console.log('添加笔记')
    }

    const value = ref([])

    const props = {
      expandTrigger: 'hover',
    }

    const handleChange = (value) => {
      console.log(value)
    }

    const options = [
      {
        value: 1,
        label: '前端学习笔记',
      },
      {
        value: 2,
        label: '家常菜',
      }
    ]

    return {
      content,
      value,
      props,
      handleChange,
      options,
      addNote
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

.container {
  .note-box {
    border: 1px solid $borderColor;
    background-color: #fafafa;

    .operate {
      display: flex;
      align-items: center;
      padding: 8px 10px 5px 10px;

      span {
        border: 1px solid #d1d6d6;
        margin: 0 0 0 15px;
        border-radius: 4px;
        padding: 3px;
      }
    }

    .noteList {
      .note-details {
        width: 100%;
        display: flex;
        margin-top: 2px;
        border-bottom: 1px solid $borderColor;

        span {
          flex: 1;
          text-align: center;
          padding: 5px;
          font-size: 12px;
        }
      }

      .note {
        display: flex;

        span {
          flex: 1;
          text-align: center;
          font-size: 12px;
          padding: 5px;
        }

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