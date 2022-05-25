<template>
  <div class="container">
    <div class="userInfo">
      <div class="logo">
        <span>{{ name.charAt(0) }}</span>
      </div>
      <div class="name">{{ name + '的空间' }}</div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import Auth from '../../apis/auth';

export default {
  name: "sidebarAvatar",
  setup() {
    const name = ref('');

    Auth.getInfo().then(res => {
      name.value = res.data.username;
    })

    return {
      name
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
    border-radius: .25rem;

    &:hover {
      background: rgba(0, 0, 0, .06);
    }

    .logo {
      width: 48px;
      height: 48px;
      border: 2px solid #ccc;
      border-radius: 50%;
      color: orange;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 28px;
      }
    }

    .name {
      padding: 0 15px;
    }
  }
}
</style>