<template>
  <div class="container">
    <header>
      <div class="line">
        <p></p>
      </div>
      <div class="navList">
        <template v-for="nav in navList">
          <router-link :to="nav.path">
            <div @click="currentlySelected(nav.id)" :class="{active: currentlySelectedIndex === nav.id}">
              <div class="navIcon">
                <time-icon :name="nav.icon"></time-icon>
              </div>
              <div class="navName">{{ nav.name }}</div>
            </div>
          </router-link>
        </template>
      </div>
    </header>
    <footer>
      <div @click="logout">
        <span>
          <svg class="icon">
            <use xlink:href="#icon-zhuxiao"></use>
          </svg>
        </span>
        <span>注销登录</span>
      </div>
    </footer>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import Auth from '../apis/auth';
import {ElMessage} from 'element-plus';
import {reactive, ref} from "vue";
import timeIcon from "../time-ui/timeIcon.vue";

export default {
  name: "sidebarNav",
  setup() {
    const router = useRouter();
    const navList = reactive([{
      id: 0,
      name: '笔记本详情',
      icon: 'NoteDetail',
      path: '/home/note'
    }, {
      id: 1,
      name: '笔记本列表',
      icon: 'NoteBookList',
      path: '/home/notebooks'
    }, {
      id: 2,
      name: '笔记回收站',
      icon: 'huishouzhan',
      path: 'trash'
    }])

    const currentlySelectedIndex = ref(1);


    const logout = () => {
      Auth.logout().then(res => {
        router.replace('/');
        ElMessage.success(res.msg)
      })
    }

    const currentlySelected = (id) => {
      currentlySelectedIndex.value = id;
    }

    return {
      logout,
      navList,
      currentlySelectedIndex,
      currentlySelected,
    }
  },
  components: {
    timeIcon
  }
}
</script>

<style lang="scss" scoped>
$hoverColor: rgba(0, 0, 0, .06);

.active {
  background-color: $hoverColor;
  color: orange;
}

.container {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  header {
    .line {
      padding: 10px 15px 0 15px;

      p {
        border-top: 1px solid #E5E5E5;
      }
    }

    .navList {
      display: flex;
      flex-direction: column;
      margin-top: 15px;

      > a > div {
        padding: 15px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        .navIcon {
          padding: 0 10px;
        }

        &:hover {
          color: orange;
        }
      }
    }
  }

  footer {
    div {
      padding: 15px;
      width: 100%;
      text-align: center;

      &:hover {
        background: $hoverColor;
        color: red;
      }
    }
  }
}
</style>