<template>
  <div class="container">
    <header>
      <div class="line">
        <p></p>
      </div>
      <div class="navList">
        <div>笔记本详情</div>
        <div>笔记本列表</div>
        <div>回收站</div>
      </div>
    </header>
    <footer>
      <div class="logout" @click="x">注销登录</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "sidebarNav",
  setup() {

    const x = () => {
      console.log('logout')
    }

    return {
      x
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  header {
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
        padding: 15px;
      }

      div:hover {
        background: rgba(0, 0, 0, .06);
      }
    }
  }

  footer {
    .logout {
      padding: 15px;
      width: 100%;
      text-align: center;
    }

    .logout:hover {
      background: rgba(0, 0, 0, .06);
      color: red;
    }
  }
}
</style>