<template>
  <NavBar>
    <NavBarItem>
      <span slot="text">首页</span>
    </NavBarItem>
    <NavBarItem>
      <span slot="text">后台管理</span>
      </NavBarItem>
    <NavBarItem>
      <span slot="text">游戏</span>
    </NavBarItem>
    <NavBarItem>
      <span slot="text">用户中心</span>
    </NavBarItem>
  </NavBar>
</template>

<script>
import NavBar from '../../common/NavBar/NavBar.vue'
import NavBarItem from '../../common/NavBar/NavBarItem.vue'

export default {
  name:'NavBarMain',
  components:{
    NavBar,
    NavBarItem
  }
}
</script>

<style>

</style>