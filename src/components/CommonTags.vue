<template>
  <div class="tabs">
    <el-tag
        v-for="(tag, index) in breadcrumb"
        :key="tag.path"
        :closable="tag.path !== '/home' ? true : false"
        :effect="$route.path === tag.path ? 'dark' : 'plain'"
        @click="handleTagClick(tag)"
        @close="handleTagClose(tag, index)"
        size="small"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "CommonTags",
  computed: {
    ...mapState('headerAbout', ['breadcrumb'])
  },
  methods: {
    handleTagClick (tag) {
      this.$router.push(tag.path)
    },
    handleTagClose (tag, index) {
      console.log(index)
      // 通过index操作store中的breadcrumb
      if (index === this.breadcrumb.length - 1){
        this.$router.push(this.breadcrumb[index - 1].path)
      }
      this.$store.commit('headerAbout/delBreadCrumb', index)
    }
  }
}
</script>

<style scoped>
  .tabs{
    background-color: #f4f4f4;
  }
  .el-tag{
    margin: 5px;
  }
</style>