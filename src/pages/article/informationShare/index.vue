<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :model="form" size="small" :inline="true">
      <el-form-item label="标题">
        <el-input type="text" v-model="form.title" placeholder="标题" @keyup.enter="getData" clearable></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="text" v-model="form.description" placeholder="标题" @keyup.enter="getData" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="text" v-model="form.content" placeholder="标题" @keyup.enter="getData" clearable></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input type="text" v-model="form.user" placeholder="用户名" @keyup.enter="getData" clearable></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">检索</el-button>
      </el-form-item>
    </el-form>
    <el-table
        :data="articleList"
        stripe>
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          type="index"
          label="序号"
          align="center"
      ></el-table-column>
      <el-table-column
          align="center"
          prop="title"
          width="300"
          label="标题">
        <template slot-scope="scope">
          <el-link :href="getUrl(scope.row)" target="_blank">{{scope.row.title}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="description"
          label="简介">
      </el-table-column>
      <el-table-column
          width="200"
          align="center"
          prop="nickName"
          label="发布人">
      </el-table-column>
      <el-table-column
          width="200"
          align="center"
          prop="preview"
          label="预览图">
        <template slot-scope="scope">
          <el-image
              style="height: 50px"
              :src="scope.row.preview"
              :preview-src-list="[scope.row.preview]">
            <div slot="error" class="image-slot">
              -
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
          width="200"
          align="center"
          prop="publishTime"
          label="发布时间">
      </el-table-column>
      <el-table-column
          width="100"
          align="center"
          prop="view"
          label="浏览数">
      </el-table-column>
      <el-table-column
          width="100"
          align="center"
          prop="like"
          label="点赞数">
      </el-table-column>
      <el-table-column
          align="center"
          prop="comment"
          width="110"
          label="评论数">
      </el-table-column>
      <el-table-column
          width="130"
          align="center"
          prop="preview"
          label="是否显示">
          <template slot-scope="scope">
            <el-tooltip :content="'当前状态: ' + getStatus(scope.row)" placement="top">
              <el-switch
                  @change="changeStatus(scope.row)"
                  v-model="scope.row.del"
                  active-color="#ff4949"
                  inactive-color="#13ce66">
              </el-switch>
            </el-tooltip>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getArticleList} from "@/api/article";
import {updateArticleByNanoid} from "@/api/article";

export default {
  name: "InformationShare",
  data() {
    return {
      fullscreenLoading: true,
      articleList: null,
      total: null,
      currentPage: 1,
      pageSize: 20,
      form: {
        title: null,
        description: null,
        content: null,
        user: null,
        date: null,
      },
    }
  },
  mounted() {
    this.getData()
  },
  computed: {

  },
  methods: {
    getData(){
      this.fullscreenLoading = true
      let beginDate = null
      let endDate = null
      // 日期选择了才赋值，不然没有下标
      // console.log(this.form.date)
      if(this.form.date) {
        beginDate = this.form.date[0]
        endDate = this.form.date[1]
      }
      const query = {
        category: '信息共享',
        title: this.form.title,
        description: this.form.description,
        content: this.form.content,
        user: this.form.user,
        beginDate,
        endDate,
        page: this.currentPage,
        limit: this.pageSize,
      }
      getArticleList(query).then(res => {
        const {data: {dataList, total}} = res
        this.fullscreenLoading = false
        this.articleList = dataList
        this.total = total
      },err => {
        this.fullscreenLoading = false
        this.articleList = []
        this.total = 0
      })
    },
    handleSizeChange(val) {
      // 每页数量改变
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      // 当前页改变
      this.currentPage = val
      this.getData()
    },
    getUrl(row) {
      return `http://localhost/#/detailInformation?nanoid=${row.nanoid}`
    },
    changeStatus(row) {
      const data = {
        nanoid: row.nanoid,
        isDel: row.del
      }
      updateArticleByNanoid(data).then(res => {
        const {msg} = res
        this.$message({
          message: msg,
          type: 'success'
        })
      }, err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    getStatus(row) {
      if(row.del) {
        return '已关闭'
      }
      return '正常显示'
    }

  }
}
</script>

<style scoped>
  .el-image ::v-deep .image-slot{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-pagination{
    text-align: center;
  }
</style>