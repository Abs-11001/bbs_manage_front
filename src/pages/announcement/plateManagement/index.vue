<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-table
        :data="plateData"
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
          prop="department"
          label="部门">
      </el-table-column>
      <el-table-column
          align="center"
          prop="name"
          label="板块">
      </el-table-column>
      <el-table-column
          align="center"
          prop="showOrder"
          sortable
          label="显示顺序">
      </el-table-column>
      <el-table-column
          align="center"
          prop="show"
          label="是否显示">
        <template slot-scope="scope">
          <el-tooltip :content="'当前状态: ' + getStatus(scope.row)" placement="top">
            <el-switch
                @change="changeStatus(scope.row)"
                v-model="scope.row.show"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAnnouncementKey, updateAnnouncementKey} from "@/api/announcement";

export default {
  name: "PlateManagement",
  data() {
    return {
      fullscreenLoading: true,
      plateData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      getAnnouncementKey().then(res => {
        this.fullscreenLoading = false
        const {data}  = res
        data.forEach(item => {
          this.plateData.push(...item['plate'])
        })
      })
    },
    changeStatus(row) {
      const data = {
        idx: row.idx,
        isShow: row.show
      }
      updateAnnouncementKey(data).then(res => {
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
      if(row.show) {
        return '正常显示'
      }
      return '已禁用'
    }
  }
}
</script>

<style scoped>

</style>