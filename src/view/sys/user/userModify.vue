<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>用户修改</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="form" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="user.office.id" label="机构">
                <cascader
                  width="290px"
                  v-model="form.user.office"
                  :options="this.$store.getters.getOfficeTree"
                  :change-on-select="true">
                </cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="user.phone" label="手机 ">
                <el-input v-model="form.user.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="user.commonUser.password" label="密码">
                <el-input v-model="form.user.commonUser.password" autocomplete="off" type="password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="user.commonUser.name" label="姓名">
                <el-input v-model="form.user.commonUser.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="verifyPassword" label="确认密码">
                <el-input v-model="form.verifyPassword" autocomplete="off" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="22">
              <el-form-item prop="user.commonUser.roles" label="用户角色">
                <checkbox-group :options="this.$store.getters.getRoleList" v-model="form.user.commonUser.roles"
                                :max="3"></checkbox-group>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('form')" size="small" icon="el-icon-check">保存</el-button>
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
    name: "userModify",
    components: {cascader, checkboxGroup},
    created() {
      this.form.user = this.$route.params.user;
      this.form.verifyPassword = this.form.user.commonUser.password;
    },
    data() {
      let checkPhone = (rule, value, callback) => {
        this.$validator.checkPhone(value, callback);
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
          user: null
        },
        rules: {
          'user.office.id': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'user.phone': [
            {validator: checkPhone, trigger: 'blur'}],
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
            this.$actionUtils.saveAndForward("user", this.form.user, this.$router)
          }
        });
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 290px;
  }
</style>
