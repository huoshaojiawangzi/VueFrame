<template>
  <div>
    <el-card shadow="never">
      <div slot="header">
        <span>用户详情</span>
        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-edit" @click="openModify(form.user)">
          修改
        </el-button>
      </div>
      <div>
        <el-form :model="form" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item label="机构">
                <span>{{form.user.office.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机 ">
                <span>{{form.user.phone}}</span>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-col :span="11">
              <el-form-item label="姓名">
                <span>{{form.user.commonUser.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="登录名">
                <span>{{form.user.commonUser.userName}}</span>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-col :span="22">
              <el-form-item label="用户角色">
                <div style="float: left" v-for="(role,index) in form.user.commonUser.roles">
                  <div v-if="index === 0">{{role.name}}</div>
                  <div v-else>/{{role.name}}</div>
                </div>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-divider></el-divider>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
  export default {
    name: "userInfo",
    created() {
      this.form.user = this.$route.params.user;
    },
    data() {
      return {
        form: {
          user: null
        }
      };
    },
    methods: {
      openModify(user) {
        this.$router.push({
          name: 'userModify',
          params: {
            user
          }
        })
      },
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
