<template>

  <div class="container">
    <el-button
        size="mini"
        type="primary"
        @click="openDialog">
      添加通知
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
          prop="title"
          label="标题"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="content"
          label="内容"
          align="center"
      >
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
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
    :visible.sync="textCarouselDialog"
    :close-on-click-modal="false"
    :title="title">
      <input v-model="form.title" type="text" placeholder="请输入标题...">
      <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 300px; overflow-y: hidden;"
            v-model="form.html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="textCarouselDialog = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import {nanoid} from "nanoid";
import {getTextCarousel, addTextCarousel, updateTextCarousel} from "@/api/carousel";

export default {
  name: "TextCarousel",
  components: { Editor, Toolbar },
  data() {
    return {
      title: null,
      textCarouselDialog: false,

      form: {
        nanoid: null,
        title: null,
        html: null,
        isDel: null,
      },
      // edit属性
      editor: null,
      toolbarConfig: {},
      editorConfig: {},
      mode: 'default', // or 'simple'
      meta: {},
      //edit属性

      data: null,
    }
  },
  mounted() {
    this.meta = {
      // 将token和nanoid同时传过去
      // token: loginStore.token || localStorage.getItem('token'),
      // 文章的唯一标识
      nanoid: nanoid()
    }
    this.toolbarConfig = {
      excludeKeys: [
        'fullScreen',
        'group-video'
      ]
    }
    this.editorConfig = {
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          server: 'http://file.upload.waheng.fun/articleImg/index.php',
          // 单个文件的最大体积限制，默认为 5M
          maxFileSize: 5 * 1024 * 1024, // 5M
          allowedFileTypes: ['image/*'],
          // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
          meta: this.meta,
          // 将 meta 拼接到 url 参数中，默认 false
          metaWithUrl: false,
        }
      }
    }
    this.getData()
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    getData() {
      getTextCarousel().then(res => {
        this.data = res.data
      })
    },
    openDialog() {
      this.title = '添加数据'
      this.textCarouselDialog = true
      this.form = {
        idx: null,
        title: null,
        html: null,
        isDel: null,
      }
    },
    confirm() {
      // 如果有idx属性，表示修改
      if(this.form.nanoid) {
        const data = {
          nanoid: this.form.nanoid,
          title: this.form.title,
          content: this.form.html,
          isDel: this.form.isDel
        }
        updateTextCarousel(data).then(res => {
          const {code, msg} = res
          if(code === 200) {
            this.$message({
              message: msg,
              type: 'success'
            })
          }
        }, err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
      } else {
        // 反之表示新增
        const data = {
          nanoid: nanoid(),
          title: this.form.title,
          content: this.form.html.replace("<p><br></p>", '')
        }
        addTextCarousel(data).then(res => {
          const {code, msg} = res
          if(code === 200){
            this.$message({
              message: msg,
              type: 'success'
            })
          }
          this.getData()
          this.addTextCarouselDialog = false
        }, err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
      }
      this.textCarouselDialog = false
      this.getData()
    },
    handleStatus(row) {
      const data = {
        nanoid: row.nanoid,
        title: row.title,
        content: row.content,
        isDel: !row.del
      }
      updateTextCarousel(data).then(res => {
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
      this.title = '修改数据'
      this.form.nanoid = row.nanoid
      this.form.title = row.title
      this.form.html = row.content
      this.form.isDel = row.del
      this.textCarouselDialog = true
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style lang="less" scoped>
.el-table{
  margin-top: 10px;
}
.btn-prohibit{
  color: #ff0000;
}
.btn-enable{
  color: #08d708;
}
input{
  width: 100%;
  //padding: 10px 2rem;
  margin-bottom: 5px;
  border: none;
  outline: none;
  font-size: 2rem;
  &:focus-visible{
      border: none;
  }
}
</style>
