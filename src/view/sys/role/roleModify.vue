<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>角色修改</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="roleForm" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="role.name" label="角色名">
                <el-input v-model="form.role.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="role.menus">
                <tree v-model="form.role.menus" :options="this.$store.getters.getAllMenuTree"></tree>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="role.permissions">
                <tree v-model="form.role.permissions" :options="this.$store.getters.getAllPermissionTree"></tree>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('roleForm')" size="small" icon="el-icon-check">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
  import tree from '@/components/tree'

  export default {
    name: "roleForm",
    components: {tree},
    created(){
      this.form.role =this.$route.params.role;
    },
    data: function () {
      let duplicateName = (rule, value, callback) => {
        this.$validator.duplicateFileds('role',{name:value},this.form.role.id,callback,"角色名已存在");
      };
      return {
        form: {
          role: null
        },
        rules: {
          'role.name': [
            {required: true, message: "必填项不能为空", trigger: 'blur'},
            {validator: duplicateName, trigger: 'blur'}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$actionUtils.saveAndForward("role", this.form.role, this.$router)
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
