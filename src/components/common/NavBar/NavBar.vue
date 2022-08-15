<template>
  <nav class="NavBar">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style scoped>
  .NavBar {
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    box-shadow: 0px 3px 3px rgba(100, 100, 100, .3);
  }
</style>