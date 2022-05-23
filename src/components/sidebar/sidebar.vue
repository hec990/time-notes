<template>
  <div class="container">
    <sidebarAvatar></sidebarAvatar>
    <sidebarNav></sidebarNav>
  </div>
</template>

<script>
import sidebarAvatar from "./sidebarAvatar.vue";
import sidebarNav from "./sidebarNav.vue";
export default {
  name: "sidebar",
  components:{
    sidebarAvatar,
    sidebarNav
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 220px;
  background-color: #FAFAFA;
  display: flex;
  flex-direction: column;
}
</style>