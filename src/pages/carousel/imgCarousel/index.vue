<template>
  <div class="container">
    <el-button
        size="mini"
        type="primary"
        @click="openDialog">
      添加资源
    </el-button>
    <el-table
      :data="data">
      <el-table-column
        type="selection"
      ></el-table-column>
      <el-table-column
        width="50"
        type="index"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="img"
        label="内容"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
              style="height: 150px"
              :src="`http://file.upload.waheng.fun/${scope.row.img}`"
              :preview-src-list="[`http://file.upload.waheng.fun/${scope.row.img}`]">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderShow"
        label="显示顺序"
        align="center"
      >
      </el-table-column>
      <el-table-column
          prop="addTime"
          label="添加时间"
          align="center"
      >
      </el-table-column>
      <el-table-column
        prop="isDel"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="!scope.row.del" size="mini" type="text" class="btn-prohibit" icon="el-icon-edit" @click="handleStatus(scope.row)">禁用</el-button>
          <el-button v-else size="mini" type="text" icon="el-icon-edit" class="btn-enable" @click="handleStatus(scope.row)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        class="addImage"
        :visible.sync="dialogVisible"
        title="添加图片轮播图资源"
        :before-close="handleClose">
      <el-upload
          ref="upload"
          action="http://file.upload.waheng.fun/carousel/index.php"
          list-type="picture-card"
          :limit="1"
          :on-exceed="handleExceed"
          :on-preview="handlePictureCardPreview"
          :on-success="handlePictureSuccess"
          :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">一次只能上传一张图片，且不超过5MB</div>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAdd" :disabled="disableBtn">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="fullScreenImg">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog
        width="400px"
        :visible.sync="editDialogVisible"
        title="修改轮播图显示顺序">
      <el-form>
        <el-form-item label="显示顺序">
          <el-input type="number" v-model.number="form.orderShow"></el-input>
        </el-form-item>
      </el-form>
      <div class="tips">数字越大，显示越靠前...</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {addImageCarousel, getImageCarousel, updateImageCarousel} from "@/api/carousel";

export default {
  name: 'ImageCarousel',
  data() {
    return {
      data: null,
      dialogVisible: false,
      fullScreenImg: false,
      img: null,
      dialogImageUrl: null,
      disableBtn: true,
      editDialogVisible: false,
      form: {
        idx: null,
        orderShow: null,
        isDel: null
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
        getImageCarousel().then(res => {
            const { code , data } = res
            if(code === 200) {
                this.data = data
            }
        })
    },
    openDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handlePictureSuccess(res) {
      this.img = res.data
      this.disableBtn = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.fullScreenImg = true;
    },
    beforeAvatarUpload(file) {
      let isPic = false
      if(file.type.indexOf("image") !== -1) {
        isPic = true
      }
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isPic) {
        this.$message.error('请上传图片格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isPic && isLt2M;
    },
    handleExceed(){
        this.$message.error('最多上传一张，请先添加当前资源!');
    },
    confirmAdd() {
        this.dialogVisible = false
        addImageCarousel({img: this.img}).then(res => {
            const { code, msg } = res
            if(code === 200) {
                this.$message({
                    message: msg,
                    type: 'success'
                })
                this.img = null
                this.disableBtn = true
                this.$refs.upload.clearFiles()
              this.getData()
            }
        })
    },
    handleStatus(row) {
      const data = {
        idx: row.idx,
        orderShow: row.orderShow,
        isDel: !row.del
      }
      updateImageCarousel(data).then(res => {
        const { code, msg } = res
        if(code === 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
        }
        this.getData()
      })
    },
    handleEdit(row) {
      this.form.idx = row.idx
      this.form.orderShow = row.orderShow
      this.form.isDel = row.del
      this.editDialogVisible = true
    },
    confirmEdit() {
      const data = {
        idx: this.form.idx,
        orderShow: this.form.orderShow,
        isDel: this.form.isDel
      }
      updateImageCarousel(data).then(res =>{
        const { code, msg } = res
        if(code === 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
        }
        this.editDialogVisible = false
        this.getData()
      }, err => {
        console.log(err)
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table{
  margin-top: 10px;
}

.addImage ::v-deep  .el-dialog__body div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
::v-deep  .el-upload-list .el-upload-list__item{
  width: 300px;
}
.btn-prohibit{
  color: #ff0000;
}
.btn-enable{
  color: #08d708;
}
.tips{
  font-size: 13px;
  color: #7a6bfc;
}
</style>
