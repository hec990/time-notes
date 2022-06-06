<template>
  <div class="container">
    <div class="userInfo">
      <div class="logo">
        {{ name.charAt(0) }}
      </div>
      <div class="name" v-if="isShowSidebarText">{{ name + '的空间' }}</div>
    </div>
  </div>
</template>

<script>
import {ref, inject} from 'vue';
import Auth from '../apis/auth'

export default {
  name: "sidebarAvatar",
  setup() {
    const name = ref('');

    Auth.getInfo().then(res => {
      name.value = res.data.username;
    })

    const isShowSidebarText = inject('isShowSidebarText')

    return {
      name,
      isShowSidebarText
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 50px;
  padding-top: 10px;
  cursor: pointer;

  .userInfo {
    display: flex;
    align-items: center;
    padding: 5px 0 5px 10px;

    .logo {
      width: 48px;
      height: 48px;
      font-size: 24px;
      color: white;
      border: 2px solid #ccc;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      background-color: orange;
    }

    .name {
      padding: 0 15px;
    }
  }
}
</style>