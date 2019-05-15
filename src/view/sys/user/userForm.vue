<template>
  <div class="">
    <el-form :model="form" status-icon :rules="rules2" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item prop="userId" label="用户">
        <el-select v-model="form.userId" placeholder="请选择">
          <el-option
            v-for="item in this.userOptions"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摄像头" prop="cameraIp">
        <el-input  v-model="form.cameraIp" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="submitForm('form')"  size="small">提交</el-button>
        <el-button @click="state.addShow=false" size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  props:{
    userOptions:{
      required:true
    }
  },
  data() {
    var validateRequired = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必填项不可为空!!'));
      } else {
        callback();
      }
    };
    return {
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
    }
  }
}
</script>

<style scoped>
.el-input{
  width:180px;
}
.el-select{
  width:180px;
}
</style>
