<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>权限录入</span>
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
    name: "permissionForm",
    components: {cascader},
    created() {
      if(this.$route.params.parent!==undefined){
        this.form.permission.parent = this.$route.params.parent;
      }
    },
    data: function () {
      return {
        form: {
          permission: {
            parent: {id: null},
            name: null,
            url: null,
            tag: null
          }
        },
        rules: {
          'permission.parent.id': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}],
          'permission.name': [
            {required: true, message: "必填项不能为空", trigger: 'blur'}]
        }
      };
    },
    methods: {
      openList() {
        this.$store.dispatch("deleteTabAndLive", "/permission/list").then(() => {
          this.$store.dispatch("deleteTabAndLive", "/permission/form").catch();
          this.$router.push({
            name: 'permissionList'
          })
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form.permission);
            this.$store.commit('set_loading', true);
            this.$axios({
              headers: {
                'Content-Type': 'application/json'
              },
              url: '/permission/save',
              method: 'post',
              transformRequest: [function (data) {
                data = JSON.stringify(data);
                return data;
              }],
              data: this.form.permission
            }).then((response) => {
              if (response.data.code === 0) {
                this.openList();
                this.$message({
                  message: response.data.msg,
                  type: "success"
                });
              } else {
                this.$message({
                  message: response.data.msg,
                  type: "warning"
                });
              }
            }).catch((response) => {
              this.$message({
                message: response.data.msg,
                type: "error"
              });
            }).finally(() => {
              this.$store.commit('set_loading', false);
            });
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

  .el-select {
    width: 290px;
  }

  .el-cascader {
    width: 290px;
  }
</style>
