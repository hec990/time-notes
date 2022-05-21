<template>
  <div class="container">
    <div class="line">
      <p></p>
    </div>
    <nav class="navList">
      <div>笔记本详情</div>
      <div>笔记本列表</div>
      <div>回收站</div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "sidebarNav"
}
</script>

<style lang="scss" scoped>
.container {
  cursor: pointer;
  .line {
    padding: 10px 15px 0 15px;

    p {
      border-top: 1px solid #E5E5E5;
    }
  }

  .navList {
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    div {
      text-align: center;
      padding: 10px;
    }

    div:hover {
      background: rgba(0, 0, 0, .06);
    }
  }
}
</style>