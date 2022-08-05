<template>
  <el-container style="height: 100%;">
    <el-aside width="auto">
      <CommonAside/>
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonHeader from "@/components/CommonHeader";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",
  components: {
    CommonAside,
    CommonHeader
  }
}
</script>

<style scoped>
  .el-header{
    background-color: #333;
    color: white;
  }
  .el-main{
    background-color: #f4f4f4;
  }
</style>