<template>
  <div class="container">
    <div class="sidebar">
      <sidebar></sidebar>
      <div class="contraction" @click="x">
        <svg class="icon" v-if="bool">
          <use xlink:href="#icon-jiantou-right"></use>
        </svg>
        <svg class="icon" v-else>
          <use xlink:href="#icon-jiantou-left"></use>
        </svg>
      </div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
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

    const bool = ref(true)

    const x = () => {
      console.log('x')
      bool.value = !bool.value;
    }

    return {
      x,
      bool
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
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}
</style>