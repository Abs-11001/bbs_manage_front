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
import { adminLogin } from "@/api/user";
import md5 from "js-md5";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "index",
  data () {
    return {
      loginForm: {
        username: '123',
        password: '123'
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
      const data = {
        userName: this.loginForm.username,
        passwordMd5: md5(this.loginForm.password)
      }
      adminLogin(data).then(res => {
        const { code, msg, data } = res
        if(code === 200) {
          this.$store.commit('loginAbout/setCookie', data.token)
          this.$store.commit('loginAbout/setUuid', data.uuid)
          this.$store.commit('loginAbout/setAvatar', data.avatar)
          this.$store.commit('loginAbout/setNickName', data.nick_name)
          this.$store.commit('loginAbout/setUserName', data.user_name)
          this.$store.commit('loginAbout/setExpireTime', data.expire_time)
          this.$router.push({name: 'main'})
        }else {
          this.$message.error(msg)
        }
      }, err => {
        this.$message.error('账号密码错误，请重试~')
      })
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
