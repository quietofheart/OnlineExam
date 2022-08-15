<template>
  <div class="NavBarItem">+
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name:'NavBarItem'
}
</script>

<style scoped>
  .NavBarItem {
    flex: 1;
    text-align: center;
    height: 49px;
    line-height: 49px;
  }
  text{
    color: red;
  }

</style>