<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>权限修改</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="permissionForm" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="permission.parent.id" label="上级权限">
                <cascader
                  width="290px"
                  v-model="form.permission.parent"
                  :options="this.$store.getters.getAllPermissionTree">
                </cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="permission.name" label="权限名称">
                <el-input v-model="form.permission.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="permission.url" label="链接">
                <el-input v-model="form.permission.url" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="permission.tag" label="标识">
                <el-input v-model="form.permission.tag" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('permissionForm')" size="small" icon="el-icon-check">保存
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
  import cascader from '@/components/cascader'

  export default {
    name: "permissionModify",
    components: {cascader},
    created() {
        this.form.permission = this.$route.params.permission;
    },
    data: function () {
      let duplicateUrl = (rule, value, callback) => {
        this.$validator.duplicateFileds('permission',{url:value},this.form.permission.id,callback,"url已存在");
      };
      let duplicateTag = (rule, value, callback) => {
        this.$validator.duplicateFileds('permission',{tag:value},this.form.permission.id,callback,"标识已存在");
      };
      return {
        form: {
          permission: null
        },
        rules: {
          'permission.parent.id': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'permission.name': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'permission.url': [{validator:duplicateUrl,tigger:"blur"}],
          'permission.tag': [{validator:duplicateTag,tigger:"blur"}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$actionUtils.saveAndForward("permission",this.form.permission,this.$router)
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
