<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
}

a {
  text-decoration: none;
  color: inherit;
}

.icon {
  width: 2em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

body {
  overflow: hidden; // 隐藏滚动条
}
</style>
