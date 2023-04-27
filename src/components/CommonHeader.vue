<template>
  <header>
    <div class="header-left">
      <el-button icon="el-icon-menu" size="mini" @click="handleCollapseToggle"></el-button>
      <el-breadcrumb>
        <el-breadcrumb-item
            v-for="item in breadcrumb"
            :to="{path: item.path}"
            :key="item.path"
            :class="getUrl(item)">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown @command="handleDropDownItemClick">
        <span>
          <img :src="userImg" alt="用户头像">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
  name: "CommonHeader",
  data(){
    return {
      userImg: require('../assets/images/user.png'),
    }
  },
  computed: {
    ...mapState('headerAbout', ['breadcrumb']),
  },
  methods: {
    ...mapMutations('asideAbout', {handleCollapseToggle: 'Toggle_Menu_Collapse'}),
    getUrl (item) {
      return this.$route.path === item.path ? 'current' : ''
    },
    handleDropDownItemClick (command) {
      console.log(command)
      if (command === 'logout') {
        this.$store.commit('loginAbout/clearCookie')
        this.$store.commit('headerAbout/clearBreadCrumb')
        this.$store.commit('asideAbout/clearMenu')
        this.$router.push({name: 'login'})
      }
    }
  },
  mounted(){
    // 防止用户如果在非首页的地方刷新后，界面显示和面包屑、tag栏不对应
    const currentUrl = this.$route.path
    console.log('主动添加', currentUrl)
    let breadcrumb = {}
    switch (currentUrl){
      case '/':
      case '/home':
        breadcrumb.path = '/home'
        breadcrumb.name = '首页'
        break
      case '/user':
        breadcrumb.path = '/user'
        breadcrumb.name = '用户管理'
        break
      case '/mall':
        breadcrumb.path = '/mall'
        breadcrumb.name = '商品管理'
        break
      case '/page1':
        breadcrumb.path = '/page1'
        breadcrumb.name = '页面1'
        break
      case '/page2':
        breadcrumb.path = '/page2'
        breadcrumb.name = '页面2'
        break
    }
    this.$store.commit('headerAbout/addBreadCrumb', breadcrumb)
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
  ::v-deep .el-breadcrumb__inner.is-link{
    color: #606266;
  }
  ::v-deep .current .el-breadcrumb__inner.is-link{
    color: #fff;
  }
</style>