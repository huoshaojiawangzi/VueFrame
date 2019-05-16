<template>
  <div>
    <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item>
        <el-col :span="11">
        <el-form-item prop="userId" label="机构">
          <elTreeSelect
            :props="props"
            :options="this.$store.state.common.officeTree"
            :accordion="true"
            @getValue="getValue($event)"/>
        </el-form-item>
        </el-col>
      <el-col :span="11">
        <el-form-item label="手机 " prop="cameraIp">
          <el-input  v-model="form.cameraIp" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
        <el-form-item label="姓名" prop="cameraIp">
          <el-input  v-model="form.cameraIp" autocomplete="off"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="11">
        <el-form-item label="登录名" prop="userName">
          <el-input  autocomplete="off"></el-input>
        </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="密码" prop="cameraIp">
            <el-input  autocomplete="off" show-password v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="确认密码" prop="userName">
            <el-input   show-password autocomplete="off" v-model="form.password2"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item label="用户角色" prop="userName">
            <el-checkbox-group>
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <div align="center" style="margin-right: 150px">
        <el-button type="primary" @click="submitForm('form')"  size="small"  icon="el-icon-check">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import elTreeSelect from '@/components/el-tree-select'

export default {
  components:{
    elTreeSelect
  },
  props:{
  },
  data() {
    let validateRequired = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填项不可为空!!'));
      } else {
        callback();
      }
    };
    return {
      props:{               // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children',
        // disabled:true
      },
      form: {
        userId:'',
        cameraIp:''
      },
      rules2: {
        userId: [
          { validator: validateRequired, trigger: 'change' }
        ],
        cameraIp: [
          { required: true,message: '必填项不可为空', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
       state:state=>state.cameraRecord
    })
  },

  methods: {
    submitForm(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           this.$axios({
                     method:'get',
                     url:'/cameraRecord/save-cameraRecord',
                     params: {
                       userId:this.form.userId,
                       cameraIp:this.form.cameraIp
                     }
                 }).then((response) =>{
                     if(response.data.code%2 == 1)
                     {
                       this.$emit("message",response.data.msg,"success");
                       this.$emit("refresh");
                     }
                     else
                     {
                        this.$emit("message",response.data.msg,"error");
                     }
                 }).catch((response) =>{
                     console.log(response.data)       //请求失败返回的数据
                     this.$emit("message","请求失败","error");
                 })
                 this.state.addShow = false;
         } else {
           return false;
         }
       });
     },
    clearForm(formName) {
      this.$refs[formName].resetFields();
    },
    getValue(value){
      this.valueId = value
      console.log(this.valueId);
    }
  }
}
</script>

<style scoped>
  .el-input{
  width:250px;
}
.el-select{
  width:250px;
}
</style>
