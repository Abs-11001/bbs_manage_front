<template>
  <div class="container">
    <div class="login">
      <h1>后台登陆系统</h1>
      <el-form
          ref="form"
          size="small"
          :model="loginForm"
          :rules="rules"
          label-width="80px">
        <el-form-item
            prop="username"
            label="用户名">
          <el-input v-model="loginForm.username" autocomplete @keyup.enter.native="handleLogin"/>
        </el-form-item>
        <el-form-item
            prop="password"
            label="密码">
          <el-input type="password" v-model="loginForm.password" @keyup.enter.native="handleLogin"/>
        </el-form-item>
        <el-button  type="primary" @click="handleLogin">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { getMenu } from "@/api/data";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          { min: 1, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      console.log(1)
      this.$router.push({name: 'main'})
      this.$store.commit('loginAbout/setCookie', 'token')
      // getMenu(this.loginForm).then(res => {
      //   const {data} = res
      //   if (data.code === 20000) {
      //     const { token, menu } = data.data
      //     this.$store.commit('loginAbout/setCookie', token)
      //     this.$store.commit('asideAbout/setMenu', menu)
      //     this.$store.commit('asideAbout/addRouter', this.$router)
      //     this.$router.push({name: 'home'})
      //   } else {
      //     this.$message('账号密码错误，请重试~')
      //   }
      //
      // })
    }
  }
}
</script>

<style scoped lang="less">
  .container{
    height: 100%;
    background-color: whitesmoke;
    overflow: hidden;
    .login{
      width: 350px;
      margin: 150px auto;
      padding: 10px 30px 10px 10px;
      background-color: white;
      border: 1px solid transparent;
      border-radius: 15px;
      box-shadow: 0 0  10px #726e6e;
      h1{
        text-align: center;
        margin: 30px 0px;
      }
      .el-button{
        display: block;
        margin: 10px auto;
      }
    }
  }
</style>