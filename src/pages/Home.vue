<template>
  <div class="container">
    <div class="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidebar from '../components/sidebar.vue';
export default {
  name: "Home",
  components:{
    sidebar
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
}
</style>