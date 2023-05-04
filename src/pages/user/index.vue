<template>
  <div class="userContainer" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="filter">
      <el-form :model="filterData" size="small" :inline="true">
        <el-form-item label="用户名">
          <el-input type="text" v-model="filterData.username" placeholder="请输入用户名" @keyup.enter="getData" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input type="text" v-model="filterData.nickname" placeholder="请输入昵称" @keyup.enter="getData" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input type="text" v-model="filterData._class" placeholder="请输入单位" @keyup.enter="getData" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
              v-model="filterData.date"
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
    </div>
    <div class="topManage">
      <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addUser">
        新增
      </el-button>
    </div>

    <div class="main">
      <el-table
      :data="userData"
      stripe>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column label="序号" align="center" type="index"></el-table-column>
        <el-table-column
            align="center"
            label="唯一ID"
            prop="uuid"></el-table-column>
        <el-table-column
            align="center"
            label="用户名"
            prop="user_name"></el-table-column>
        <el-table-column
            align="center"
            label="昵称"
            prop="nick_name"></el-table-column>
        <el-table-column
            align="center"
            label="头像"
            prop="avatar">
          <template slot-scope="scope">
            <el-image
                style="height: 50px"
                :src="`http://file.upload.waheng.fun/${scope.row.avatar}`"
                :preview-src-list="[`http://file.upload.waheng.fun/${scope.row.avatar}`]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="单位"
            prop="_class"></el-table-column>
        <el-table-column
            align="center"
            label="个人介绍"
            prop="introduce"></el-table-column>
        <el-table-column
            align="center"
            label="注册时间"
            prop="register_time"></el-table-column>
        <el-table-column
            align="center"
            label="操作"
            prop="avatar">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-if="!scope.row.locked" size="mini" type="text" class="btn-prohibit" icon="el-icon-edit" @click="handleStatus(scope.row)">禁用</el-button>
            <el-button v-else size="mini" type="text" icon="el-icon-edit" class="btn-enable" @click="handleStatus(scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog
        :visible.sync="addDialogShow"
        title="添加用户">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="addFormData.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="addFormData.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogShow = false">取消</el-button>
        <el-button type="primary" size="small" @click="addUserConfirm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        :visible.sync="editDialogShow"
        title="编辑用户信息">
      <el-form :model="individualForm" label-position="left" label-width="80">
        <el-form-item label="用户名">
          <el-input
              disabled
              v-model="individualForm.user_name"
              maxlength="15"
              :show-word-limit="true"
              clearable ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
              v-model="individualForm.nick_name"
              maxlength="10"
              :show-word-limit="true"
              clearable ></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input
              v-model="individualForm._class"
              maxlength="10"
              :show-word-limit="true"
              clearable ></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input
              v-model="individualForm.introduce"
              maxlength="100"
              :rows="5"
              type="textarea"
              :show-word-limit="true"
              clearable ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogShow = false">取消</el-button>
        <el-button type="primary" size="small" @click="handleUpdate">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getAllUserInformation, updateUserInformation, userRegister} from "@/api/user";
import md5 from 'js-md5';


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data () {
    return {
      fullscreenLoading: true,
      userData: [],
      filterData: {
        username: null,
        nickname: null,
        _class: null,
        date: null,
      },
      total: null,
      pageSize: 10,
      currentPage: 1,

      addDialogShow: false,
      addFormData: {
        username: null,
        password: null
      },
      editDialogShow: false,
      individualForm: {
        uuid: null,
        user_name: null,
        nick_name: null,
        _class: null,
        introduce: null,
        avatar: null
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    addUser () {
      this.addFormData = {
        username: '',
        password: '',
      }
      this.addDialogShow = true
    },
    addUserConfirm () {
      const data = {
        userName: this.addFormData.username,
        // 32位小写加密
        passwordMd5: md5(this.addFormData.password)
      }
      userRegister(data).then(res => {
        const {code, msg} = res
        if(code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.addDialogShow = false
          this.getData()
        }else {
          this.$message({
            message: msg,
            type: 'error'
          });
        }
      }, err => {
        this.$message({
          message: err,
          type: 'error'
        });
      })
    },
    handleEdit (row) {
      this.individualForm = {...row}
      this.editDialogShow = true
    },
    handleUpdate() {
      const data = {
        uuid: this.individualForm.uuid,
        nick_name: this.individualForm.nick_name,
        _class: this.individualForm._class,
        introduce: this.individualForm.introduce,
      }
      updateUserInformation(data).then(res => {
        const {code} = res
        if(code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.editDialogShow = false
          this.getData()
        }else {
          this.$message({
            message: '修改失败',
            type: 'error'
          });
        }
      }, err => {
        this.$message({
          message: err,
          type: 'error'
        });
      })
    },
    handleStatus(row) {
      const status = row.locked
      const uuid = row.uuid
      const data = {
        uuid,
        locked: 0
      }
      if(status === false) {
        // status表示账号现在时正常的，进行的操作是禁用
        data.locked = 1
        updateUserInformation(data).then(res => {
          const {code} = res
          if(code === 200) {
            this.$message({
              message: '禁用成功',
              type: 'success'
            })
            this.editDialogShow = false
            this.getData()
          }
        }, err => {
          this.$message({
            message: err,
            type: 'error'
          });
        })
      }else {
        // status 表示账号现在已经被禁用了，可以进行启用操作
        data.locked = 0
        updateUserInformation(data).then(res => {
          const {code} = res
          if(code === 200) {
            this.$message({
              message: '启用成功',
              type: 'success'
            })
            this.editDialogShow = false
            this.getData()
          }
        }, err => {
          this.$message({
            message: err,
            type: 'error'
          });
        })
      }
    },
    getData() {
      this.fullscreenLoading = true
      let beginDate = null
      let endDate = null
      // 日期选择了才赋值，不然没有下标
      // console.log(this.form.date)
      if(this.filterData.date) {
        beginDate = this.filterData.date[0]
        endDate = this.filterData.date[1]
      }
      const query = {
        username: this.filterData.username,
        nickname: this.filterData.nickname,
        _class: this.filterData._class,
        beginDate,
        endDate,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      getAllUserInformation(query).then(res => {
        this.fullscreenLoading = false
        const {data: {total, dataList}} = res
        this.userData = dataList
        this.total = total
      }, err => {
        this.fullscreenLoading = false
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
  },

}
</script>

<style scoped lang="less">
  .userContainer{
    .topManage{
      margin-bottom: 10px;
    }
    .btn-prohibit{
      color: #ff0000;
    }
    .btn-enable{
      color: #08d708;
    }
    .footer{
      margin-top: 10px;
    }
    .el-pagination{
      text-align: center;
    }
  }
</style>
