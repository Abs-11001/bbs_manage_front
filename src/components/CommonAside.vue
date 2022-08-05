<template>
  <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04d"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse">
    <h3>{{isCollapse ? '后台' : '通用后台管理'}}</h3>
    <el-menu-item v-for="item in menuNoChildren" :index="item.path" :key="item.path" @click="handleMenuClick(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <el-submenu v-for="(item,index) in menuHasChildren" :index="index.toString()" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :index="subItem.path" :key="subItem.path">
        <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mail',
          name: 'mail',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        },
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuClick(item){
      this.$router.push({
        name: item.name
      })
    }
  },
  computed: {
    menuNoChildren(){
      return this.menu.filter((item) => {
          return !item.children
      })
    },
    menuHasChildren(){
      return this.menu.filter((item) => {
        return item.children
      })
    },
    ...mapState('asideAbout', ['isCollapse'])
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100%;
  border: none;
  h3{
    text-align: center;
    line-height: 50px;
    color: white;
  }
}
</style>