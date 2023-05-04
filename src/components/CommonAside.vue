<template>
<!--  <el-menu-->
<!--      :default-active="$route.path"-->
<!--      class="el-menu-vertical-demo"-->
<!--      background-color="#545c64"-->
<!--      text-color="#fff"-->
<!--      active-text-color="#ffd04d"-->
<!--      @open="handleOpen"-->
<!--      @close="handleClose"-->
<!--      :collapse="isCollapse">-->
<!--    <h3>{{isCollapse ? '后台' : '校园论坛管理系统'}}</h3>-->
<!--    <el-menu-item-->
<!--        v-for="item in menuNoChildren"-->
<!--        :index="item.path"-->
<!--        :key="item.path"-->
<!--        @click="handleMenuClick(item)">-->
<!--      <i :class="'el-icon-' + item.icon"></i>-->
<!--      <span slot="title">{{item.label}}</span>-->
<!--    </el-menu-item>-->

<!--    <el-submenu v-for="(item,index) in menuHasChildren" :index="index.toString()" :key="index">-->
<!--      <template slot="title">-->
<!--        <i :class="'el-icon-' + item.icon"></i>-->
<!--        <span slot="title">{{item.label}}</span>-->
<!--      </template>-->
<!--      <el-menu-item-group v-for="subItem in item.children" :index="subItem.path" :key="subItem.path">-->
<!--        <el-menu-item-->
<!--            :index="subItem.path"-->
<!--            @click="handleMenuClick(subItem)">-->
<!--          {{subItem.label}}-->
<!--        </el-menu-item>-->
<!--      </el-menu-item-group>-->
<!--    </el-submenu>-->

<!--  </el-menu>-->

  <el-menu
      default-active="1"
      :default-openeds="['1', '2']"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04d"
      router
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse">
    <h3>{{isCollapse ? '后台' : '校园论坛管理系统'}}</h3>
    <el-menu-item index="/home">
      <i class="el-icon-s-data"></i>
      <span slot="title">数据驾驶舱</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-grid"></i>
        <span>轮播管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/carousel/imgCarousel">图片轮播管理</el-menu-item>
        <el-menu-item index="/carousel/imgCarousel">公告管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-grid"></i>
        <span>通知公告</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/announcement/plateManagement">板块管理</el-menu-item>
        <el-menu-item index="/announcement/announcementManagement">公告管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document-copy"></i>
        <span>文章管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/article/informationShare">信息共享</el-menu-item>
        <el-menu-item index="/article/helpEachOther">互帮互助</el-menu-item>
        <el-menu-item index="/article/treeHole">暨阳树洞</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>

</template>

<script>
import {mapState} from "vuex";
export default {
  name: "CommonAside",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuClick(item){
      // 如果当前url和要跳转的url一致就阻止行为
      if (this.$route.path === item.path) return
      this.$router.push({
        name: item.name
      })
      const breadcrumb = {name: item.label, path: '/' + item.path}
      this.$store.commit('headerAbout/addBreadCrumb', breadcrumb)
    },
  },
  computed: {
    ...mapState('asideAbout', ['isCollapse', 'menu']),
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
