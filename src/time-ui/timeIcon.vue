<template>
  <svg class="icon" :style="{width: iconSize,height: iconSize}">
    <use v-bind:xlink:href="iconName"></use>
  </svg>
</template>

<script>
import {computed} from "vue";

export default {
  name: "timeIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 14
    }
  },
  setup(props) {
    const {name, size} = props;
    const iconName = computed(() => `#icon-${name}`);
    const iconSize = computed(() => size + "px");

    return {
      iconName,
      iconSize
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>