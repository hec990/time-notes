<template>
  <div class="container">
    <div class="sidebar">
      <sidebar></sidebar>
      <div class="contraction" @click="changeIsShow">
        <template v-if="isShowSidebarText">
          <svg class="icon">
            <use xlink:href="#icon-jiantou-left"></use>
          </svg>
        </template>
        <template v-else>
          <svg class="icon">
            <use xlink:href="#icon-jiantou-right"></use>
          </svg>
        </template>
      </div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {ref, provide, readonly} from "vue";
import {useRouter} from 'vue-router';
import sidebar from '../components/sidebar.vue';
import Auth from '../apis/auth';
import {ElMessage} from 'element-plus';

export default {
  name: "Home",
  setup() {
    const router = useRouter();

    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        router.replace('/')
        ElMessage.warning('未登录')
      }
    })

    // 是否显示侧边栏文字
    const isShowSidebarText = ref(true);

    const changeIsShow = () => {
      isShowSidebarText.value = !isShowSidebarText.value;
    }


    provide("isShowSidebarText", readonly(isShowSidebarText))

    return {
      changeIsShow,
      isShowSidebarText
    }
  },
  components: {
    sidebar
  }
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.container {
  min-height: 100vh;
  display: flex;
  cursor: pointer;

  .sidebar {
    position: relative;

    .contraction {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50px;
      right: 5px;
      text-align: center;
      line-height: 24px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}
</style>