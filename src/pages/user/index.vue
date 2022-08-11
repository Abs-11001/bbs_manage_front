<template>
  <div class="userContainer">
    <el-dialog
      :visible.sync="isShowDialog"
      :title="dialogTitle==='add' ? '添加用户' : '修改用户'">
      <CommonForm :inline="true" :form-item="formItem" :form-data="formData"/>
      <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="isShowDialog = false">取消</el-button>
          <el-button type="primary" size="small" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="topManage">
      <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addUser">
        新增
      </el-button>
      <CommonForm :inline="true" :form-item="searchFormItem" :form-data="searchFormData">
        <el-button type="primary" size="small" @click="getList(undefined, undefined, searchFormData.search)">搜索</el-button>
      </CommonForm>
    </div>

    <div class="main">
      <el-table
      :data="userData"
      stripe>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="180">
          <template slot-scope="scope">
            {{ scope.row.sex === 1 ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="180">
        </el-table-column>
        <el-table-column
            prop="birth"
            label="生日"
            width="180">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="地址"
            width="250">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer">
      <el-pagination
          layout="prev, pager, next"
          :total="dataTotal"
          @current-change="getList"/>
    </div>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import axios from "axios";
import {getUserList} from "@/api/data";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    CommonForm
  },
  data () {
    return {
      dialogTitle: 'add',
      isShowDialog: false,
      formItem: [
        {
          model: 'name',
          type: 'input',
          label: '姓名',
          isShowLabel: true,
        },
        {
          model: 'age',
          type: 'input',
          label: '年龄',
          isShowLabel: true,
        },
        {
          model: 'sex',
          type: 'input',
          label: '性别',
          isShowLabel: true,
        },
        {
          model: 'birth',
          type: 'date',
          label: '出生日期',
          isShowLabel: true,
        },
        {
          model: 'addr',
          type: 'input',
          label: '出生地点',
          isShowLabel: true,
        }
      ],
      formData: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      searchFormItem: [
        {
          model: 'search',
          type: 'input',
          label: '姓名',
          isShowLabel: false,
          size: 'small'
        }
      ],
      searchFormData: {
        search: ''
      },
      userData: [],
      tFormData: [],
      dataTotal: 0
    }
  },
  methods: {
    addUser () {
      this.formData = {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      }
      this.dialogTitle = 'add'
      this.isShowDialog = true
    },
    confirm () {
      if (this.dialogTitle === 'add') {
        axios.post('/user/add', this.formData).then (
            response => {
              console.log(response)
            },
            error => {
              console.log(error)
            }
        )
      } else {
        axios.post('/user/edit', this.formData).then (
            response => {
                console.log(response)
            },
            error => {
                console.log(error)
            }
        )
      }
    },
    clearData (flag) {
      this.$store.commit('addUser/clearFormData', flag)
    },
    handleEdit (index, row) {
      console.log('点击按钮信息', index, row)
      console.log('vuex', this.formData)
      this.dialogTitle = 'edit'
      this.formData = row
      this.isShowDialog = true
    },
    handleDelete (row) {
      this.$confirm(`此操作将删除姓名为${row.name}的信息, 是否继续?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getList (page = 1, limit = 10, name = '') {
      console.log('name', name)
      getUserList({page, limit, name}).then (
          res => {
            const { data } = res
            if (data.code === 20000) {
              this.userData = data.list
              this.dataTotal = data.count
            }
          },
          error => {
            console.log(error)
          }
      )
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped lang="less">
  .userContainer{
    height: 100%;
    .topManage{
      display: flex;
      justify-content: space-between;
      align-items: center;
      ::v-deep .el-form-item{
        margin-bottom: 0;
      }
    }
    .main{
      height: calc(100% - 80px);
      overflow: auto;
    }
    .footer{
      margin-top: 10px;
      float: right;
    }
  }
</style>