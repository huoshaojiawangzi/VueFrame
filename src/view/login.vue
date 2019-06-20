<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="userName">
        <el-input type="text" placeholder="请输入账号" v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          userName: '',
          password: ''
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          userName: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'get',
              url: '/login',
              params: {
                userName: this.loginForm.userName,
                password: this.loginForm.password
              }
            }).then((response) => {
              if (response.data.code === 0) {
                this.$store.commit("set_user_info", response.data.result);
                this.$cache.setSessionObj("userInfo", response.data.result);
                this.$router.push({path: "/"});
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "warning"
                });
              }
            }).catch(() => {
              this.$message({
                message: "请求失败",
                type: "error"
              });
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
