<template>
  <div>
    <el-card  shadow="never">
      <div slot="header" class="clearfix">
        <span style="color:	#808080;">用户录入</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="form" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item  prop="user.office.id" label="机构" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <cascader
                  width="290px"
                  v-model="form.user.office"
                  :props="this.$store.state.global.props"
                  :options="this.$store.state.common.officeTree"
                  :change-on-select="true">
                </cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item  prop="user.phone" label="手机 " :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-input  v-model="form.user.phone" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="user.commonUser.name" label="姓名" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-input  v-model="form.user.commonUser.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="user.commonUser.userName" label="登录名" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-input v-model="form.user.commonUser.userName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="user.commonUser.password" label="密码" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-input  v-model="form.user.commonUser.password" autocomplete="off" show-password></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="verifyPassword" label="确认密码" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-input  v-model="form.verifyPassword" show-password autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="22">
              <el-form-item prop="user.commonUser.roles" label="用户角色" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <checkbox-group :options="this.$store.state.common.roleList" v-model="form.user.commonUser.roles" :max="3"></checkbox-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('form')"  size="small"  icon="el-icon-check">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
import cascader from '@/components/cascader'
import checkboxGroup from '@/components/checkboxGroup'
export default {
  name:"userForm",
  components:{cascader,checkboxGroup},
  data: function () {
    let checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value == null || reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    };
    let duplicateUserName = (rule, value, callback) => {
      this.$axios({
        method: 'get',
        url: '/commonUser/find-by-userName',
        params: {
          userName: value,
        }
      }).then((response) => {
        if (response.data.result === null) {
          callback();
        } else {
          return callback(new Error('登录名已存在'));
        }
      })
    };
    let duplicatePassword = (rule, value, callback) => {
      if (value === this.form.user.commonUser.password) {
        callback();
      } else {
        return callback(new Error('两次密码输入不一致'));
      }
    };
    return {
      form: {
        verifyPassword: null,
        user: {
          office: {id: null},
          phone: null,
          commonUser: {
            name: null,
            userName: null,
            password: null,
            roles: [],
          }
        }
      },
      rules: {
        'user.office.id': [
          {required: true, message: "必填项不能为空", trigger: 'blur'}],
        'user.phone': [
          {validator: checkPhone, trigger: 'blur'}],
        'user.commonUser.name': [
          {required: true, message: "必填项不能为空", trigger: 'blur'},
          {validator: duplicateUserName, trigger: 'blur'}],
        'user.commonUser.userName': [
          {required: true, message: "必填项不能为空", trigger: 'blur'},
          {validator: duplicateUserName, trigger: 'blur'}],
        'user.commonUser.password': [
          {required: true, message: "必填项不能为空", trigger: 'blur'}],
        verifyPassword: [
          {required: true, message: "必填项不能为空", trigger: 'blur'},
          {validator: duplicatePassword, trigger: 'blur'}],
        'user.commonUser.roles': [
          {required: true, message: "必填项不能为空", trigger: 'blur'}]
      }
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('set_loading',true);
            this.$axios({
              headers: {
                'Content-Type': 'application/json'
              },
              method:'post',
              url:'/user/save',
              transformRequest: [function(data) {
                data = JSON.stringify(data);
                return data;
              }],
              data: this.form.user
            }).then((response) =>{
              if(response.data.code === 0)
              {
                this.$message({
                  message: response.data.msg,
                  type: "success"
                });
              }
              else {
                this.$message({
                  message: response.data.msg,
                  type: "warning"
                });
              }
            }).catch((response) =>{
              this.$message({
                message: response.data.msg,
                type: "error"
              });
            }).finally(()=>{
              this.$store.commit('set_loading',false);
            });
          }
        });
     }
  }
}
</script>

<style scoped>
.el-input{
  width:290px;
}
.el-select{
  width:290px;
}
.el-cascader{
  width:290px;
}
</style>
