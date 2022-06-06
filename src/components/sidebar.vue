<template>
  <div class="container" :style="{width: isShowSidebarText ? '210px' : '90px'}">
    <sidebarAvatar></sidebarAvatar>
    <sidebarNav></sidebarNav>
  </div>
</template>

<script>
import sidebarAvatar from "./sidebarAvatar.vue";
import sidebarNav from "./sidebarNav.vue";
import {inject} from 'vue';

export default {
  name: "sidebar",
  components: {
    sidebarAvatar,
    sidebarNav
  },
  setup() {
    const isShowSidebarText = inject('isShowSidebarText');

    return {
      isShowSidebarText
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #FAFAFA;
  display: flex;
  flex-direction: column;
}
</style>