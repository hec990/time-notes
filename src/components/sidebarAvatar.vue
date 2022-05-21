<template>
  <div class="container">
    <div class="userInfo">
      <div class="logo">H</div>
      <div class="name">{{name + '的空间'}}</div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: "sidebarAvatar",
  setup(){
    const name = ref('coderwhy');

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
    padding: 5px 0;
    border-radius: .25rem;

    .logo {
      width: 48px;
      height: 48px;
      border: 2px solid #ccc;
      margin-left: 10px;
      border-radius: 50%;
      text-align: center;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: orange;
    }
    .name {
      padding: 0 15px;
    }
  }
  .userInfo:hover {
    background: rgba(0,0,0,.06);
  }
}
</style>