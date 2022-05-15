<template>
  <div class="container">
    <sidebarAvatar></sidebarAvatar>
  </div>
</template>

<script>
import sidebarAvatar from "./sidebarAvatar.vue";
export default {
  name: "sidebar",
  components:{
    sidebarAvatar
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 220px;
  background-color: #FAFAFA;
}
</style>