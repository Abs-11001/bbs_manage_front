<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-form :model="form" :inline="true">
      <el-form-item label="标题">
        <el-input type="text" v-model="form.title" placeholder="请输入标题" @keyup.enter="getData"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select
            v-model="form.department"
            clearable
            placeholder="请选择部门">
          <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="板块">
        <el-select
            v-model="form.plate"
            clearable
            placeholder="请选择板块">
          <el-option
              v-for="item in plateOption"
              :key="item.name"
              :label="item.name"
              :value="item.name"/>
        </el-select>
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
        :data="announcement"
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
          width="600"
          label="标题">
        <template slot-scope="scope">
          <el-link :href="scope.row.url" target="_blank">{{scope.row.title}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          prop="date"
          label="发布时间">
      </el-table-column>
      <el-table-column
          align="center"
          prop="department"
          label="所属部门">
      </el-table-column>
      <el-table-column
          align="center"
          prop="plate"
          label="所属板块">
      </el-table-column>
      <el-table-column
          align="center"
          prop="del"
          width="130"
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
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {getAnnouncement, getAnnouncementKey, updateAnnouncementWithUuid} from "@/api/announcement";

export default {
  name: "AnnouncementManagement",
  data() {
    return {
      fullscreenLoading: true,
      announcement: [],
      total: null,
      currentPage: 1,
      form: {
        title: null,
        department: null,
        plate: null,
        date: null,
        pageSize: 20
      },
      departmentOptions: [],
      plateOptions: []
    }
  },
  mounted() {
    this.getData()
    // 加载部门筛选项
    this.getKey()
  },
  computed: {
    // 动态计算部门下面的板块数据项
    plateOption() {
      const {department} = this.form
      // 如果选择了部门才回去找相应的数据项
      if(department) {
        // 过滤出来部门对应的板块数据
        let res = this.plateOptions.filter(item => {
          if(item.hasOwnProperty(department)) return item
        })
        return res[0][department]
      }
      // 没有就返回空
      return []
    }
  },
  methods: {
    getData() {
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
        title: this.form.title,
        department: this.form.department,
        plate: this.form.plate,
        beginDate,
        endDate,
        // 实际查询是从0页开始查，因此要把当前页码 - 1
        page: this.currentPage - 1,
        pageSize: this.form.pageSize,
      }
      getAnnouncement(query).then(res => {
        this.fullscreenLoading = false
        const {data} = res
        this.announcement = data.announcements
        this.total = data.total
      }, err => {
        this.fullscreenLoading = false
        this.announcement = []
        this.total = 0
      })
    },
    getKey() {
      this.fullscreenLoading = true
      // 加载部门筛选项
      getAnnouncementKey().then(res => {
        this.fullscreenLoading = false
        const { data } = res
        data.forEach(item => {
          this.departmentOptions.push({
            value: item.department,
            label: item.department
          })
          this.plateOptions.push({
            [item.department]: item.plate
          })
        })
      })
    },
    handleSizeChange(val) {
      // 每页数量改变
      this.form.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      // 当前页改变
      this.currentPage = val
      this.getData()
    },
    changeStatus(row) {
      const data = {
        uuid: row.uuid,
        isDel: row.del
      }
      updateAnnouncementWithUuid(data).then(res => {
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
        return '禁止显示'
      }
      return '正常显示'
    }
  }
}
</script>

<style scoped>
.el-pagination{
  text-align: center;
}
</style>