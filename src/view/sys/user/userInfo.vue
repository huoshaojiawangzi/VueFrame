<template>
  <div>
    <el-card  shadow="never">
      <div slot="header" class="clearfix">
        <span style="color:	#808080;">用户详情</span>
      </div>
      <div>
        <el-form :model="form"  label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item label="机构" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <span>{{form.user.office.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机 " :label-width="this.$store.state.global.style.formItem.labelWidth">
                <span>{{form.user.phone}}</span>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item label="姓名" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <span>{{form.user.commonUser.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="用户角色" :label-width="this.$store.state.global.style.formItem.labelWidth">
                <div style="float: left" v-for="(role,index) in form.user.commonUser.roles">
                  <div v-if="index === 0">{{role.name}}</div>
                  <div v-else>,{{role.name}}</div>
                </div>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>
<script>
export default {
  name:"userInfo",
  created(){
    this.form.user = this.$route.params.user;
  },
  data() {
    return {
      form: {
        user: null
      }
    };
  },
  methods: {}
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
