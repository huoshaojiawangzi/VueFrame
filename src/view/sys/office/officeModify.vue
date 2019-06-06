<template>
  <div>
    <el-card  shadow="never">
      <div slot="header" class="clearfix">
        <span>机构录入</span>
      </div>
      <div>
        <el-form :model="form" :rules="rules" status-icon ref="officeForm" label-position="left">
          <el-form-item>
            <el-col :span="11">
              <el-form-item  prop="office.parent.id" label="上级机构" >
                <cascader
                  width="290px"
                  v-model="form.office.parent"
                  :props="this.$store.state.global.props"
                  :options="this.$store.state.common.officeTree"
                  :exclude="form.office">
                </cascader>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="office.name" label="机构名称" >
                <el-input  v-model="form.office.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-form-item  prop="office.manager" label="负责人" >
                <el-input  v-model="form.office.manager" autocomplete="off" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="office.phone" label="机构电话" >
                <el-input v-model="form.office.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="22">
              <el-form-item prop="office.address" label="机构地址" >
                <el-input  v-model="form.office.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div align="center">
              <el-button type="primary" @click="submitForm('officeForm')"  size="small"  icon="el-icon-check">保存</el-button>
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
  name:"officeForm",
  components:{cascader},
  created(){
    this.form.office = this.$route.params.office;
    this.cascaderOptions = this.$store.state.common.officeTree;
  },
  data: function () {
    let checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value == null ||value === ""|| reg.test(value)) {
        callback();
      } else {
        return callback(new Error('请输入正确的手机号'));
      }
    };
    return {
      form: {
        office: {
          parent: {id:null},
          name: null,
          manager: null,
          phone: null,
          address: null
        }
      },
      rules: {
        'office.parent.id': [
          {required: true, message: "必填项不能为空", trigger: 'blur'}],
        'office.name': [
          {required: true, message: "必填项不能为空", trigger: 'blur'}],
        'office.phone': [
          {validator: checkPhone, trigger: 'blur'}]
      }
    };
  },
  methods: {
    openList(){
      this.$store.dispatch("deleteTabAndLive","/office/list").then(()=> {
        this.$router.push({
          name: 'officeList'
        })
      })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('set_loading',true);
            this.$axios({
              headers: {
                'Content-Type': 'application/json'
              },
              url:'/office/save',
              method:'post',
              transformRequest: [function(data) {
                data = JSON.stringify(data);
                return data;
              }],
              data: this.form.office
            }).then((response) =>{
              if(response.data.code === 0)
              {
                  this.$message({
                    message: response.data.msg,
                    type: "success"
                  });
                  this.openList();
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
