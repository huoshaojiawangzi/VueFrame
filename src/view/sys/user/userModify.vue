<template>
  <div>
    <el-card  shadow="never">
      <div slot="header" class="clearfix">
        <span style="color:	#808080;">用户修改</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="form" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item  prop="officeIds" label="机构" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-cascader
                  v-model="form.officeIds"
                  :props="this.$store.state.global.props"
                  :options="this.$store.state.common.officeTree"
                  :change-on-select="true"
                  expand-trigger="hover">
                </el-cascader>
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
              <el-form-item prop="user.commonUser.password" label="密码" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-input  v-model="form.user.commonUser.password" autocomplete="off" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item prop="verifyPassword" label="确认密码" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-input  v-model="form.verifyPassword" show-password autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="22">
              <el-form-item prop="roleIds" label="用户角色" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <el-checkbox-group  v-model="form.roleIds" :max="3">
                  <el-checkbox v-for="item in this.$store.state.common.roleList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
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
export default {
  name:"userForm",
  created(){
    this.form.user = this.$route.params.user;
    this.setFormOfficeIds();
    this.setFormRoleIds();
    this.form.verifyPassword = this.form.user.commonUser.password;
  },
  data() {
    let checkPhone = (rule, value, callback) => {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (value == null||reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
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
        officeIds:[],
        roleIds:[],
        verifyPassword:null,
        user: null
      },
      rules: {
        officeIds:[
          { required: true,message:"必填项不能为空",trigger: 'blur' }],
        'user.phone':[
          { validator: checkPhone,trigger: 'blur' }],
        'user.commonUser.password':[
          { required: true,message:"必填项不能为空",trigger: 'blur' }],
        verifyPassword:[
          { required: true,message:"必填项不能为空",trigger: 'blur' },
          { validator: duplicatePassword,trigger: 'blur' }],
        roleIds:[
          { required: true,message:"必填项不能为空",trigger: 'blur' }]
      }
    };
  },
  methods: {
    setFormRoles(){
      let roles = [];
      for(let roleId of this.form.roleIds)
      {
        let role = {id:roleId};
        roles.push(role)
      }
      this.form.user.commonUser.roles = roles;
    },
    setFormOfficeId(){
      this.form.user.office.id = this.form.officeIds[this.form.officeIds.length-1]
    },
     setFormRoleIds(){
      let roleIds = [];
      for(let role of this.form.user.roles)
      {
        roleIds.push(role.id)
      }
      this.form.roleIds = roleIds;
    },
    setFormOfficeIds(){
      this.form.officeIds.push(this.form.user.office.id);
    },
    submitForm(formName) {
      new Promise((resolve)=>{
        this.setFormRoles();
        this.setFormOfficeId();
        resolve();
      }).then(()=>{
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
      })
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
.el-cascader {
  width:290px;
}
</style>
