<template>
  <header>
    <div class="header-left">
      <el-button icon="el-icon-menu" size="mini" @click="handleCollapseToggle"></el-button>
      <h3>首页</h3>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span>
          <img :src="userImg" alt="用户头像">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "CommonHeader",
  data(){
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    ...mapMutations('asideAbout', {handleCollapseToggle: 'Toggle_Menu_Collapse'})
  }
}
</script>

<style scoped lang="less">
  header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .header-left{
    display: flex;
    align-items: center;
    .el-button{
      margin-right: 10px;
    }
  }
  .header-right img{
      width: 36px;
      border-radius: 50%;
  }
</style>