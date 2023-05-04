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
    :visible.sync="addTextCarouselDialog"
    title="添加文字轮播图">
      <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 300px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addTextCarouselDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmAdd">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import {nanoid} from "nanoid";

export default {
  name: "TextCarousel",
  components: { Editor, Toolbar },
  data() {
    return {
      addTextCarouselDialog: false,

      // edit属性
      editor: null,
      html: '<p>hello</p>',
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
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    openDialog() {
      this.addTextCarouselDialog = true
    },
    confirmAdd() {

    },
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style scoped>

</style>
