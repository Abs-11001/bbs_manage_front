<template>
  <div class="container">
    <el-button
        size="mini"
        type="primary"
        @click="openDialog">
      添加资源
    </el-button>
    <el-table>
      <el-table-column
        type="selection"
      ></el-table-column>
      <el-table-column
        type="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="img"
        label="内容"
      ></el-table-column>
      <el-table-column
        prop="order"
        label="显示顺序"
      >
      </el-table-column>
      <el-table-column
        prop="isDel"
        label="状态"
      >
      </el-table-column>
    </el-table>
    <el-dialog
        :visible.sync="dialogVisible"
        title="添加图片轮播图资源"
        :before-close="handleClose">
      <el-upload
          action="http://file.upload.waheng.fun/carousel/index.php"
          list-type="picture-card"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-success="handlePictureSuccess"
          :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">一次只能上传一张图片，且不超过5MB</div>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="fullScreenImg">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  data() {
    return {
      dialogVisible: false,
      fullScreenImg: false,
      dialogImageUrl: null,
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    handlePictureSuccess(res) {
      this.dialogImageUrl = res.data
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
    }
  }
}
</script>

<style lang="less" scoped>

.el-dialog__wrapper ::v-deep  .el-dialog__body div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
