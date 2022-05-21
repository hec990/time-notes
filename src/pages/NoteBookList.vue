<template>
  <div class="container">
    <sidebar></sidebar>
  </div>
</template>

<script>
import sidebar from '../components/sidebar.vue';
export default {
  name: "NoteBookList",
  components:{
    sidebar
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>